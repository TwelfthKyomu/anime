'use client';

import { Player } from '@/features/player';
import { Container, Badge } from '@/shared/ui';
import { Stars } from '@/features/content/components/Rating/Stars';
import { EpisodeList } from '@/features/content';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import styles from './page.module.scss';

interface Episode {
  id: number;
  number: number;
  title: string;
  duration: string;
  rating: number;
  reviewCount: number;
  isWatched?: boolean;
  userRating?: number;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
  replies: number;
}

interface AnimePageProps {
  params?: { id: string };
  animeData?: {
    title: string;
    originalTitle: string;
    rating: number;
    year: number;
    episodeCount: number;
    ageRating: string;
    genres: string[];
    description: string;
    poster: string;
    videoSources: Array<{ src: string; type: string }>;
    isCompleted: boolean;
  };
  episodes?: Episode[];
  reviews?: Review[];
  comments?: Comment[];
}

export default function AnimePage({ 
  animeData,
  episodes = [],
  reviews = [],
  comments = []
}: AnimePageProps) {
  const handleEpisodeRating = (episodeId: number, rating: number, review?: string) => {
    console.log('Episode rated:', { episodeId, rating, review });
    // TODO: API запрос для сохранения рейтинга
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container>
          <div className={styles.emptyState}>
            <p>Аниме не найдено</p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );

}
