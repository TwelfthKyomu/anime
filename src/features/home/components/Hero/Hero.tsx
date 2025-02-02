'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Stars } from '@/features/content/components/Rating/Stars';
import { VideoPreview } from '@/shared/ui';
import { VoiceActingSelector } from './VoiceActingSelector';
import styles from './Hero.module.scss';

interface VoiceOption {
  id: string;
  name: string;
  href: string;
}

interface HeroProps {
  title: string;
  originalTitle: string;
  rating: number;
  video: string;
  poster: string;
  href: string;
  voiceOptions?: VoiceOption[];
  previewFragments?: { start: number; duration: number }[];
}

export const Hero: FC<HeroProps> = ({ 
  title, 
  originalTitle, 
  rating, 
  video, 
  poster, 
  href,
  voiceOptions = [],
  previewFragments
}) => {
  return (
    <Link href={href} className={styles.hero}>
      <div className={styles.videoWrapper}>
        <VideoPreview
          video={video}
          poster={poster}
          alt={title}
          fragments={previewFragments}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.info}>
        <div className={styles.rating}>
          <Stars rating={rating} />
          <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.originalTitle}>{originalTitle}</p>
      </div>

      {voiceOptions.length > 0 && (
        <div className={styles.voiceActing} onClick={(e) => e.preventDefault()}>
          <VoiceActingSelector options={voiceOptions} />
        </div>
      )}
    </Link>
  );
};
