'use client';

import Link from 'next/link';
import { Container } from '@/shared/ui';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>О проекте</h3>
            <p className={styles.description}>
              Смотрите аниме онлайн в высоком качестве с различными озвучками
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Навигация</h3>
            <nav className={styles.nav}>
              <Link href="/" className={styles.link}>Главная</Link>
              <Link href="/catalog" className={styles.link}>Каталог</Link>
              <Link href="/schedule" className={styles.link}>Расписание</Link>
            </nav>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Информация</h3>
            <nav className={styles.nav}>
              <Link href="/about" className={styles.link}>О нас</Link>
              <Link href="/contacts" className={styles.link}>Контакты</Link>
              <Link href="/privacy" className={styles.link}>Политика конфиденциальности</Link>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Anime. Все права защищены
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;