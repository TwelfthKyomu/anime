import { useEffect, useRef, RefObject } from 'react';
import { PlayerControls } from '../types';

interface UseGestureControlsProps {
  videoRef: RefObject<HTMLVideoElement>;
  controls: PlayerControls;
}

export const useGestureControls = ({
  videoRef,
  controls,
}: UseGestureControlsProps) => {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      touchStartTime.current = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;
      const deltaTime = Date.now() - touchStartTime.current;

      // Double tap to play/pause
      if (deltaTime < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        controls.togglePlayback();
        return;
      }

      // Swipe gestures
      if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 50) {
        if (deltaX > 0) {
          controls.skipForward();
        } else {
          controls.skipBackward();
        }
      }
    };

    video.addEventListener('touchstart', handleTouchStart);
    video.addEventListener('touchend', handleTouchEnd);

    return () => {
      video.removeEventListener('touchstart', handleTouchStart);
      video.removeEventListener('touchend', handleTouchEnd);
    };
  }, [videoRef, controls]);
};
