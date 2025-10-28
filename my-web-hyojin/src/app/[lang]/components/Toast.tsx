'use client';

import { useEffect, useState } from "react";

export default function Toast() {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    setToast(true);
    const timer = setTimeout(() => setToast(false), 2000); // 2초 후 사라짐
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed left-1/2 top-1/3 transform -translate-x-1/2 bg-white/40 backdrop-blur-3xl px-10 py-4 rounded-md text-white z-50
      transition-opacity duration-500 ${toast ? 'opacity-100' : 'opacity-0'}`}>
      <p>Put your Cursor on Stars!</p>
    </div>
  );
}