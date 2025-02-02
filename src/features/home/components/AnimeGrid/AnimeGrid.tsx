'use client';

import { FC } from 'react';
import { AnimeCard } from '../AnimeCard/AnimeCard';
import styles from './AnimeGrid.module.scss';

interface Anime {
  id: number;
  title: string;
  image: string;
  rating: number;
  episode: number;
  href: string;
}

interface AnimeGridProps {
  title: string;
  animes: Anime[];
}

export const AnimeGrid: FC<AnimeGridProps> = ({ title, animes }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {animes.map((anime) => (
          <AnimeCard key={anime.id} {...anime} />
        ))}
      </div>
    </section>
  );
};
