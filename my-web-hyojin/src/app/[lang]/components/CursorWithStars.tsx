// src/components/CursorWithStars.tsx
'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Cursor from './Cursor';
import Stars from './Stars';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const DEFAULT_COLOR = 'rgb(147, 206, 230)';

export default function CursorWithStars() {
  const [cursorColor, setCursorColor] = useState(DEFAULT_COLOR);

  // 초기 로드: 쿠키에서 색상 가져오기
  useEffect(() => {
    const savedColor = Cookies.get('cursorColor');
    if (savedColor) {
      setCursorColor(savedColor);
    }
  }, []);

  const handleMouseMove = (x: number, y: number, stars: Star[]) => {
    // 별과의 거리 계산
    let hoveredStar: Star | null = null;
    let closestDistance = 40;

    stars.forEach((star) => {
      const distance = Math.hypot(x - star.x, y - star.y);
      if (distance < closestDistance) {
        closestDistance = distance;
        hoveredStar = star;
      }
    });

    // 호버된 별이 있으면만 색상 변경
    if (hoveredStar) {
      setCursorColor(hoveredStar.color);
      Cookies.set('cursorColor', hoveredStar.color, { expires: 365 });
    }
    // 별이 없으면 현재 색상 유지
  };

  return (
    <>
      <Cursor color={cursorColor} />
      <Stars onMouseMove={handleMouseMove} />
    </>
  );
}
