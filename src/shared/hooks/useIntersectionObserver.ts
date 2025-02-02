import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  options?: UseIntersectionObserverOptions
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const { freezeOnceVisible = false, ...observerOptions } = options || {};

  useEffect(() => {
    const node = elementRef?.current;
    const frozen = entry?.isIntersecting && freezeOnceVisible;

    if (!node || frozen) return;

    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      observerOptions
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, entry?.isIntersecting, freezeOnceVisible, observerOptions]);

  return entry;
};
