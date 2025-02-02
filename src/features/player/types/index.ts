export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  isPictureInPicture: boolean;
  isBuffering: boolean;
  playbackRate: number;
  isControlsVisible: boolean;
  quality: 'auto' | '1080p' | '720p' | '480p' | '360p';
}

export interface PlayerControls {
  play: () => void;
  pause: () => void;
  togglePlayback: () => void;
  toggleFullscreen: () => Promise<void>;
  togglePictureInPicture: () => Promise<void>;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  showControls: () => void;
  hideControls: () => void;
  setQuality: (quality: PlayerState['quality']) => void;
  skipForward: (seconds?: number) => void;
  skipBackward: (seconds?: number) => void;
}

export interface PlayerContextValue {
  state: PlayerState;
  controls: PlayerControls;
  videoRef: React.RefObject<HTMLVideoElement>;
  setContainerRef?: (ref: React.RefObject<HTMLDivElement>) => void;
}

export interface VideoSource {
  src: string;
  type?: string;
  quality?: PlayerState['quality'];
}

export interface PlayerConfig {
  autoplay?: boolean;
  muted?: boolean;
  volume?: number;
  playbackRates?: number[];
  qualities?: PlayerState['quality'][];
  controlsTimeout?: number;
  skipInterval?: number;
  preload?: 'none' | 'metadata' | 'auto';
}
