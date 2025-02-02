'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Player } from '@/features/player';
import { Estimation } from '../Estimation/Estimation';
import { Rating } from '../Rating/Rating';
import styles from './Preview.module.scss';

export const Preview: FC = () => {
  const videoSources = [
    {
      src: '/videos/solo_1.mp4',
      type: 'video/mp4',
    },
  ];

  return (
    <div className={styles.preview}>
      <div className={styles.description}>
        <div className={styles.name}>
          <Link href="/">
            <h1 className={styles.title}>Полное исследование</h1>
            <h2 className={styles.originalTitle}>Zenshuu</h2>
          </Link>
          <Estimation />
        </div>
        <div className={styles.actions}>
          <Rating />
          <button className={styles.favorite} aria-label="Add to favorites">
            <Heart size={24} />
          </button>
        </div>
      </div>

      <div className={styles.playerWrapper}>
        <Player 
          sources={videoSources} 
          poster="/image/img.png"
          config={{
            autoplay: false,
            volume: 0.8,
            preload: 'metadata',
          }}
        />
      </div>
    </div>
  );
};
