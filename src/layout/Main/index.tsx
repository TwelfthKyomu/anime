'use client';

import { Hero, AnimeGrid } from '@/features/home';
import { Container } from '@/shared/ui';

interface Anime {
  id: number;
  title: string;
  image: string;
  rating: number;
  episode: number;
  href: string;
}

interface VoiceOption {
  id: string;
  name: string;
  href: string;
}

interface MainProps {
  animes?: Anime[];
  heroData?: {
    title: string;
    originalTitle: string;
    rating: number;
    video: string;
    poster: string;
    href: string;
    voiceOptions: VoiceOption[];
    previewFragments: Array<{ start: number; duration: number }>;
  };
}

const Main = ({ animes = [], heroData }: MainProps) => {
  return (
    <main>
      {heroData && (
        <Hero
          title={heroData.title}
          originalTitle={heroData.originalTitle}
          rating={heroData.rating}
          video={heroData.video}
          poster={heroData.poster}
          href={heroData.href}
          voiceOptions={heroData.voiceOptions}
          previewFragments={heroData.previewFragments}
        />
      )}

      {animes.length > 0 && (
        <Container>
          <AnimeGrid title="Последние обновления" animes={animes} />
        </Container>
      )}
    </main>
  );
};

export default Main;
