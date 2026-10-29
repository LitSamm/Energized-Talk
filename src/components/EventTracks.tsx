"use client";

import React from "react";
import { ArrowDown } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function EventTracks() {
  const tracks = [
    {
      num: "01",
      tag: "Sistem kelistrikan",
      title: "Baterai dan sistem manajemen baterai",
      description:
        "Mengenal susunan baterai lithium-ion, pengaturan suhu, dan cara kerja Battery Management System (BMS) untuk menjaga baterai tetap aman.",
    },
    {
      num: "02",
      tag: "Desain dan material",
      title: "Aerodinamika & Bodi Serat Karbon",
      description:
        "Melihat bagaimana simulasi aliran udara membantu merancang sayap dan bodi serat karbon yang ringan serta stabil.",
    },
    {
      num: "03",
      tag: "Elektronika dan kendali",
      title: "Motor listrik, inverter, dan telemetri",
      description:
        "Membahas pengendalian motor dan inverter, serta cara data dari mobil dikirim ke tim saat pengujian.",
    },
    {
      num: "04",
      tag: "Kompetisi dan karier",
      title: "Persiapan Formula Student dan karier di bidang EV",
      description:
        "Tim berbagi pengalaman mengikuti Formula Student Japan, menyusun desain teknis, dan bekerja dalam tim balap mahasiswa.",
    },
  ];

  const perks = [
    {
      title: "E-Sertifikat Resmi",
      desc: "Peserta yang memenuhi ketentuan kehadiran akan menerima e-sertifikat.",
    },
    {
      title: "Materi acara",
      desc: "Materi presentasi dibagikan kepada peserta setelah acara.",
    },
    {
      title: "Sesi tanya jawab",
      desc: "Peserta bisa bertanya langsung kepada anggota tim Anargya.",
    },
    {
      title: "Rekaman acara",
      desc: "Rekaman dapat ditonton kembali setelah acara.",
    },
  ];

  return (
    <section id="topics" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative telemetry-line telemetry-line-delayed">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header with Reveal */}
        <RevealOnScroll direction="up">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider text-[#00ff87] inline-block mb-2">
              Topik acara
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
              Yang akan dibahas
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
              Tim Anargya akan membagikan pengalaman langsung merancang dan menguji mobil balap listrik.
            </p>
          </div>
        </RevealOnScroll>

        {/* Tracks Grid - Soft Rounded Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track, index) => (
            <RevealOnScroll key={index} delay={index * 120} direction="up">
              <div className="p-7 sm:p-8 rounded-3xl border border-white/10 bg-zinc-900/40 interactive-card space-y-4 h-full relative overflow-hidden group shadow-lg">
                {/* Subtle corner light accent */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#00ff87]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00ff87]/12 transition-all duration-500" />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#00ff87] tracking-wider uppercase font-heading px-3 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20">
                    Track {track.num}
                  </span>
                  <span className="text-xs font-medium text-zinc-300 px-3.5 py-1 rounded-full bg-white/5 border border-white/10">
                    {track.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#00ff87] transition-colors font-heading">
                  {track.title}
                </h3>

                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  {track.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Benefits Section with Soft Rounded Card */}
        <RevealOnScroll delay={200} direction="up">
          <div className="p-7 sm:p-10 rounded-3xl border border-white/10 bg-zinc-900/50 space-y-7 interactive-card shadow-xl backdrop-blur-md">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1 inline-block">
                Fasilitas Peserta
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Yang didapat peserta
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 border-t border-white/5">
              {perks.map((perk, i) => (
                <div key={i} className="space-y-2 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#00ff87]/20 transition-all">
                  <div className="text-sm font-bold text-white">
                    {perk.title}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-start">
              <a
                href="#register"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00ff87] hover:text-emerald-300 transition-colors group"
              >
                <span>Daftar untuk mengikuti acara</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
