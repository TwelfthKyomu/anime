"use client"
import { FC, useEffect, useState } from 'react';
import styles from './Player.module.scss';

import Timer from './Timer';
import { episodes } from '@test/mockData/player/player';
import useControl from "@/components/Player/control/useControl";
import PreviewTooltip from './PreviewTooltip';

const Player: FC = () => {
    const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);
    const [previewTime, setPreviewTime] = useState(0);
    const [showPreview, setShowPreview] = useState(false);

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
        toggleFullscreen,
        isBuffering,
    } = useControl(episodes);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            switch(e.key.toLowerCase()) {
                case ' ':
                case 'k':
                    togglePlay();
                    break;
                case 'f':
                    toggleFullscreen();
                    break;
                case 'm':
                    toggleMute();
                    break;
                case 'arrowleft':
                    if (videoRef.current) videoRef.current.currentTime -= 10;
                    break;
                case 'arrowright':
                    if (videoRef.current) videoRef.current.currentTime += 10;
                    break;
                case 'arrowup':
                    setVolume(prev => Math.min(1, prev + 0.1));
                    break;
                case 'arrowdown':
                    setVolume(prev => Math.max(0, prev - 0.1));
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [togglePlay, toggleFullscreen, toggleMute, setVolume]);
    
    return (
        <div className={ `${styles.player} ${isFullscreen ? styles.fullscreen : ''}` }>
            <video
                ref={ videoRef }
                src={ episodes[selectedEpisode] }
                className={ styles.video }
                onTimeUpdate={ (e) => setCurrentTime(e.currentTarget.currentTime) }
            />
            
            { isBuffering && (
                <div className={ `${styles.bufferingIndicator} ${styles.visible}` }>
                    Loading...
                </div>
            ) }

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
                            onMouseMove={ (e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const percent = x / rect.width;
                                const previewTime = percent * (videoRef.current?.duration || 0);
                                setPreviewPosition({ x: e.clientX, y: rect.top });
                                setPreviewTime(previewTime);
                                setShowPreview(true);
                            } }
                            onMouseLeave={ () => setShowPreview(false) }
                            className={ styles.progress }
                        />
                        <PreviewTooltip
                            currentTime={ previewTime }
                            duration={ videoRef.current?.duration || 0 }
                            videoSrc={ episodes[selectedEpisode] }
                            position={ previewPosition }
                            visible={ showPreview }
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
}
export default Player;