'use client';

import { FC } from 'react';
import styles from './Estimation.module.scss';

export const Estimation: FC = () => {
  return (
    <div className={styles.estimation}>
      <span className={styles.badge}>18+</span>
      <span className={styles.separator}>•</span>
      <span className={styles.text}>2024</span>
      <span className={styles.separator}>•</span>
      <span className={styles.text}>24 эпизода</span>
    </div>
  );
};
