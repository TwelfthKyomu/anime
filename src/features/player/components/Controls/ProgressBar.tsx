'use client';

import { FC, useRef, useState, useCallback, MouseEvent, TouchEvent } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { formatTime } from '../../lib/utils';
import styles from './ProgressBar.module.scss';

export const ProgressBar: FC = () => {
  const { state, controls } = usePlayer();
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);

  const getTimeFromPosition = useCallback(
    (clientX: number): number => {
      const bar = progressRef.current;
      if (!bar || !state.duration) return 0;

      const rect = bar.getBoundingClientRect();
      const position = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return position * state.duration;
    },
    [state.duration]
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const time = getTimeFromPosition(e.clientX);
      setHoverTime(time);
      
      const bar = progressRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      setHoverPosition(((e.clientX - rect.left) / rect.width) * 100);

      if (isDragging) {
        controls.seek(time);
      }
    },
    [getTimeFromPosition, isDragging, controls]
  );

  const handleMouseLeave = useCallback(() => {
    setHoverTime(null);
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const time = getTimeFromPosition(e.clientX);
      controls.seek(time);
    },
    [getTimeFromPosition, controls]
  );

  const progress = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  return (
    <div className={styles.container}>
      <div
        ref={progressRef}
        className={styles.progressBar}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="slider"
        aria-label="Video progress"
        aria-valuemin={0}
        aria-valuemax={state.duration}
        aria-valuenow={state.currentTime}
      >
        <div className={styles.track}>
          <div className={styles.progress} style={{ width: `${progress}%` }} />
          {hoverTime !== null && (
            <div className={styles.hover} style={{ left: `${hoverPosition}%` }}>
              <span className={styles.hoverTime}>{formatTime(hoverTime)}</span>
            </div>
          )}
        </div>
        <div className={styles.thumb} style={{ left: `${progress}%` }} />
      </div>
    </div>
  );
};
