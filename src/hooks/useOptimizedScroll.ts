import { useState, useEffect, useCallback } from 'react';

interface ScrollVisibility {
  [key: string]: boolean;
}

interface UseOptimizedScrollProps {
  elements: string[]; // IDs de los elementos a observar
  threshold?: number; // Umbral para la detección de visibilidad
  throttle?: number; // Tiempo de throttle en ms
}

export const useOptimizedScroll = ({
  elements,
  threshold = 200,
  throttle = 100
}: UseOptimizedScrollProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<ScrollVisibility>(() => {
    const initial: ScrollVisibility = {};
    elements.forEach(el => {
      initial[el] = false;
    });
    return initial;
  });

  const updateVisibility = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    const newVisibility: ScrollVisibility = {};
    let hasChanges = false;

    elements.forEach(elementId => {
      const element = document.getElementById(elementId);
      const isElementVisible = element 
        ? currentScrollY > element.offsetTop - window.innerHeight + threshold 
        : false;
      
      newVisibility[elementId] = isElementVisible;
      
      if (isVisible[elementId] !== isElementVisible) {
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setIsVisible(newVisibility);
    }
  }, [elements, threshold, isVisible]);

  useEffect(() => {
    let ticking = false;
    let lastScrollTime = 0;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const now = Date.now();
          if (now - lastScrollTime >= throttle) {
            lastScrollTime = now;
            updateVisibility();
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Agregar event listener con passive: true para mejor rendimiento
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Inicializar después de que el DOM esté listo
    const timer = setTimeout(() => {
      updateVisibility();
    }, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [updateVisibility, throttle]);

  return { scrollY, isVisible };
};