import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";

type ControlT = {
    videoRef: RefObject<HTMLVideoElement>,
    isPlaying: boolean,
    setIsPlaying: Dispatch<SetStateAction<boolean>>,
    currentTime: number,
    setCurrentTime: Dispatch<SetStateAction<number>>,
    volume: number,
    setVolume: Dispatch<SetStateAction<number>>,
    selectedEpisode: number,
    setSelectedEpisode: Dispatch<SetStateAction<number>>,
    togglePlay: () => void,
    switchEpisode: (index: number) => void,
    episodes: string[],
    isBuffering: boolean,
    isMuted: boolean,
    toggleMute: () => void,
    isFullscreen: boolean,
    toggleFullscreen: () => void
}

const useControl = (episodes: string[]): ControlT => {
    const videoRef = useRef<HTMLVideoElement>(null!);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState(0);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    const togglePlay = () => {
        if (videoRef.current?.paused) {
            videoRef.current.play();
        } else {
            videoRef.current?.pause();
        }
        setIsPlaying(!isPlaying);
    };
    
    const switchEpisode = (index: number) => {
        setSelectedEpisode(index);
        if (videoRef.current) {
            videoRef.current.src = episodes[index];
            videoRef.current.play();
        }
    };
    
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space') togglePlay();
            if (e.code === 'ArrowRight') videoRef.current!.currentTime += 10;
            if (e.code === 'ArrowLeft') videoRef.current!.currentTime -= 10;
        };
        
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);
    
    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };
    
    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;
        
        if (!document.fullscreenElement) {
            video.requestFullscreen().then(() => setIsFullscreen(true));
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false));
        }
    };
    
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        
        const handleWaiting = () => setIsBuffering(true);
        const handlePlaying = () => setIsBuffering(false);
        const handleVolumeChange = () => setIsMuted(video.muted);
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('playing', handlePlaying);
        video.addEventListener('volumechange', handleVolumeChange);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        
        return () => {
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('playing', handlePlaying);
            video.removeEventListener('volumechange', handleVolumeChange);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);
    
    useEffect(() => {
        if (selectedEpisode < episodes.length - 1) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'video';
            link.href = episodes[selectedEpisode + 1];
            document.head.appendChild(link);
            return () => {
                document.head.removeChild(link);
            };
        }
    }, [selectedEpisode, episodes]);
    
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.volume = volume;
        }
    }, [volume]);
    
    return {
        videoRef,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        volume,
        setVolume,
        selectedEpisode,
        setSelectedEpisode,
        togglePlay,
        switchEpisode,
        episodes,
        isBuffering,
        isMuted,
        toggleMute,
        isFullscreen,
        toggleFullscreen
    };
}

export default useControl;