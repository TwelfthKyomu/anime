'use client';

import { FC } from 'react';
import { ChevronDown } from 'lucide-react';
import { Stars } from './Stars';
import styles from './Rating.module.scss';

interface RatingProps {
  position?: 'left' | 'right';
}

export const Rating: FC<RatingProps> = () => {
  return (
    <div className={styles.rating}>
      <span className={styles.label}>Рейтинг</span>
      <button className={styles.arrow} aria-label="Show rating details">
        <ChevronDown size={20} />
      </button>
      <Stars rating={4.5} />
    </div>
  );
};
