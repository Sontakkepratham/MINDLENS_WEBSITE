
import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = '100%', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if observer is supported
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.01, // Very low threshold to ensure it triggers as soon as 1px is visible
        rootMargin: '50px' // Start loading slightly before it enters the viewport
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
      
      // Fallback: If for some reason it's already in view but observer didn't fire
      const rect = currentRef.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight) {
        setIsVisible(true);
      }
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ width, minHeight: '1px' }} // min-height ensures the observer can "see" the container
      className={`transition-all duration-1000 ease-out transform will-change-[opacity,transform] ${
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-12 pointer-events-none'
      }`} 
    >
      <div style={{ transitionDelay: `${delay}ms` }} className="h-full w-full">
        {children}
      </div>
    </div>
  );
};
