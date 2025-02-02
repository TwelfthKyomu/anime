'use client';

import { FC } from 'react';
import { RecommendationCard } from '../RecommendationCard/RecommendationCard';
import Solo from '@public/image/img.png';
import Solo1 from '@public/image/img_1.png';
import styles from './RecommendationList.module.scss';

const recommendations = [
  { id: 1, image: Solo, title: 'Solo Leveling', href: '/' },
  { id: 2, image: Solo, title: 'Solo Leveling', href: '/' },
  { id: 3, image: Solo1, title: 'Solo Leveling', href: '/' },
  { id: 4, image: Solo, title: 'Solo Leveling', href: '/' },
  { id: 5, image: Solo, title: 'Solo Leveling', href: '/' },
  { id: 6, image: Solo, title: 'Solo Leveling', href: '/' },
  { id: 7, image: Solo, title: 'Solo Leveling', href: '/' },
];

export const RecommendationList: FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Рекомендации</h2>
      <div className={styles.grid}>
        {recommendations.map((item) => (
          <RecommendationCard
            key={item.id}
            image={item.image}
            title={item.title}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
};
