"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export const Header = ({ items }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-black/5 backdrop-blur-sm transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between h-24 px-4 py-3 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center select-none text-2xl">
          <span className="font-bold">Dave</span>
          <span className="font-thin">, Full Stack</span>
        </Link>

        <nav className="flex items-center gap-8 text-xl">
          {items?.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white cursor-pointer transition-colors duration-300 hover:text-primary-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
