import { useState, useCallback, useRef } from 'react';
import { PlayerState } from '../types';

const DEFAULT_STATE: PlayerState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isFullscreen: false,
  isPictureInPicture: false,
  isBuffering: false,
  playbackRate: 1,
  isControlsVisible: true,
  quality: 'auto',
};

export const usePlayerState = (initialVolume = 1, initialMuted = false) => {
  const [state, setState] = useState<PlayerState>({
    ...DEFAULT_STATE,
    volume: initialVolume,
    isMuted: initialMuted,
  });

  const updateState = useCallback((updates: Partial<PlayerState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  return { state, updateState };
};
