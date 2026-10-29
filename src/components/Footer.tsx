"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-[#050706] text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/images/anargya-logo-inline.webp"
                alt="Anargya ITS EV Team"
                width={164}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-sm text-sm">
              Tim mahasiswa ITS yang merancang dan mengembangkan mobil balap listrik untuk
              mengikuti kompetisi Formula Student.
            </p>
            <div className="text-xs text-zinc-400 pt-1">
              Gedung Robotika ITS, Kampus ITS Sukolilo, Surabaya 60111
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-bold uppercase tracking-wider text-white text-xs">
              Jelajahi
            </div>
            <ul className="space-y-2 text-zinc-300 text-sm">
              <li>
                <a href="#about" className="hover:text-[#00ff87] transition-colors">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#topics" className="hover:text-[#00ff87] transition-colors">
                  Topik acara
                </a>
              </li>
              <li>
                <a href="#register" className="hover:text-[#00ff87] transition-colors">
                  Pendaftaran
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#00ff87] transition-colors">
                  Pertanyaan umum
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Institutional Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-bold uppercase tracking-wider text-white text-xs">
              Ikuti Anargya
            </div>
            <ul className="space-y-2 text-zinc-300 text-sm">
              <li>
                <a
                  href="https://instagram.com/anargya.its"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00ff87] transition-colors"
                >
                  Instagram: @anargya.its
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/anargya-its"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00ff87] transition-colors"
                >
                  LinkedIn: Anargya ITS EV Team
                </a>
              </li>
              <li>
                <a
                  href="https://www.anargyaits.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00ff87] transition-colors"
                >
                  Website: www.anargyaits.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <div>
            © 2026 Anargya ITS EV Team. Institut Teknologi Sepuluh Nopember Surabaya.
          </div>
          <div>
            Situs pendaftaran Energize Talk 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
