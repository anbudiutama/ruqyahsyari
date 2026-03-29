"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-emerald-900/[.97] backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white no-underline"
        >
          <span className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-gold-500 to-gold-300 flex items-center justify-center text-xl text-emerald-900">
            ☪
          </span>
          <span className="font-amiri text-2xl font-bold">
            RuqyahSyari.com
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          <Link
            href="/"
            className="text-white/85 text-sm font-medium hover:text-gold-400 transition-colors no-underline"
          >
            Beranda
          </Link>
          <Link
            href="/#layanan"
            className="text-white/85 text-sm font-medium hover:text-gold-400 transition-colors no-underline"
          >
            Layanan
          </Link>
          <Link
            href="/#tentang"
            className="text-white/85 text-sm font-medium hover:text-gold-400 transition-colors no-underline"
          >
            Tentang
          </Link>
          <Link
            href="/#wilayah"
            className="text-white/85 text-sm font-medium hover:text-gold-400 transition-colors no-underline"
          >
            Wilayah
          </Link>
          <Link
            href="/#faq"
            className="text-white/85 text-sm font-medium hover:text-gold-400 transition-colors no-underline"
          >
            FAQ
          </Link>
          <Link
            href="/formulir"
            className="bg-gradient-to-br from-gold-500 to-gold-400 text-emerald-900 px-6 py-2.5 rounded-lg font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all no-underline"
          >
            Daftar Sekarang
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden bg-transparent border-none text-white text-3xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-emerald-900/95 backdrop-blur-md px-6 pb-6 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-white/85 text-base font-medium no-underline py-2"
          >
            Beranda
          </Link>
          <Link
            href="/#layanan"
            onClick={() => setMenuOpen(false)}
            className="text-white/85 text-base font-medium no-underline py-2"
          >
            Layanan
          </Link>
          <Link
            href="/#tentang"
            onClick={() => setMenuOpen(false)}
            className="text-white/85 text-base font-medium no-underline py-2"
          >
            Tentang
          </Link>
          <Link
            href="/#wilayah"
            onClick={() => setMenuOpen(false)}
            className="text-white/85 text-base font-medium no-underline py-2"
          >
            Wilayah
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMenuOpen(false)}
            className="text-white/85 text-base font-medium no-underline py-2"
          >
            FAQ
          </Link>
          <Link
            href="/formulir"
            onClick={() => setMenuOpen(false)}
            className="bg-gradient-to-br from-gold-500 to-gold-400 text-emerald-900 px-6 py-3 rounded-lg font-bold text-center no-underline"
          >
            Daftar Sekarang
          </Link>
        </div>
      )}
    </nav>
  );
}
