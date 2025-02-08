"use client";
import { Button } from "@/ui";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const PostHead = ({ title, date, tags, src }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const opacity = Math.min(1, 0.6 + scrollPosition / 300);
  const translateY = Math.max(0, 50 - scrollPosition * 0.2);

  return (
    <div className="relative h-screen w-full">
      <Image
        className="absolute w-full h-full object-cover top-0 left-0"
        src={src}
        alt={title}
        fill
        priority
        quality={80}
      />
      <div className="w-full h-full flex flex-col gap-4 sm:gap-6 items-center justify-center text-center relative z-10 bg-black/40 px-4">
        <div
          style={{
            opacity: opacity,
            transform: `translateY(${translateY}px)`,
          }}
          className="flex flex-col gap-4 sm:gap-6 items-center w-full max-w-4xl"
        >
          <p className="text-base sm:text-lg">{date}</p>
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl w-full">
            {title}
          </h1>
          <div className="font-bold text-lg sm:text-xl flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {tags?.map((tag) => (
              <Button
                key={tag}
                className="px-3 sm:px-4 py-0.5 text-sm sm:text-base"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
