'use client';
import { useEffect, useRef, useState } from "react";

interface Testimony {
  quote: string;
  author: string;
}

interface InfiniteMovingCardsProps {
  items: Testimony[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (scrollerRef.current) {
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        '--animation-direction',
        direction === 'left' ? 'normal' : 'reverse'
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      let duration = '30s'; // default to normal speed
      if (speed === 'fast') duration = '15s';
      else if (speed === 'slow') duration = '45s';

      containerRef.current.style.setProperty('--animation-duration', duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className="scroller relative z-20 max-w-7xl overflow-hidden mx-auto [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap ${start ? "animate-scroll" : ""}`}
        style={{
          "--pause-on-hover": pauseOnHover ? "paused" : "running",
        } as React.CSSProperties}
      >
        {/* Render the list of items twice for infinite scroll effect */}
        {[...items, ...items].map((item, idx) => (
          <li
            key={idx}
            className="w-[250px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-gray-400 px-8 py-6 bg-[#F1F5F9] flex flex-col items-center gap-2"
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%+_4px)] w-[calc(100%+_4px)]"
              ></div>
              <span className="relative z-20 text-lg leading-[1.6] font-medium">
                {item.quote}
              </span>
            </blockquote>
            <footer className="text-sm text-gray-600 mt-2">
              — {item.author} -
            </footer>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite;
          animation-direction: var(--animation-direction);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2)); /* Move by half, since we duplicated */
          }
        }
      `}</style>
    </div>
  );
};
