"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "../atoms/Logo";
import { IconMenu2, IconX } from "@tabler/icons-react";
export const Header = ({ items }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

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
      <div className="flex items-center justify-between h-16 md:h-24 px-4 py-3 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center select-none text-xl md:text-2xl z-50"
        >
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-lg lg:text-xl">
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
        <button
          className={`md:hidden text-white ${isMenuOpen ? "hidden" : "block"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IconMenu2 />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm h-screen w-full"
          onClick={() => setIsMenuOpen(false)}
        />
        <div className="relative h-screen w-full bg-black/5 backdrop-blur-sm">
          <button
            className="absolute top-3 right-2 text-white p-2 z-50"
            onClick={() => setIsMenuOpen(false)}
          >
            <IconX />
          </button>
          <nav className="flex flex-col items-center pt-20">
            {items?.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white py-4 px-6 w-full text-center text-xl hover:bg-white/10 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
