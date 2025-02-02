import { useEffect, RefObject } from 'react';
import { PlayerState } from '../types';

interface UseVideoEventsProps {
  videoRef: RefObject<HTMLVideoElement>;
  updateState: (updates: Partial<PlayerState>) => void;
}

export const useVideoEvents = ({ videoRef, updateState }: UseVideoEventsProps) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const getSafeDuration = (duration: number): number => {
      return isNaN(duration) || !isFinite(duration) ? 0 : duration;
    };

    const handleEvent = (event: Event) => {
      const updates: Partial<PlayerState> = {};

      switch (event.type) {
        case 'play':
          updates.isPlaying = true;
          updates.isBuffering = false;
          break;
        case 'pause':
          updates.isPlaying = false;
          break;
        case 'timeupdate':
          updates.currentTime = isNaN(video.currentTime) ? 0 : video.currentTime;
          break;
        case 'durationchange':
        case 'loadedmetadata':
        case 'loadeddata':
          const newDuration = getSafeDuration(video.duration);
          if (newDuration > 0) {
            updates.duration = newDuration;
          }
          break;
        case 'volumechange':
          updates.volume = video.volume;
          updates.isMuted = video.muted;
          break;
        case 'waiting':
          updates.isBuffering = true;
          break;
        case 'canplay':
        case 'canplaythrough':
        case 'playing':
          updates.isBuffering = false;
          break;
        case 'ratechange':
          updates.playbackRate = video.playbackRate;
          break;
      }

      if (Object.keys(updates).length > 0) {
        updateState(updates);
      }
    };

    const events = [
      'play',
      'pause',
      'timeupdate',
      'durationchange',
      'volumechange',
      'waiting',
      'canplay',
      'canplaythrough',
      'playing',
      'ratechange',
      'loadedmetadata',
      'loadeddata',
    ];

    events.forEach((event) => video.addEventListener(event, handleEvent));

    return () => {
      events.forEach((event) => video.removeEventListener(event, handleEvent));
    };
  }, [videoRef, updateState]);
};
