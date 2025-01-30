'use client'
import { FC, useEffect, useRef } from 'react';
import styles from './Player.module.scss';

type PreviewTooltipProps = {
    currentTime: number;
    duration: number;
    videoSrc: string;
    position: { x: number; y: number } | null;
    visible: boolean;
};

const PreviewTooltip: FC<PreviewTooltipProps> = ({
    currentTime,
    duration,
    videoSrc,
    position,
    visible
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = currentTime;
        }
    }, [currentTime]);

    if (!position || !visible) return null;

    const tooltipStyle = {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)'
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div
            className={ styles.previewTooltip }
            style={ tooltipStyle }
        >
            <video
                ref={ videoRef }
                className={ styles.previewVideo }
                src={ videoSrc }
                width={ 160 }
                height={ 90 }
                muted
                playsInline
            />
            <div className={ styles.previewTime }>
                { formatTime(currentTime) }
            </div>
        </div>
    );
};

export default PreviewTooltip;