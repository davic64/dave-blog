"use client";

import { Button } from "@/ui";
import React, { useEffect, useState } from "react";

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
      <img
        className="absolute w-full h-full object-cover top-0 left-0"
        src={src}
        alt={title}
      />
      <div className="w-full h-full flex flex-col gap-6 items-center justify-center text-center relative z-10 bg-black/40">
        <div
          style={{
            opacity: opacity,
            transform: `translateY(${translateY}px)`,
          }}
          className="flex flex-col gap-6 items-center"
        >
          <p className="text-lg">{date}</p>
          <h1 className="font-bold text-7xl w-[80rem]">{title}</h1>
          <div className="font-bold text-xl flex items-center justify-center gap-4">
            {tags?.map((tag) => (
              <Button key={tag} className="px-4 py-0.5">
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
