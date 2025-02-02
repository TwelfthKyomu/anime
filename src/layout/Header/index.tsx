'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Search, Bell, User } from 'lucide-react';
import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Anime</span>
        </Link>

        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Search">
            <Search size={20} />
          </button>

          <button className={styles.iconButton} aria-label="Notifications">
            <Bell size={20} />
          </button>

          <button className={styles.avatar} aria-label="Profile">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
