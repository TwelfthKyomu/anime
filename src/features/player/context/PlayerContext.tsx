'use client';

import { createContext, useContext, useRef, useMemo, FC, ReactNode, useEffect, useCallback, RefObject } from 'react';
import { PlayerContextValue, PlayerConfig } from '../types';
import { usePlayerState } from '../hooks/usePlayerState';
import { usePlayerControls } from '../hooks/usePlayerControls';
import { useVideoEvents } from '../hooks/useVideoEvents';

const PlayerContext = createContext<PlayerContextValue | null>(null);

const DEFAULT_CONFIG: Required<PlayerConfig> = {
  autoplay: false,
  muted: false,
  volume: 1,
  playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  qualities: ['auto', '1080p', '720p', '480p', '360p'],
  controlsTimeout: 3000,
  skipInterval: 10,
  preload: 'metadata',
};

interface PlayerProviderProps {
  children: ReactNode;
  config?: Partial<PlayerConfig>;
}

export const PlayerProvider: FC<PlayerProviderProps> = ({ children, config = {} }) => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<RefObject<HTMLDivElement> | null>(null);
  
  const { state, updateState } = usePlayerState(
    mergedConfig.volume,
    mergedConfig.muted
  );

  const controls = usePlayerControls({
    videoRef,
    containerRef: containerRef.current || undefined,
    state,
    updateState,
    controlsTimeout: mergedConfig.controlsTimeout,
    skipInterval: mergedConfig.skipInterval,
  });

  useVideoEvents({ videoRef, updateState });

  const setContainerRef = useCallback((ref: RefObject<HTMLDivElement>) => {
    containerRef.current = ref;
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      updateState({ isFullscreen: Boolean(document.fullscreenElement) });
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [updateState]);

  // Picture-in-picture change listener
  useEffect(() => {
    const handlePipChange = () => {
      updateState({ isPictureInPicture: Boolean(document.pictureInPictureElement) });
    };

    document.addEventListener('enterpictureinpicture', handlePipChange);
    document.addEventListener('leavepictureinpicture', handlePipChange);

    return () => {
      document.removeEventListener('enterpictureinpicture', handlePipChange);
      document.removeEventListener('leavepictureinpicture', handlePipChange);
    };
  }, [updateState]);

  const contextValue = useMemo(
    () => ({
      state,
      controls,
      videoRef,
      setContainerRef,
    }),
    [state, controls, setContainerRef]
  );

  return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};

export const usePlayer = (): PlayerContextValue => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
