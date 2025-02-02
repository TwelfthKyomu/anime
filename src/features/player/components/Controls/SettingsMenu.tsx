'use client';

import { FC, useState } from 'react';
import { Settings, ChevronRight } from 'lucide-react';
import { Dropdown, Menu, MenuItem } from '@/shared/ui';
import styles from './SettingsMenu.module.scss';

interface SettingsMenuProps {
  currentQuality: string;
  qualities: string[];
  onQualityChange: (quality: string) => void;
  voiceOptions?: { id: string; name: string }[];
  currentVoice?: string;
  onVoiceChange?: (voiceId: string) => void;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({
  currentQuality,
  qualities,
  onQualityChange,
  voiceOptions = [],
  currentVoice,
  onVoiceChange,
}) => {
  const [activeMenu, setActiveMenu] = useState<'main' | 'quality' | 'voice'>('main');

  const renderMainMenu = () => (
    <Menu>
      <MenuItem onClick={() => setActiveMenu('quality')}>
        <div className={styles.menuItem}>
          <span>Качество</span>
          <div className={styles.menuItemRight}>
            <span className={styles.currentValue}>
              {currentQuality === 'auto' ? 'Auto' : currentQuality}
            </span>
            <ChevronRight size={16} />
          </div>
        </div>
      </MenuItem>
      {voiceOptions.length > 0 && (
        <MenuItem onClick={() => setActiveMenu('voice')}>
          <div className={styles.menuItem}>
            <span>Озвучка</span>
            <div className={styles.menuItemRight}>
              <span className={styles.currentValue}>
                {voiceOptions.find(v => v.id === currentVoice)?.name || 'Выбрать'}
              </span>
              <ChevronRight size={16} />
            </div>
          </div>
        </MenuItem>
      )}
    </Menu>
  );

  const renderQualityMenu = () => (
    <Menu>
      <MenuItem onClick={() => setActiveMenu('main')}>
        <div className={styles.backButton}>
          <ChevronRight size={16} className={styles.backIcon} />
          <span>Назад</span>
        </div>
      </MenuItem>
      {qualities.map((quality) => (
        <MenuItem
          key={quality}
          onClick={() => {
            onQualityChange(quality);
            setActiveMenu('main');
          }}
        >
          <div className={`${styles.option} ${quality === currentQuality ? styles.active : ''}`}>
            {quality === 'auto' ? 'Auto' : quality}
          </div>
        </MenuItem>
      ))}
    </Menu>
  );

  const renderVoiceMenu = () => (
    <Menu>
      <MenuItem onClick={() => setActiveMenu('main')}>
        <div className={styles.backButton}>
          <ChevronRight size={16} className={styles.backIcon} />
          <span>Назад</span>
        </div>
      </MenuItem>
      {voiceOptions.map((voice) => (
        <MenuItem
          key={voice.id}
          onClick={() => {
            onVoiceChange?.(voice.id);
            setActiveMenu('main');
          }}
        >
          <div className={`${styles.option} ${voice.id === currentVoice ? styles.active : ''}`}>
            {voice.name}
          </div>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      placement="top-end"
      trigger={
        <button className={styles.trigger} aria-label="Settings">
          <Settings size={20} />
        </button>
      }
    >
      <div className={styles.settingsMenu}>
        {activeMenu === 'main' && renderMainMenu()}
        {activeMenu === 'quality' && renderQualityMenu()}
        {activeMenu === 'voice' && renderVoiceMenu()}
      </div>
    </Dropdown>
  );
};
