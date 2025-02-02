import { useEffect, useRef, RefObject } from 'react';
import Hls from 'hls.js';

interface UseHLSProps {
  videoRef: RefObject<HTMLVideoElement>;
  src: string;
  onError?: (error: any) => void;
  onQualityLevels?: (levels: Array<{ height: number; bitrate: number }>) => void;
}

export const useHLS = ({ videoRef, src, onError, onQualityLevels }: UseHLSProps) => {
  const hlsRef = useRef<Hls | null>(null);
  const currentSrcRef = useRef<string>('');
  const isInitializedRef = useRef(false);
  const onErrorRef = useRef(onError);
  const onQualityLevelsRef = useRef(onQualityLevels);

  // Update refs without triggering effect
  useEffect(() => {
    onErrorRef.current = onError;
    onQualityLevelsRef.current = onQualityLevels;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Если src не изменился И уже инициализирован, не перезагружаем
    if (currentSrcRef.current === src && isInitializedRef.current) {
      return;
    }
    
    // Если src изменился, сбрасываем флаг инициализации
    if (currentSrcRef.current !== src) {
      isInitializedRef.current = false;
    }
    
    currentSrcRef.current = src;

    // Проверяем, является ли это HLS источник
    const isHLS = src.includes('.m3u8');

    if (!isHLS) {
      // Обычное видео - устанавливаем src только если он отличается
      if (video.src !== src && video.currentSrc !== src) {
        video.src = src;
      }
      isInitializedRef.current = true;
      return () => {
        video.src = '';
        currentSrcRef.current = '';
        isInitializedRef.current = false;
      };
    }

    // HLS поддержка с оптимизацией для плохого интернета (2026)
    if (Hls.isSupported()) {
      const hls = new Hls({
        // Буферизация - начинаем с малого буфера для быстрого старта
        maxBufferLength: 20, // Уменьшено для быстрого старта
        maxMaxBufferLength: 40, // Максимальный буфер
        maxBufferSize: 40 * 1000 * 1000, // 40MB
        maxBufferHole: 0.3, // Более агрессивное заполнение дыр
        
        // Adaptive Bitrate - агрессивная адаптация к плохому соединению
        startLevel: -1, // Автовыбор начального качества
        abrEwmaDefaultEstimate: 300000, // Консервативная оценка (300kbps)
        abrBandWidthFactor: 0.8, // Более агрессивное понижение качества
        abrBandWidthUpFactor: 0.6, // Медленное повышение качества
        abrMaxWithRealBitrate: true, // Учитывать реальный битрейт
        
        // Быстрая загрузка и восстановление
        autoStartLoad: true,
        startFragPrefetch: true, // Предзагрузка фрагментов
        testBandwidth: true, // Тестирование пропускной способности
        
        // Таймауты - более терпимые к медленному соединению
        fragLoadingTimeOut: 30000, // 30 секунд на фрагмент
        manifestLoadingTimeOut: 15000, // 15 секунд на манифест
        levelLoadingTimeOut: 15000,
        fragLoadingMaxRetry: 6, // Больше попыток загрузки
        manifestLoadingMaxRetry: 4,
        levelLoadingMaxRetry: 4,
        
        // Low-latency оптимизации
        lowLatencyMode: false, // Отключаем для стабильности
        backBufferLength: 30, // Сохраняем 30 сек назад для перемотки
        
        // Прогрессивная загрузка
        progressive: true,
        enableWorker: true, // Web Worker для производительности
        
        // Дополнительные оптимизации
        liveSyncDurationCount: 2,
        liveMaxLatencyDurationCount: 8,
        maxFragLookUpTolerance: 0.2,
        maxStarvationDelay: 2, // Быстрое переключение при голодании
        maxLoadingDelay: 2,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const levels = data.levels.map((level) => ({
          height: level.height,
          bitrate: level.bitrate,
        }));
        onQualityLevelsRef.current?.(levels);
      });

      // Обработка ошибок с умным восстановлением
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn('Network error, attempting recovery...');
              // Пытаемся перезагрузить с задержкой
              setTimeout(() => {
                if (hlsRef.current) {
                  hls.startLoad();
                }
              }, 1000);
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn('Media error, attempting recovery...');
              hls.recoverMediaError();
              break;
            default:
              console.error('Fatal error:', data);
              onErrorRef.current?.(data);
              hls.destroy();
              break;
          }
        } else {
          // Нефатальные ошибки - просто логируем
          console.warn('Non-fatal HLS error:', data);
        }
      });

      // Мониторинг качества соединения
      hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
        // Логируем скорость загрузки для отладки
        const loadTime = data.stats.loading.end - data.stats.loading.start;
        const bandwidth = (data.stats.loaded * 8) / (loadTime / 1000); // bps
        console.debug(`Fragment loaded: ${(bandwidth / 1000000).toFixed(2)} Mbps`);
      });

      // Отслеживание переключения качества
      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        const level = hls.levels[data.level];
        console.log(`Quality switched to: ${level.height}p (${(level.bitrate / 1000000).toFixed(2)} Mbps)`);
      });

      hlsRef.current = hls;
      isInitializedRef.current = true;

      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
        currentSrcRef.current = '';
        isInitializedRef.current = false;
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      if (video.src !== src && video.currentSrc !== src) {
        video.src = src;
      }
      isInitializedRef.current = true;
      return () => {
        video.src = '';
        currentSrcRef.current = '';
        isInitializedRef.current = false;
      };
    } else {
      onErrorRef.current?.({ message: 'HLS is not supported in this browser' });
    }
  }, [videoRef, src]);

  const setQuality = (levelIndex: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelIndex;
    }
  };

  const getCurrentQuality = () => {
    return hlsRef.current?.currentLevel ?? -1;
  };

  const getAutoQuality = () => {
    return hlsRef.current?.autoLevelEnabled ?? false;
  };

  return {
    setQuality,
    getCurrentQuality,
    getAutoQuality,
    hls: hlsRef.current,
  };
};
