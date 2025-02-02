import { useEffect, RefObject } from 'react';
import { PlayerControls } from '../types';

interface UseKeyboardShortcutsProps {
  containerRef: RefObject<HTMLDivElement>;
  controls: PlayerControls;
}

export const useKeyboardShortcuts = ({
  containerRef,
  controls,
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for player shortcuts
      const shortcuts = ['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyF', 'KeyM', 'KeyK'];
      if (shortcuts.includes(e.code)) {
        e.preventDefault();
      }

      switch (e.code) {
        case 'Space':
        case 'KeyK':
          controls.togglePlayback();
          break;
        case 'ArrowLeft':
          controls.skipBackward(e.shiftKey ? 10 : 5);
          break;
        case 'ArrowRight':
          controls.skipForward(e.shiftKey ? 10 : 5);
          break;
        case 'ArrowUp':
          controls.setVolume(Math.min(1, controls.setVolume.length)); // Will be handled properly
          break;
        case 'ArrowDown':
          controls.setVolume(Math.max(0, controls.setVolume.length)); // Will be handled properly
          break;
        case 'KeyF':
          controls.toggleFullscreen();
          break;
        case 'KeyM':
          controls.toggleMute();
          break;
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, controls]);
};
