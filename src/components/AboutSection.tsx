"use client";

import React from "react";
import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function AboutSection() {
  const pillars = [
    {
      num: "01",
      title: "Mengembangkan sistem sendiri",
      desc: "Tim merancang BMS, sistem telemetri, dan pengendali motor untuk mobil listrik.",
    },
    {
      num: "02",
      title: "Berlaga di Formula Student",
      desc: "Mobil dirancang mengikuti regulasi kompetisi, termasuk pemeriksaan keselamatan dan uji performa.",
    },
    {
      num: "03",
      title: "Aerodinamika dan material",
      desc: "Simulasi aliran udara dan penggunaan serat karbon membantu tim merancang bodi yang ringan dan stabil.",
    },
    {
      num: "04",
      title: "Belajar bersama industri",
      desc: "Kegiatan ini mempertemukan mahasiswa dengan perkembangan riset otomotif dan kendaraan listrik.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="space-y-2">
            <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00ff87]">
              Tentang Anargya &amp; Energize Talk
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
              Melihat lebih dekat mobil balap listrik Anargya
            </h2>
          </div>
        </RevealOnScroll>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Media with Reveal */}
          <div className="lg:col-span-6 space-y-3">
            <RevealOnScroll direction="right">
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl group">
                <Image
                  src="/images/anargya-racecar.webp"
                  alt="Mobil formula listrik Anargya ITS sedang melaju di lintasan"
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 px-3 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                  <span className="font-medium">Anargya ITS EV Team</span>
                  <span className="font-semibold text-[#00ff87]">Formula Student 2025</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Context with Reveal */}
          <div className="lg:col-span-6 space-y-5">
            <RevealOnScroll direction="left" delay={150}>
              <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
                <strong>Anargya ITS EV Team</strong> adalah tim mahasiswa Institut Teknologi
                Sepuluh Nopember yang merancang dan mengembangkan mobil balap listrik.
              </p>
            </RevealOnScroll>
            <RevealOnScroll direction="left" delay={250}>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Di <strong>Energize Talk</strong>, tim berbagi pengalaman merancang mobil,
                menguji sistemnya, dan mempersiapkan diri untuk kompetisi Formula Student.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* 4 Pillars Grid with Soft Rounded Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/5">
          {pillars.map((item, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100} direction="up">
              <div className="space-y-3 p-6 rounded-3xl bg-zinc-900/40 border border-white/10 interactive-card h-full shadow-lg">
                <span className="w-8 h-8 rounded-full bg-[#00ff87]/15 border border-[#00ff87]/30 text-[#00ff87] flex items-center justify-center text-xs font-bold font-heading">
                  {item.num}
                </span>
                <h3 className="font-bold text-white text-base">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
