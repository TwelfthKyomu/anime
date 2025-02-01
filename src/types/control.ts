import { Dispatch, RefObject, SetStateAction } from "react";

export interface BrowserDocument extends Document {
    webkitExitFullscreen?: () => Promise<void>;
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
}

export interface BrowserElement extends HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
}

export interface VideoState {
    isPlaying: boolean;
    currentTime: number;
    volume: number;
    selectedEpisode: number;
    isBuffering: boolean;
    isMuted: boolean;
    isFullscreen: boolean;
}

export interface VideoActions {
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    setCurrentTime: Dispatch<SetStateAction<number>>;
    setVolume: Dispatch<SetStateAction<number>>;
    togglePlay: () => void;
    switchEpisode: (index: number) => void;
    toggleMute: () => void;
    toggleFullscreen: () => void;
}

export interface VideoRefs {
    videoRef: RefObject<HTMLVideoElement>;
}

export interface ControlT extends VideoState, VideoActions, VideoRefs {
    episodes: string[];
}