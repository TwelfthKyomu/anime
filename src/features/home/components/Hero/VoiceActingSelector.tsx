'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, Menu, MenuItem } from '@/shared/ui';
import styles from './VoiceActingSelector.module.scss';

interface VoiceOption {
  id: string;
  name: string;
  href: string;
}

interface VoiceActingSelectorProps {
  options: VoiceOption[];
}

export const VoiceActingSelector: FC<VoiceActingSelectorProps> = ({ options }) => {
  const router = useRouter();

  return (
    <Dropdown
      openOnHover
      placement="top-start"
      trigger={
        <div className={styles.trigger}>
          <span className={styles.label}>Озвучка</span>
        </div>
      }
    >
      <Menu>
        {options.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => router.push(option.href)}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};
