'use client';

import { FC, useEffect, memo } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { useHLS } from '../../hooks/useHLS';
import { VideoSource } from '../../types';
import styles from './Video.module.scss';

interface VideoProps {
  sources: VideoSource[];
  poster?: string;
  className?: string;
}

const VideoComponent: FC<VideoProps> = ({ sources, poster, className }) => {
  const { videoRef, state, controls } = usePlayer();
  
  // Получаем первый источник (можно расширить для множественных источников)
  const primarySource = sources[0]?.src || '';

  // HLS поддержка
  useHLS({
    videoRef,
    src: primarySource,
    onError: (error) => {
      console.error('HLS Error:', error);
    },
    onQualityLevels: (levels) => {
      console.log('Available quality levels:', levels);
    },
  });

  // Preload optimization + Network Information API
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enable hardware acceleration hints
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    
    // Адаптивная стратегия preload на основе соединения
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      const effectiveType = connection.effectiveType; // '4g', '3g', '2g', 'slow-2g'
      const saveData = connection.saveData; // Режим экономии трафика
      
      console.log(`Network: ${effectiveType}, Save Data: ${saveData}`);
      
      if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
        // Медленное соединение - минимальная предзагрузка
        video.setAttribute('preload', 'none');
      } else if (effectiveType === '3g') {
        // Среднее соединение - только метаданные
        video.setAttribute('preload', 'metadata');
      } else {
        // Быстрое соединение - автозагрузка
        video.setAttribute('preload', 'auto');
      }
      
      // Слушаем изменения соединения
      const handleConnectionChange = () => {
        console.log(`Connection changed: ${connection.effectiveType}`);
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        connection.removeEventListener('change', handleConnectionChange);
      };
    } else {
      // Fallback если Network Information API недоступен
      video.setAttribute('preload', 'metadata');
    }
  }, [videoRef]);

  // Обработчик клика на видео для play/pause
  const handleVideoClick = () => {
    controls.togglePlayback();
  };

  return (
    <video
      ref={videoRef}
      className={`${styles.video} ${className || ''}`}
      poster={poster}
      preload="metadata"
      playsInline
      crossOrigin="anonymous"
      onClick={handleVideoClick}
    />
  );
};

export const Video = memo(VideoComponent);
