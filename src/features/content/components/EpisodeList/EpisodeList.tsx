'use client';

import { FC, useState } from 'react';
import { Play, Star } from 'lucide-react';
import { Stars } from '../Rating/Stars';
import { EpisodeRatingModal } from '../EpisodeRating/EpisodeRatingModal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui';
import styles from './EpisodeList.module.scss';

interface Episode {
  id: number;
  number: number;
  title: string;
  duration: string;
  thumbnail?: string;
  rating?: number;
  reviewCount?: number;
  isWatched?: boolean;
  userRating?: number;
}

interface EpisodeListProps {
  episodes: Episode[];
  currentEpisode?: number;
  onEpisodeSelect: (episodeId: number) => void;
  onRatingSubmit?: (episodeId: number, rating: number, review?: string) => void;
}

export const EpisodeList: FC<EpisodeListProps> = ({
  episodes,
  currentEpisode,
  onEpisodeSelect,
  onRatingSubmit,
}) => {
  const [ratingModalEpisode, setRatingModalEpisode] = useState<Episode | null>(null);

  const sortedByNumber = [...episodes].sort((a, b) => a.number - b.number);
  const sortedByRating = [...episodes].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const handleRatingClick = (e: React.MouseEvent, episode: Episode) => {
    e.stopPropagation();
    setRatingModalEpisode(episode);
  };

  const handleRatingSubmit = (rating: number, review?: string) => {
    if (ratingModalEpisode && onRatingSubmit) {
      onRatingSubmit(ratingModalEpisode.id, rating, review);
    }
  };

  const renderEpisode = (episode: Episode) => (
    <div
      key={episode.id}
      className={`${styles.episode} ${
        currentEpisode === episode.number ? styles.current : ''
      } ${episode.isWatched ? styles.watched : ''}`}
      onClick={() => onEpisodeSelect(episode.id)}
    >
      <div className={styles.episodeNumber}>
        <span className={styles.number}>{episode.number}</span>
        {currentEpisode === episode.number && (
          <Play size={14} className={styles.playIcon} />
        )}
      </div>

      <div className={styles.episodeInfo}>
        <span className={styles.episodeTitle}>{episode.title}</span>
        <div className={styles.episodeMeta}>
          <span className={styles.duration}>{episode.duration}</span>
          {episode.rating && (
            <>
              <span className={styles.separator}>•</span>
              <div className={styles.episodeRating}>
                <Stars rating={episode.rating} size={12} />
                <span className={styles.ratingValue}>{episode.rating.toFixed(1)}</span>
                {episode.reviewCount && (
                  <span className={styles.reviewCount}>({episode.reviewCount})</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <button
        className={styles.rateBtn}
        onClick={(e) => handleRatingClick(e, episode)}
        title="Оценить серию"
      >
        <Star
          size={18}
          fill={episode.userRating ? 'currentColor' : 'none'}
          className={episode.userRating ? styles.rated : ''}
        />
      </button>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Серии</h3>
      </div>

      <Tabs defaultValue="number">
        <TabsList>
          <TabsTrigger value="number">По порядку</TabsTrigger>
          <TabsTrigger value="rating">По рейтингу</TabsTrigger>
        </TabsList>

        <TabsContent value="number">
          <div className={styles.list}>
            {sortedByNumber.map(renderEpisode)}
          </div>
        </TabsContent>

        <TabsContent value="rating">
          <div className={styles.list}>
            {sortedByRating.map(renderEpisode)}
          </div>
        </TabsContent>
      </Tabs>

      {ratingModalEpisode && (
        <EpisodeRatingModal
          episodeNumber={ratingModalEpisode.number}
          episodeTitle={ratingModalEpisode.title}
          currentRating={ratingModalEpisode.userRating}
          onClose={() => setRatingModalEpisode(null)}
          onSubmit={handleRatingSubmit}
        />
      )}
    </div>
  );
};
