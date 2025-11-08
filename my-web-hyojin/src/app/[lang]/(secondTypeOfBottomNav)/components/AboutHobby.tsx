'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutHobby() {
  const imagesTravel = [
    { src: "/images/Travel9.png", position: "top-28 right-1/7 -translate-x-1/2 rotate-[-5deg]" },
    { src: "/images/Travel12.png", position: "top-24 left-1 -translate-x-1/2 rotate-[-5deg]" },
    { src: "/images/Travel4.jpg", position: "top-46 left-1/20 rotate-[-3deg]" },
    { src: "/images/Travel5.jpg", position: "top-50 right-1 rotate-10" },
    { src: "/images/Travel6.jpg", position: "top-30 left-1/6 rotate-6" },
    { src: "/images/Travel1.jpg", position: "top-28 right-1/9 rotate-2" },
    { src: "/images/Travel2.png", position: "top-10 left-1/10 -translate-x-1/2 rotate-[-5deg]" },
    { src: "/images/Travel11.png", position: "top-84 right-1/5 -translate-x-1/2 rotate-4" },
    { src: "/images/Travel16.png", position: "top-15 left-1/4 -translate-x-1/2 rotate-[-5deg]" },
    { src: "/images/Travel13.png", position: "top-56 left-1/3 -translate-x-1/2 rotate-[-5deg]" },
    { src: "/images/Travel15.png", position: "top-80 right-1/12 -translate-x-1/2 rotate-[-10deg]" },
    { src: "/images/Travel14.png", position: "top-10 right-1 -translate-x-1/2 rotate-[-5deg]" },
  ];

  const imagesBaking = [
    { src: "/images/Baking13.png", position: "top-10 left-1/10 rotate-[-4deg]" },
    { src: "/images/Baking7.png", position: "top-44 left-1/2 rotate-[-4deg]" },
    { src: "/images/Baking.png", position: "top-20 left-1/6 rotate-3" },
    { src: "/images/Baking14.png", position: "top-44 right-1/4 rotate-[-4deg]" },
    { src: "/images/Baking2.png", position: "top-28 left-1/10 -translate-x-1/2 rotate-[-5deg]" },
    { src: "/images/Baking3.png", position: "top-32 right-1/5 rotate-6" },
    { src: "/images/Baking4.png", position: "top-60 left-1/4 rotate-[-3deg]" },
    { src: "/images/Baking5.png", position: "top-60 right-1/12 rotate-2" },
    { src: "/images/Baking8.png", position: "top-28 right-1/12 rotate-[-4deg]" },
    { src: "/images/Baking6.png", position: "top-0 right-1/7 rotate-[-4deg]" },
    { src: "/images/Baking12.png", position: "top-50 left-1/9 rotate-[-4deg]" },
  ];

  const travelRef = useRef<HTMLDivElement>(null);
  const bakingRef = useRef<HTMLDivElement>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    const travelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            imagesTravel.forEach((_, idx) => {
              setTimeout(() => {
                setVisibleIndexes((prev) => [...prev, idx]);
              }, idx * 100);
            });
            travelObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const bakingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            imagesBaking.forEach((_, idx) => {
              setTimeout(() => {
                setVisibleIndexes((prev) => [...prev, idx + imagesTravel.length]);
              }, idx * 100);
            });
            bakingObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (travelRef.current) travelObserver.observe(travelRef.current);
    if (bakingRef.current) bakingObserver.observe(bakingRef.current);
  }, []);

  return (
    <div className="w-full text-center mt-20">
      {/* Travel Section */}
      <div ref={travelRef} className="relative w-full min-h-[400px] mb-20">
        <p className="w-full text-white text-9xl font-extrabold mt-10 absolute top-16 left-1/2 -translate-x-1/2 z-20">
          Travel!
        </p>

        {imagesTravel.map((img, idx) => (
          <Image
            key={idx}
            src={img.src}
            alt={`Travel ${idx}`}
            width={160}
            height={160}
            className={`absolute z-10 transition-all duration-700 ease-out
              ${img.position} 
              ${visibleIndexes.includes(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          />
        ))}
      </div>

      {/* Baking Section */}
      <div ref={bakingRef} className="relative w-full min-h-[400px] mt-70">
        <p className="w-full text-white text-9xl font-extrabold absolute top-16 left-1/2 -translate-x-1/2 z-20">
          Baking!
        </p>

        {imagesBaking.map((img, idx) => (
          <Image
            key={idx}
            src={img.src}
            alt={`Baking ${idx}`}
            width={160}
            height={160}
            className={`absolute z-10 transition-all duration-700 ease-out
              ${img.position} 
              ${visibleIndexes.includes(idx + imagesTravel.length) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          />
        ))}
      </div>
    </div>
  );
}