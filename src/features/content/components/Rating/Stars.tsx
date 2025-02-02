'use client';

import { FC, memo } from 'react';
import { Star } from 'lucide-react';
import styles from './Stars.module.scss';

interface StarsProps {
  rating: number;
  count?: number;
  size?: number;
}

export const Stars: FC<StarsProps> = memo(({ rating, count = 5, size = 16 }) => {
  const flooredRating = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const getStarClass = (index: number) => {
    if (index < flooredRating) return styles.full;
    if (index === flooredRating && hasHalfStar) return styles.half;
    return styles.empty;
  };

  return (
    <div className={styles.stars}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={`${styles.star} ${getStarClass(index)}`}>
          <Star size={size} fill="currentColor" />
        </div>
      ))}
    </div>
  );
});

Stars.displayName = 'Stars';
