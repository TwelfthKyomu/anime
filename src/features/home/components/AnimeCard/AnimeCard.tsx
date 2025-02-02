'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Stars } from '@/features/content/components/Rating/Stars';
import { Badge } from '@/shared/ui';
import styles from './AnimeCard.module.scss';

interface AnimeCardProps {
  title: string;
  image: string;
  rating: number;
  episode: number;
  href: string;
}

export const AnimeCard: FC<AnimeCardProps> = ({ title, image, rating, episode, href }) => {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.image}
        />
        <div className={styles.overlay}>
          <Play size={32} className={styles.playIcon} />
        </div>
        <Badge className={styles.episode}>Эп. {episode}</Badge>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.rating}>
          <Stars rating={rating} />
          <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
};
