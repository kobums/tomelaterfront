import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  threshold = 0.5,
  rootMargin = '0px',
  delay = 1000,
}: UseIntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Prevent immediate triggering on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!enabled || !isReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const element = targetRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [enabled, isReady, onIntersect, threshold, rootMargin]);

  return targetRef;
};
