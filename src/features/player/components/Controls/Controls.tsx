'use client';

import { FC } from 'react';
import { Play, Pause, Maximize, SkipForward, SkipBack } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { formatTime } from '../../lib/utils';
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';
import { SettingsMenu } from './SettingsMenu';
import styles from './Controls.module.scss';

export const Controls: FC = () => {
  const { state, controls } = usePlayer();

  const qualities = ['auto', '1080p', '720p', '480p', '360p'];
  const voiceOptions = [
    { id: 'anilibria', name: 'AniLibria' },
    { id: 'anidub', name: 'AniDub' },
    { id: 'animevost', name: 'AnimeVost' },
    { id: 'shiza', name: 'Shiza Project' },
  ];

  return (
    <div
      className={`${styles.controls} ${state.isControlsVisible ? styles.visible : ''}`}
    >
      <ProgressBar />

      <div className={styles.bottom}>
        <div className={styles.left}>
          <button
            className={styles.btn}
            onClick={controls.togglePlayback}
            aria-label={state.isPlaying ? 'Pause' : 'Play'}
          >
            {state.isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            className={styles.btn}
            onClick={() => controls.skipBackward(10)}
            aria-label="Skip backward 10 seconds"
          >
            <SkipBack size={18} />
          </button>

          <button
            className={styles.btn}
            onClick={() => controls.skipForward(10)}
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward size={18} />
          </button>

          <VolumeControl />

          {state.duration > 0 && (
            <div className={styles.time}>
              {formatTime(state.currentTime)} / {formatTime(state.duration)}
            </div>
          )}
        </div>

        <div className={styles.right}>
          <button
            className={styles.btn}
            onClick={() => {
              const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
              const currentIndex = rates.indexOf(state.playbackRate);
              const nextIndex = (currentIndex + 1) % rates.length;
              controls.setPlaybackRate(rates[nextIndex]);
            }}
            aria-label="Playback speed"
          >
            <span className={styles.speed}>{state.playbackRate}x</span>
          </button>

          <SettingsMenu
            currentQuality={state.quality}
            qualities={qualities}
            onQualityChange={controls.setQuality}
            voiceOptions={voiceOptions}
            currentVoice="anilibria"
            onVoiceChange={(voiceId) => console.log('Voice changed:', voiceId)}
          />

          <button
            className={styles.btn}
            onClick={controls.toggleFullscreen}
            aria-label="Fullscreen"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>

      {state.isBuffering && (
        <div className={styles.buffering}>
          <div className={styles.spinner} />
        </div>
      )}
    </div>
  );
};
