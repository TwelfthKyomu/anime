import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { BrowserDocument, BrowserElement, ControlT, VideoState } from "@/types/control";

const useFullscreenHandlers = (videoRef: RefObject<HTMLVideoElement>, setIsFullscreen: Dispatch<SetStateAction<boolean>>) => {
    const tryFullscreenMethod = async (method: () => Promise<void> | void): Promise<boolean> => {
        try {
            const result = method();
            if (result instanceof Promise) {
                await result;
                return true;
            }
            return result !== undefined;
        } catch {
            return false;
        }
    };
    
    const enterFullscreen = async (playerContainer: BrowserElement): Promise<void> => {
        const methods = [
            () => playerContainer?.requestFullscreen(),
            () => playerContainer?.webkitRequestFullscreen?.(),
            () => playerContainer?.mozRequestFullScreen?.(),
            () => playerContainer?.msRequestFullscreen?.()
        ];
        
        for (const method of methods) {
            if (await tryFullscreenMethod(method)) {
                setIsFullscreen(true);
                return;
            }
        }
    };
    
    const exitFullscreen = async (): Promise<void> => {
        const doc = document as BrowserDocument;
        const methods = [
            () => doc.exitFullscreen(),
            () => doc.webkitExitFullscreen?.(),
            () => doc.mozCancelFullScreen?.(),
            () => doc.msExitFullscreen?.()
        ];
        
        for (const method of methods) {
            if (await tryFullscreenMethod(method)) {
                setIsFullscreen(false);
                return;
            }
        }
    };
    
    return { enterFullscreen, exitFullscreen };
};

const useVideoEventHandlers = (videoRef: RefObject<HTMLVideoElement>, setIsBuffering: Dispatch<SetStateAction<boolean>>): void => {
    const checkBuffering = () => {
        const video = videoRef.current;
        if (!video || video.buffered.length === 0) return;
        
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        
        const isCurrentlyBuffering =
            isNaN(duration) ||
            bufferedEnd / duration < 0.9 ||
            video.readyState < 3;
        
        setIsBuffering(isCurrentlyBuffering);
    };
    
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        
        const handlers = {
            progress: checkBuffering,
            loadedmetadata: checkBuffering
        };
        
        Object.entries(handlers).forEach(([event, handler]) => {
            video.addEventListener(event, handler);
        });
        
        checkBuffering();
        
        return () => {
            Object.entries(handlers).forEach(([event, handler]) => {
                video.removeEventListener(event, handler);
            });
        };
    }, []);
};

const usePreloadNextEpisode = (episodes: string[], selectedEpisode: number): void => {
    useEffect(() => {
        if (selectedEpisode >= episodes.length - 1) return;
        
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = episodes[selectedEpisode + 1];
        document.head.appendChild(link);
        
        return () => {
            document.head.removeChild(link);
        };
    }, [selectedEpisode, episodes]);
};

const useControl = (episodes: string[]): ControlT => {
    if (!Array.isArray(episodes) || episodes.length === 0) {
        throw new Error('Episodes array must not be empty');
    }
    const videoRef = useRef<HTMLVideoElement>(null!);
    
    const [state, setState] = useState<VideoState>({
        isPlaying: false,
        currentTime: 0,
        volume: 1,
        selectedEpisode: 0,
        isBuffering: false,
        isMuted: false,
        isFullscreen: false
    });
    
    const { enterFullscreen, exitFullscreen } = useFullscreenHandlers(videoRef, (value: boolean) =>
        setState(prev => ({ ...prev, isFullscreen: value }))
    );
    
    useVideoEventHandlers(videoRef, (value: boolean) =>
        setState(prev => ({ ...prev, isBuffering: value }))
    );
    
    usePreloadNextEpisode(episodes, state.selectedEpisode);
    
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = state.volume;
        }
    }, [state.volume]);
    
    const togglePlay = () => {
        if (!videoRef.current) return;
        
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
        setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    };
    
    const switchEpisode = (index: number) => {
        if (!videoRef.current || index < 0 || index >= episodes.length) return;
        
        setState(prev => ({ ...prev, selectedEpisode: index }));
        videoRef.current.src = episodes[index];
        videoRef.current.play();
    };
    
    const toggleMute = () => {
        if (!videoRef.current) return;
        
        videoRef.current.muted = !videoRef.current.muted;
        setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    };
    
    const toggleFullscreen = async () => {
        if (!videoRef.current) return;
        
        const playerContainer = videoRef.current.closest('[class*="player"]') as HTMLElement;
        if (!playerContainer) return;
        
        if (!document.fullscreenElement) {
            await enterFullscreen(playerContainer);
        } else {
            await exitFullscreen();
        }
    };
    
    return {
        ...state,
        videoRef,
        episodes,
        setIsPlaying: (value: boolean | ((prevState: boolean) => boolean)) => setState(prev => ({ ...prev, isPlaying: typeof value === 'function' ? value(prev.isPlaying) : value })),
        setCurrentTime: (value: number | ((prevState: number) => number)) => setState(prev => ({ ...prev, currentTime: typeof value === 'function' ? value(prev.currentTime) : value })),
        setVolume: (value: number | ((prevState: number) => number)) => setState(prev => ({ ...prev, volume: typeof value === 'function' ? value(prev.volume) : value })),
        togglePlay,
        switchEpisode,
        toggleMute,
        toggleFullscreen
    };
};

export default useControl;