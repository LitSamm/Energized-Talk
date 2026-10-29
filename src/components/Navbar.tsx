"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080b09]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="shrink-0 group" aria-label="Anargya ITS EV Team, halaman utama">
            <Image
              src="/images/anargya-logo-inline.webp"
              alt="Anargya ITS EV Team"
              width={164}
              height={21}
              className="h-5 sm:h-8 w-auto transition-opacity group-hover:opacity-80"
            />
          </Link>

          {/* Nav Links - Public Only */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a
              href="#about"
              className="hover:text-[#00ff87] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#00ff87] after:transition-all"
            >
              Tentang
            </a>
            <a
              href="#topics"
              className="hover:text-[#00ff87] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#00ff87] after:transition-all"
            >
              Silabus
            </a>
            <a
              href="#faq"
              className="hover:text-[#00ff87] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#00ff87] after:transition-all"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <a
              href="#register"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#00ff87] hover:bg-emerald-400 text-black font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-[#00ff87]/15 hover:shadow-[#00ff87]/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="sm:hidden">Daftar</span>
              <span className="hidden sm:inline">Daftar Sekarang</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
              aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="md:hidden mt-4 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#0e120f]/95 p-2 shadow-xl backdrop-blur-xl"
          >
            {[
              ["#about", "Tentang"],
              ["#topics", "Silabus"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-[#00ff87]"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
