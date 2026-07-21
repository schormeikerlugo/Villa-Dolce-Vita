/**
 * TestimonialCarousel — React island. Fading quote carousel with prev/next
 * and autoplay (pauses on hover / when tab hidden / reduced motion).
 * Styling matches the brand guide's quote card.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "../data/testimonials";

interface Props {
  items: Testimonial[];
  interval?: number;
}

export default function TestimonialCarousel({ items, interval = 6500 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    timer.current = window.setTimeout(() => go(1), interval);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, paused, go, interval]);

  const active = items[index];
  if (!active) return null;

  return (
    <div
      className="tc"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <blockquote key={index} className="tc__quote">
        <span className="tc__mark" aria-hidden="true">
          &ldquo;
        </span>
        <p>{active.quote}</p>
        <footer className="tc__author">
          <span>{active.author}</span>
          {active.meta && <span className="tc__meta">{active.meta}</span>}
        </footer>
      </blockquote>

      <div className="tc__controls">
        <div className="tc__dots" role="tablist" aria-label="Testimonials">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              className={`tc__dot ${i === index ? "is-active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <div className="tc__arrows">
          <button aria-label="Previous" onClick={() => go(-1)}>
            ‹
          </button>
          <button aria-label="Next" onClick={() => go(1)}>
            ›
          </button>
        </div>
      </div>

    </div>
  );
}
