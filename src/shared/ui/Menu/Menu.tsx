'use client';

import { FC, ReactNode, MouseEvent } from 'react';
import styles from './Menu.module.scss';

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({ children, onClick }) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  };

  return (
    <button
      className={styles.item}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

interface MenuProps {
  children: ReactNode;
}

export const Menu: FC<MenuProps> = ({ children }) => {
  return (
    <ul className={styles.menu}>
      {children}
    </ul>
  );
};
