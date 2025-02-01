"use client"
import { FC, memo, useCallback, useEffect, useState } from 'react';
import styles from './Player.module.scss';
import Timer from './Timer';
import { episodes } from '@test/mockData/player/player';
import useControl from "@/components/Player/Control/useControl";
import PreviewTooltip from './PreviewTooltip';
import { ControlButtonProps } from "@/types/player";


const ControlButton: FC<ControlButtonProps> = memo(({ onClick, icon, className }) => (
    <button
        onClick={ onClick }
        className={ className }>
        { icon }
    </button>
));

ControlButton.displayName = 'ControlButton';

interface VolumeControlProps {
    isMuted: boolean;
    volume: number;
    onVolumeChange: (value: number) => void;
    onToggleMute: () => void;
}

const VolumeControl: FC<VolumeControlProps> = memo(({ isMuted, volume, onVolumeChange, onToggleMute }) => (
    <div className={ styles.volumeControl }>
        <ControlButton
            onClick={ onToggleMute }
            icon={ isMuted ? '🔇' : '🔊' }
            className={ styles.controlButton }
        />
        <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={ isMuted ? 0 : volume }
            onChange={ (e) => onVolumeChange(parseFloat(e.target.value)) }
            className={ styles.volumeSlider }
        />
    </div>
));

VolumeControl.displayName = 'VolumeControl';

interface EpisodeSelectorProps {
    episodes: string[];
    selectedEpisode: number;
    onEpisodeSelect: (index: number) => void;
}

const EpisodeSelector: FC<EpisodeSelectorProps> = memo(({ episodes, selectedEpisode, onEpisodeSelect }) => (
    <div className={ styles.episodeSelector }>
        { episodes.map((_, index) => (
            <button
                key={ index }
                onClick={ () => onEpisodeSelect(index) }
                className={ `${styles.episodeButton} ${selectedEpisode === index ? styles.active : ''}` }
            >
                { index + 1 }
            </button>
        )) }
    </div>
));

EpisodeSelector.displayName = 'EpisodeSelector';

const Player: FC = memo(() => {
    const [previewState, setPreviewState] = useState({
        position: null as { x: number; y: number } | null,
        time: 0,
        isVisible: false
    });
    
    const {
        videoRef,
        selectedEpisode,
        setCurrentTime,
        togglePlay,
        isPlaying,
        currentTime,
        switchEpisode,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        isFullscreen,
        toggleFullscreen
    } = useControl(episodes);
    
    const handleKeyboardControls = useCallback((e: KeyboardEvent) => {
        const keyActions = {
            ' ': togglePlay,
            'k': togglePlay,
            'f': toggleFullscreen,
            'm': toggleMute,
            'arrowleft': () => videoRef.current && (videoRef.current.currentTime -= 10),
            'arrowright': () => videoRef.current && (videoRef.current.currentTime += 10),
            'arrowup': () => setVolume(prev => Math.min(1, prev + 0.1)),
            'arrowdown': () => setVolume(prev => Math.max(0, prev - 0.1))
        };
        
        const action = keyActions[e.key.toLowerCase() as keyof typeof keyActions];
        if (action) action();
    }, [togglePlay, toggleFullscreen, toggleMute, setVolume]);
    
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed]);
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyboardControls);
        return () => document.removeEventListener('keydown', handleKeyboardControls);
    }, [handleKeyboardControls]);
    
    const handleFullscreenStyles = useCallback(() => {
        const playerContainer = videoRef.current?.closest(`.${styles.player}`);
        const controlsElement = playerContainer?.querySelector(`.${styles.controls}`);
        
        if (!controlsElement) return;
        
        const applyStyles = (isFullscreen: boolean) => {
            
            
            // Ensure proper stacking context and overflow handling
            let parent = controlsElement.parentElement;
            while (parent && parent !== document.body) {
                if (isFullscreen) {
                    (parent as HTMLElement).style.setProperty('overflow', 'visible', 'important');
                    (parent as HTMLElement).style.setProperty('position', 'relative', 'important');
                } else {
                    (parent as HTMLElement).style.removeProperty('overflow');
                    (parent as HTMLElement).style.removeProperty('position');
                }
                parent = parent.parentElement;
            }
        };
        
        applyStyles(!!document.fullscreenElement);
    }, [styles]);
    
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let isMouseMoving = false;
        
        const handleMouseMove = () => {
            const controlsElement = videoRef.current?.closest(`.${styles.player}`)?.querySelector(`.${styles.controls}`);
            if (!controlsElement || !document.fullscreenElement) return;
            
            isMouseMoving = true;
            (controlsElement as HTMLElement).style.opacity = '1';
            clearTimeout(timeoutId);
            
            timeoutId = setTimeout(() => {
                if (document.fullscreenElement && !controlsElement.matches(':hover')) {
                    isMouseMoving = false;
                    (controlsElement as HTMLElement).style.opacity = '0';
                }
            }, 3000);
        };
        
        const handleMouseEnter = () => {
            const controlsElement = videoRef.current?.closest(`.${styles.player}`)?.querySelector(`.${styles.controls}`);
            if (controlsElement && document.fullscreenElement) {
                clearTimeout(timeoutId);
                (controlsElement as HTMLElement).style.opacity = '1';
            }
        };
        
        const handleMouseLeave = () => {
            const controlsElement = videoRef.current?.closest(`.${styles.player}`)?.querySelector(`.${styles.controls}`);
            if (controlsElement && document.fullscreenElement && !isMouseMoving) {
                (controlsElement as HTMLElement).style.opacity = '0';
            }
        };
        
        if (isFullscreen) {
            document.addEventListener('mousemove', handleMouseMove);
            const controlsElement = videoRef.current?.closest(`.${styles.player}`)?.querySelector(`.${styles.controls}`);
            if (controlsElement) {
                controlsElement.addEventListener('mouseenter', handleMouseEnter);
                controlsElement.addEventListener('mouseleave', handleMouseLeave);
            }
            handleMouseMove();
            handleFullscreenStyles();
        }
        
        const fullscreenEvents = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];
        fullscreenEvents.forEach(event => document.addEventListener(event, handleFullscreenStyles));
        
        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mousemove', handleMouseMove);
            const controlsElement = videoRef.current?.closest(`.${styles.player}`)?.querySelector(`.${styles.controls}`);
            if (controlsElement) {
                controlsElement.removeEventListener('mouseenter', handleMouseEnter);
                controlsElement.removeEventListener('mouseleave', handleMouseLeave);
            }
            fullscreenEvents.forEach(event => document.removeEventListener(event, handleFullscreenStyles));
        };
    }, [styles, isFullscreen, handleFullscreenStyles]);
    
    const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLVideoElement>) => {
        const { clientX } = e;
        const { left, width } = videoRef.current?.getBoundingClientRect() || { left: 0, width: 0 };
        const clickPosition = (clientX - left) / width;
        
        if (clickPosition < 0.3) {
            videoRef.current!.currentTime -= 10;
        } else if (clickPosition > 0.7) {
            videoRef.current!.currentTime += 10;
        }
    }, []);
    
    const handleProgressHover = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width;
        const previewTime = percent * (videoRef.current?.duration || 0);
        
        setPreviewState({
            position: { x: e.clientX, y: rect.top },
            time: previewTime,
            isVisible: true
        });
    }, []);
    
    return (
        <div className={ `${styles.player} ${isFullscreen ? styles.fullscreen : ''}` }>
            <video
                ref={ videoRef }
                src={ episodes[selectedEpisode] }
                className={ styles.video }
                onTimeUpdate={ (e) => setCurrentTime(e.currentTarget.currentTime) }
                onDoubleClick={ handleDoubleClick }
                controls={ false }
            />
            
            <div className={ styles.controls }>
                <div className={ styles.playingInline }>
                    <button
                        onClick={ togglePlay }
                        className={ styles.controlButton }>
                        { isPlaying ? '⏸' : '▶' }
                    </button>
                    <div className={ styles.volumeControl }>
                        <button
                            onClick={ toggleMute }
                            className={ styles.controlButton }>
                            { isMuted ? '🔇' : '🔊' }
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={ isMuted ? 0 : volume }
                            onChange={ (e) => setVolume(parseFloat(e.target.value)) }
                            className={ styles.volumeSlider }
                        />
                    </div>
                    
                    <div className={ styles.progressContainer }>
                        <input
                            type="range"
                            min="0"
                            max={ videoRef.current?.duration || 0 }
                            value={ currentTime }
                            onChange={ (e) => {
                                if (videoRef.current) {
                                    videoRef.current.currentTime = +e.target.value;
                                }
                            } }
                            onMouseMove={ handleProgressHover }
                            onMouseLeave={ () => setPreviewState(prev => ({ ...prev, isVisible: false })) }
                            className={ styles.progress }
                            style={ {
                                background: videoRef.current && videoRef.current.buffered.length > 0
                                    ? `linear-gradient(to right,
                                        red ${((videoRef.current.buffered.end(videoRef.current.buffered.length - 1) / videoRef.current.duration) * 100).toFixed(0)}%,
                                        rgba(255,255,255,0.2) ${((videoRef.current.buffered.end(videoRef.current.buffered.length - 1) / videoRef.current.duration) * 100).toFixed(0)}%)`
                                    : 'rgba(255,255,255,0.2)'
                            } }
                        />
                        <PreviewTooltip
                            currentTime={ previewState.time }
                            duration={ videoRef.current?.duration || 0 }
                            videoSrc={ episodes[selectedEpisode] }
                            position={ previewState.position }
                            visible={ previewState.isVisible }
                        />
                    </div>
                    
                    <Timer/>
                    
                    <button
                        onClick={ toggleFullscreen }
                        className={ styles.controlButton }>
                        { isFullscreen ? '⊹' : '⊏' }
                    </button>
                </div>
                <div className={ styles.episodeSelector }>
                    { episodes.map((_, index) => (
                        <button
                            key={ index }
                            onClick={ () => switchEpisode(index) }
                            className={ `${styles.episodeButton} ${selectedEpisode === index ? styles.active : ''}` }
                        >
                            { index + 1 }
                        </button>
                    )) }
                </div>
            </div>
        </div>
    );
});
Player.displayName = 'Player';

export default memo(Player);