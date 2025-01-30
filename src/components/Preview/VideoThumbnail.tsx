'use client'
import { FC, useEffect, useState } from 'react';
import styles from './Preview.module.scss';

type VideoThumbnailProps = {
    videoSrc: string;
    width: number;
    height: number;
};

const VideoThumbnail: FC<VideoThumbnailProps> = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
    const {videoSrc, width, height} = props;
    
    useEffect(() => {
        if (videoElement) {
            const handleLoadedData = () => setIsLoading(false);
            
            videoElement.addEventListener('loadeddata', handleLoadedData);
            
            return () => {
                videoElement.removeEventListener('loadeddata', handleLoadedData);
            };
        }
    }, [videoElement]);
    
    
    return (
        <div className={ styles.previewVideo }>
            <video
                ref={ setVideoElement }
                autoPlay
                width={ width }
                height={ height }
                muted
                playsInline
                preload="metadata"
            >
                <source
                    src={ videoSrc }
                    type="video/mp4"/>
            </video>
        </div>
    );
};

export default VideoThumbnail;