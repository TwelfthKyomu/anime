'use client';

import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost';
}

export const IconButton: FC<IconButtonProps> = ({
  children,
  size = 'md',
  variant = 'default',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
