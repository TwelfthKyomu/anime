import { useCallback, useRef, RefObject } from 'react';
import { PlayerControls, PlayerState } from '../types';

interface UsePlayerControlsProps {
  videoRef: RefObject<HTMLVideoElement>;
  containerRef?: RefObject<HTMLDivElement>;
  state: PlayerState;
  updateState: (updates: Partial<PlayerState>) => void;
  controlsTimeout: number;
  skipInterval: number;
}

export const usePlayerControls = ({
  videoRef,
  containerRef,
  state,
  updateState,
  controlsTimeout,
  skipInterval,
}: UsePlayerControlsProps): PlayerControls => {
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    updateState({ isControlsVisible: true });

    if (state.isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        updateState({ isControlsVisible: false });
      }, controlsTimeout);
    }
  }, [state.isPlaying, controlsTimeout, updateState]);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Play failed:', error);
        }
      });
    }
  }, [videoRef]);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, [videoRef]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      console.error('Video element not found');
      return;
    }

    // Проверяем, что видео готово к воспроизведению
    if (!video.src && !video.currentSrc) {
      console.error('No video source loaded');
      return;
    }

    if (state.isPlaying) {
      video.pause();
    } else {
      // Используем промис для обработки ошибок воспроизведения
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Игнорируем AbortError, так как это нормально при быстрых переключениях
          if (error.name !== 'AbortError') {
            console.error('Play failed:', error);
          }
        });
      }
    }
    resetControlsTimeout();
  }, [state.isPlaying, videoRef, resetControlsTimeout]);

  const toggleFullscreen = useCallback(async () => {
    const container = containerRef?.current;
    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [containerRef]);

  const togglePictureInPicture = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await video.requestPictureInPicture();
    }
  }, [videoRef]);

  const seek = useCallback(
    (time: number) => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = Math.max(0, Math.min(time, video.duration));
      resetControlsTimeout();
    },
    [videoRef, resetControlsTimeout]
  );

  const skipForward = useCallback(
    (seconds = skipInterval) => {
      const video = videoRef.current;
      if (!video) return;
      seek(video.currentTime + seconds);
    },
    [videoRef, seek, skipInterval]
  );

  const skipBackward = useCallback(
    (seconds = skipInterval) => {
      const video = videoRef.current;
      if (!video) return;
      seek(video.currentTime - seconds);
    },
    [videoRef, seek, skipInterval]
  );

  const setVolume = useCallback(
    (volume: number) => {
      const video = videoRef.current;
      if (!video) return;

      const safeVolume = Math.max(0, Math.min(1, volume));
      video.volume = safeVolume;

      if (safeVolume > 0 && video.muted) {
        video.muted = false;
        updateState({ isMuted: false });
      } else if (safeVolume === 0 && !video.muted) {
        video.muted = true;
        updateState({ isMuted: true });
      }

      resetControlsTimeout();
    },
    [videoRef, updateState, resetControlsTimeout]
  );

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    updateState({ isMuted: video.muted });
    resetControlsTimeout();
  }, [videoRef, updateState, resetControlsTimeout]);

  const setPlaybackRate = useCallback(
    (rate: number) => {
      const video = videoRef.current;
      if (!video) return;

      video.playbackRate = rate;
      updateState({ playbackRate: rate });
      resetControlsTimeout();
    },
    [videoRef, updateState, resetControlsTimeout]
  );

  const showControls = useCallback(() => {
    resetControlsTimeout();
  }, [resetControlsTimeout]);

  const hideControls = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    updateState({ isControlsVisible: false });
  }, [updateState]);

  const setQuality = useCallback(
    (quality: PlayerState['quality']) => {
      updateState({ quality });
      resetControlsTimeout();
    },
    [updateState, resetControlsTimeout]
  );

  return {
    play,
    pause,
    togglePlayback,
    toggleFullscreen,
    togglePictureInPicture,
    seek,
    setVolume,
    toggleMute,
    setPlaybackRate,
    showControls,
    hideControls,
    setQuality,
    skipForward,
    skipBackward,
  };
};
