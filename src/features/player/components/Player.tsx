'use client';

import { FC, useRef, useEffect } from 'react';
import { PlayerProvider } from '../context/PlayerContext';
import { Video } from './Video/Video';
import { Controls } from './Controls/Controls';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useGestureControls } from '../hooks/useGestureControls';
import { usePlayer } from '../context/PlayerContext';
import { VideoSource, PlayerConfig } from '../types';
import styles from './Player.module.scss';

interface PlayerContentProps {
  sources: VideoSource[];
  poster?: string;
}

const PlayerContent: FC<PlayerContentProps> = ({ sources, poster }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { controls, videoRef, setContainerRef } = usePlayer();

  // Устанавливаем containerRef в контекст
  useEffect(() => {
    if (setContainerRef) {
      setContainerRef(containerRef);
    }
  }, [setContainerRef]);

  useKeyboardShortcuts({ containerRef, controls });
  useGestureControls({ videoRef, controls });

  return (
    <div 
      ref={containerRef} 
      className={styles.player} 
      tabIndex={0}
      onMouseMove={controls.showControls}
      onMouseLeave={controls.hideControls}
    >
      <Video sources={sources} poster={poster} />
      <Controls />
    </div>
  );
};

interface PlayerProps {
  sources: VideoSource[];
  poster?: string;
  config?: Partial<PlayerConfig>;
  className?: string;
}

export const Player: FC<PlayerProps> = ({ sources, poster, config, className }) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <PlayerProvider config={config}>
        <PlayerContent sources={sources} poster={poster} />
      </PlayerProvider>
    </div>
  );
};
