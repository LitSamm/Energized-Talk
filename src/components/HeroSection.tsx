"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [eventPassed, setEventPassed] = useState(false);

  useEffect(() => {
    // Target event date: June 14, 2026 09:00:00 WIB
    const targetDate = new Date("2026-06-14T09:00:00+07:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setEventPassed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const eventSpecs = [
    { label: "Tanggal", value: "Minggu, 14 Juni 2026" },
    { label: "Pukul", value: "09:00 — 12:30 WIB" },
    { label: "Tempat", value: "Online via Zoom" },
    { label: "Biaya", value: "Gratis, dengan e-sertifikat" },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-white/5 telemetry-line">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-[#00ff87]/6 blur-[130px] pointer-events-none rounded-full animate-pulse-subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Headline with Reveal */}
            <RevealOnScroll delay={100} direction="up">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-heading">
                  Energize Talk <span className="text-[#00ff87]">2026</span>
                </h1>
                <p className="text-xl sm:text-2xl text-zinc-200 font-semibold leading-snug">
                  Kenali teknologi di balik mobil balap listrik Anargya
                </p>
              </div>
            </RevealOnScroll>

            {/* Description */}
            <RevealOnScroll delay={200} direction="up">
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
                Dengarkan cerita tim Anargya ITS tentang proses merancang mobil balap listrik:
                dari baterai dan sistem kendali hingga persiapan mengikuti Formula Student Japan.
              </p>
            </RevealOnScroll>

            {/* Event Specs Grid - Soft Rounded Interactive Cards */}
            <RevealOnScroll delay={300} direction="up">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md shadow-lg">
                {eventSpecs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#00ff87]/30 transition-all duration-300 text-center sm:text-left cursor-default group"
                  >
                    <div className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      {spec.label}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5 group-hover:text-[#00ff87] transition-colors">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Countdown - Rounded Tactile Tiles */}
            <RevealOnScroll delay={400} direction="up">
              <div className="space-y-2.5 pt-1">
                <div className="text-xs font-medium text-zinc-400 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full bg-[#00ff87] ${eventPassed ? "" : "animate-ping"}`} />
                  <span>{eventPassed ? "Acara telah berlangsung" : "Menuju hari acara"}</span>
                </div>
                <div className="flex items-center gap-3">
                  {[
                    { val: timeLeft.days, label: "Hari" },
                    { val: timeLeft.hours, label: "Jam" },
                    { val: timeLeft.minutes, label: "Menit" },
                    { val: timeLeft.seconds, label: "Detik" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex-1 max-w-[90px] py-3 px-2 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/60 border border-white/10 hover:border-[#00ff87]/40 text-center transition-all duration-300 shadow-md hover:shadow-[#00ff87]/15 hover:-translate-y-1 cursor-default group"
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#00ff87] font-heading tabular-nums transition-colors">
                        {String(item.val).padStart(2, "0")}
                      </div>
                      <div className="text-[11px] font-medium text-zinc-400 mt-0.5">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* CTA Buttons */}
            <RevealOnScroll delay={500} direction="up">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href="#register"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#00ff87] text-black font-bold text-sm btn-interactive shadow-lg shadow-[#00ff87]/25"
                >
                  <span>Daftar gratis</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
                <a
                  href="#topics"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/15 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.06] text-zinc-200 hover:text-white font-semibold text-sm btn-interactive"
                >
                  <span>Lihat topik acara</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Floating Poster Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <RevealOnScroll delay={350} direction="left">
              <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-white/15 bg-zinc-900/60 shadow-2xl animate-float-slow hover:border-[#00ff87]/50 transition-all duration-500 group">
                <div className="relative aspect-[4/5] w-full bg-zinc-950 overflow-hidden">
                  <Image
                    src="/images/energize-talk-poster.webp"
                    alt="Poster Resmi Energize Talk 2026"
                    fill
                    sizes="(max-width: 1023px) 80vw, 384px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col items-start gap-3 border-t border-white/10 bg-zinc-900/90 p-5 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="font-semibold text-zinc-200">Energize Talk 2026</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#00ff87]/25 bg-[#00ff87]/10 px-3.5 py-2 font-semibold text-[#00ff87]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00ff87]" />
                    Poster acara
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
