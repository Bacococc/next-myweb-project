'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface StarsProps {
  onMouseMove?: (x: number, y: number, stars: Star[]) => void;
}

const STAR_COLORS = [
  'rgb(200, 245, 166)',
  'rgb(195, 165, 255)',
  'rgb(255, 235, 123)',
  'rgb(161, 219, 255)',
  'rgb(255, 158, 206)',
];

const MARGIN = {
  left: 60,
  right: 60,
  top: 100,
  bottom: 0,
};

export default function Stars({ onMouseMove }: StarsProps) {
  const [stars, setStars] = useState<Star[]>([]);

  // 별 생성
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const maxX = window.innerWidth - MARGIN.right;
      const maxY = window.innerHeight * 0.5 - MARGIN.bottom;
      const minX = MARGIN.left;
      const minY = MARGIN.top;

      for (let i = 0; i < 14; i++) {
        newStars.push({
          id: i,
          x: Math.random() * (maxX - minX) + minX,
          y: Math.random() * (maxY - minY) + minY,
          size: Math.random() * 10 + 6,
          color: STAR_COLORS[i % STAR_COLORS.length],
        });
      }
      return newStars;
    };

    const newStars = generateStars();
    setStars(newStars);

    const handleResize = () => setStars(generateStars());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 마우스 이동 감지
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      onMouseMove?.(e.clientX, e.clientY, stars);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [stars, onMouseMove]);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="fixed pointer-events-none min-h-screen z-1"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            fontSize: `${star.size}px`,
            color: star.color,
            zIndex: 1,
          }}
        >
          ★
        </div>
      ))}
    </>
  );
}
