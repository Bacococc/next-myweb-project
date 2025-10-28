'use client';

import { useEffect, useRef, useState } from 'react';

interface CursorProps {
  color?: string;
}

export default function Cursor({ color = 'rgb(147, 206, 230)' }: CursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [displayColor, setDisplayColor] = useState(color);

  // 부모에서 색상 변경 감지
  useEffect(() => {
    setDisplayColor(color);
  }, [color]);

  // 마우스 이동 추적
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-16 h-16 rounded-full pointer-events-none transition-colors duration-150"
      style={{
        backgroundColor: displayColor,
        transform: 'translate(-50%, -50%)',
        filter: 'blur(20px)',
        zIndex: 1,
        opacity: 0.7,
      }}
    />
  );
}
