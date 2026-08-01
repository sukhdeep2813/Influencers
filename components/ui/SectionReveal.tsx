"use client";

import { useEffect, useRef, useState } from "react";

interface SectionRevealProps {
  className?: string;
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export default function SectionReveal({
  className = "",
  children,
  threshold = 0.12,
  rootMargin = "0px 0px -10% 0px",
}: SectionRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <section
      ref={ref}
      className={`${className} transform transition duration-500 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </section>
  );
}
