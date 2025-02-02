'use client';

import { FC, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './VideoPreview.module.scss';

interface PreviewFragment {
  start: number;
  duration: number;
}

interface VideoPreviewProps {
  video: string;
  poster: string;
  alt: string;
  fragments?: PreviewFragment[];
  className?: string;
}

export const VideoPreview: FC<VideoPreviewProps> = ({
  video,
  poster,
  alt,
  fragments = [
    { start: 0, duration: 3 },
    { start: 10, duration: 3 },
    { start: 20, duration: 3 }
  ],
  className
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentFragmentIndex, setCurrentFragmentIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoLoaded) return;

    const playFragment = () => {
      const fragment = fragments[currentFragmentIndex];
      video.currentTime = fragment.start;
      video.play();

      const timeout = setTimeout(() => {
        const nextIndex = (currentFragmentIndex + 1) % fragments.length;
        setCurrentFragmentIndex(nextIndex);
      }, fragment.duration * 1000);

      return timeout;
    };

    const timeout = playFragment();
    return () => clearTimeout(timeout);
  }, [currentFragmentIndex, isVideoLoaded, fragments]);

  return (
    <div className={`${styles.videoPreview} ${className || ''}`}>
      {!isVideoLoaded && (
        <Image
          src={poster}
          alt={alt}
          fill
          className={styles.poster}
          priority
        />
      )}
      <video
        ref={videoRef}
        className={`${styles.video} ${isVideoLoaded ? styles.visible : ''}`}
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};
