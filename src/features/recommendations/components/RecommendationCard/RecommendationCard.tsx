'use client';

import { FC } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import styles from './RecommendationCard.module.scss';

interface RecommendationCardProps {
  image: StaticImageData | string;
  title: string;
  href: string;
}

export const RecommendationCard: FC<RecommendationCardProps> = ({ image, title, href }) => {
  return (
    <div className={styles.card}>
      <Image src={image} alt={title} className={styles.image} />
      <Link href={href} className={styles.action} aria-label={`Play ${title}`}>
        <Play size={32} />
      </Link>
    </div>
  );
};
