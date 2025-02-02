'use client';

import { FC, ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import styles from './Modal.module.scss';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = 'md',
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={`${styles.content} ${styles[size]}`}>
          {(title || description) && (
            <div className={styles.header}>
              <div>
                {title && (
                  <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className={styles.description}>
                    {description}
                  </Dialog.Description>
                )}
              </div>
              <Dialog.Close className={styles.closeBtn} aria-label="Close">
                <X size={24} />
              </Dialog.Close>
            </div>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface ModalBodyProps {
  children: ReactNode;
}

export const ModalBody: FC<ModalBodyProps> = ({ children }) => {
  return <div className={styles.body}>{children}</div>;
};

interface ModalFooterProps {
  children: ReactNode;
}

export const ModalFooter: FC<ModalFooterProps> = ({ children }) => {
  return <div className={styles.footer}>{children}</div>;
};
