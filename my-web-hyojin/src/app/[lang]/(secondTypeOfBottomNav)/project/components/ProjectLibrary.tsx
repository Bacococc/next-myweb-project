'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  src: string;
  alt: string;
  link: string;
}

export default function ProjectLibrary() {
  const slides: Slide[] = [
    { id: 1, src: "/images/project1.jpg", alt: "프로젝트 1", link: "/project/1" },
    { id: 2, src: "/images/project2.jpg", alt: "프로젝트 2", link: "/project/2" },
    { id: 3, src: "/images/project3.jpg", alt: "프로젝트 3", link: "/project/3" },
    { id: 3, src: "/images/project3.jpg", alt: "프로젝트 3", link: "/project/3" },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      <div className="relative w-full max-w-3xl h-[520px] flex items-center justify-center overflow-hidden">
        <button
          onClick={prevSlide}
          className="absolute left-2 z-10 p-2 shadow-md rounded-full hover:bg-white/20 transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="w-full h-full flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${current * 100}%)` }}>
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 flex items-center justify-center">
              <Link href={slide.link}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={500}
                  height={300}
                  className="rounded-sm shadow-lg object-cover"
                />
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-2 z-10 p-2 rounded-full shadow-md hover:bg-white/20 transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-1 h-1 rounded-full cursor-pointer transition-all ${
              index === current ? "bg-gray-300 scale-110" : "bg-gray-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}