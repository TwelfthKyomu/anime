'use client';

import { FC, useRef, useState, useCallback, MouseEvent } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import styles from './VolumeControl.module.scss';

export const VolumeControl: FC = () => {
  const { state, controls } = usePlayer();
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const slider = sliderRef.current;
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const position = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      controls.setVolume(position);
    },
    [controls]
  );

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={styles.btn}
        onClick={controls.toggleMute}
        aria-label={state.isMuted ? 'Unmute' : 'Mute'}
      >
        {state.isMuted || state.volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <div className={`${styles.slider} ${isHovered ? styles.visible : ''}`}>
        <div
          ref={sliderRef}
          className={styles.track}
          onClick={handleSliderClick}
          role="slider"
          aria-label="Volume"
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={state.volume}
        >
          <div
            className={styles.fill}
            style={{ width: `${state.isMuted ? 0 : state.volume * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
