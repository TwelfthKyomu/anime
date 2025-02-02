'use client';

import { FC, useState } from 'react';
import { Star } from 'lucide-react';
import { Button, Modal, ModalBody, ModalFooter } from '@/shared/ui';
import styles from './EpisodeRatingModal.module.scss';

interface EpisodeRatingModalProps {
  episodeNumber: number;
  episodeTitle: string;
  currentRating?: number;
  onClose: () => void;
  onSubmit: (rating: number, review?: string) => void;
}

export const EpisodeRatingModal: FC<EpisodeRatingModalProps> = ({
  episodeNumber,
  episodeTitle,
  currentRating,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(currentRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, review || undefined);
      onClose();
    }
  };

  return (
    <Modal
      open={true}
      onOpenChange={onClose}
      title={`Оценить серию ${episodeNumber}`}
      description={episodeTitle}
      size="md"
    >
      <ModalBody>
        <div className={styles.ratingSection}>
          <p className={styles.label}>Ваша оценка</p>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <button
                key={star}
                className={styles.starBtn}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={32}
                  fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'}
                  className={star <= (hoverRating || rating) ? styles.starActive : styles.star}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className={styles.ratingValue}>{rating} / 10</p>
          )}
        </div>

        <div className={styles.reviewSection}>
          <label htmlFor="review" className={styles.label}>
            Ваш отзыв (необязательно)
          </label>
          <textarea
            id="review"
            className={styles.textarea}
            placeholder="Поделитесь своими впечатлениями о серии..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            maxLength={500}
          />
          <p className={styles.charCount}>{review.length} / 500</p>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={rating === 0}>
          Отправить
        </Button>
      </ModalFooter>
    </Modal>
  );
};
