# Anime Streaming Platform

Современная платформа для просмотра аниме с адаптивным видеоплеером и оптимизацией для плохого интернета.

## Возможности

- 🎬 Продвинутый видеоплеер с HLS поддержкой
- 📱 Адаптивный дизайн (mobile-first)
- 🌐 Оптимизация для медленного интернета (2G/3G/4G)
- ⭐ Система рейтингов серий
- 💬 Комментарии и ревью
- 🎨 Современный UI с SCSS модулями
- ♿ Accessibility (Radix UI)

## Технологии

- **Next.js 15** - React фреймворк
- **TypeScript** - типизация
- **SCSS Modules** - стилизация
- **HLS.js** - адаптивный стриминг
- **Radix UI** - доступные компоненты
- **Floating UI** - позиционирование
- **Lucide React** - иконки

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен сервера
npm start
```

Откройте [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── anime/[id]/        # Страница аниме
│   └── page.tsx           # Главная страница
├── features/              # Feature-based модули
│   ├── player/           # Видеоплеер
│   ├── content/          # Контент (серии, рейтинги)
│   ├── home/             # Главная страница
│   └── recommendations/  # Рекомендации
├── shared/               # Переиспользуемые компоненты
│   ├── ui/              # UI компоненты
│   ├── hooks/           # Кастомные хуки
│   └── lib/             # Утилиты
├── layout/              # Лэйауты
│   ├── Header/
│   ├── Footer/
│   └── Main/
└── styles/              # Глобальные стили
    └── abstracts/       # SCSS переменные и миксины
```

## Документация

- [API Integration](./docs/API_INTEGRATION.md) - интеграция с API
- [Video Optimization](./docs/VIDEO_OPTIMIZATION.md) - оптимизация видео
- [Quick Start Video](./docs/QUICK_START_VIDEO.md) - быстрый старт с видео
- [Improvements 2026](./docs/IMPROVEMENTS_2026.md) - последние улучшения

## Видеоплеер

### Возможности плеера:

- HLS адаптивный стриминг (240p - 1080p)
- Автоматическое переключение качества
- Network Information API
- Keyboard shortcuts (Space, F, M, ←, →)
- Fullscreen режим
- Picture-in-Picture
- Регулировка скорости воспроизведения
- Выбор озвучки

### Оптимизации для плохого интернета:

- Быстрый старт с низким качеством
- Агрессивная адаптация при проблемах
- До 6 попыток загрузки при сбоях
- Умная буферизация (20-40 сек)
- Определение типа соединения (2G/3G/4G/5G)

### Использование:

```tsx
import { Player } from '@/features/player';

<Player
  sources={[{ src: '/videos/master.m3u8', type: 'application/x-mpegURL' }]}
  poster="/images/poster.jpg"
  config={{ autoplay: false, volume: 0.8 }}
/>
```

## Конвертация видео в HLS

```bash
# Быстрая конвертация (5 качеств для всех типов интернета)
ffmpeg -i input.mp4 \
  -filter_complex "[0:v]split=5[v1][v2][v3][v4][v5]; ..." \
  -map "[v240p]" -c:v:0 libx264 -b:v:0 400k \
  -map "[v360p]" -c:v:1 libx264 -b:v:1 700k \
  -map "[v480p]" -c:v:2 libx264 -b:v:2 1200k \
  -map "[v720p]" -c:v:3 libx264 -b:v:3 2500k \
  -map "[v1080p]" -c:v:4 libx264 -b:v:4 4500k \
  -f hls output/master.m3u8
```

Подробнее: [docs/QUICK_START_VIDEO.md](./docs/QUICK_START_VIDEO.md)

## Интеграция с API

Все mock данные удалены. Компоненты готовы к интеграции:

```tsx
// Главная страница
export default async function Home() {
  const animes = await fetch('https://api.example.com/anime/latest').then(r => r.json());
  const heroData = await fetch('https://api.example.com/anime/featured').then(r => r.json());

  return <Main animes={animes} heroData={heroData} />;
}

// Страница аниме
export default async function AnimePage({ params }: { params: { id: string } }) {
  const animeData = await fetch(`https://api.example.com/anime/${params.id}`).then(r => r.json());
  const episodes = await fetch(`https://api.example.com/anime/${params.id}/episodes`).then(r => r.json());

  return <AnimePage animeData={animeData} episodes={episodes} />;
}
```

Подробнее: [docs/API_INTEGRATION.md](./docs/API_INTEGRATION.md)

## Стилизация

Проект использует SCSS модули с глобальными переменными:

- Все размеры в rem/em (адаптивность)
- Spacing scale (0.25rem - 20rem)
- Breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- Автоматический импорт переменных через next.config.ts

```scss
// Автоматически доступно в любом .module.scss
.button {
  padding: $spacing-4 $spacing-6;
  background: $primary-color;
  
  @include max-md {
    padding: $spacing-3 $spacing-4;
  }
}
```

## Компоненты

### UI компоненты (src/shared/ui):

- Button - кнопки с вариантами
- Badge - бейджи для жанров/тегов
- Container - контейнер с max-width
- Modal - модальные окна (Radix UI)
- Tabs - табы (Radix UI)
- Dropdown - выпадающие меню (Floating UI)

### Feature компоненты:

- Player - видеоплеер
- EpisodeList - список серий с рейтингами
- AnimeCard - карточка аниме
- Hero - главный баннер с видео превью

## Тестирование

```bash
# Эмуляция медленного интернета
# Chrome DevTools → Network → Throttling → "Slow 3G"

# Проверка адаптивности
# Chrome DevTools → Device Toolbar → iPhone/iPad
```

## Производительность

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

## Браузеры

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS/Android)

## Лицензия

MIT

## Контакты

- GitHub: [your-repo](https://github.com/your-repo)
- Email: your-email@example.com

