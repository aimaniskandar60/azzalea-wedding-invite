"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  animateOnMount?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function RevealOnScroll({
  children,
  className,
  animateOnMount = false,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.15,
}: RevealOnScrollProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(animateOnMount);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (animateOnMount) {
      const animationFrameId = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(animationFrameId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animateOnMount, rootMargin, threshold]);

  return (
    <div ref={elementRef} className={`fade-reveal ${isVisible ? "is-visible" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}