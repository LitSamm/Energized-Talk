"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Apakah acara Energize Talk ini gratis?",
    answer:
      "Ya, tidak dipungut biaya. Acara ini terbuka untuk mahasiswa, pelajar, dan siapa pun yang tertarik dengan kendaraan listrik.",
  },
  {
    question: "Kapan dan di mana link Zoom dibagikan?",
    answer:
      "Tautan Zoom dibagikan melalui grup WhatsApp peserta sehari sebelum acara.",
  },
  {
    question: "Apakah peserta akan mendapatkan E-Sertifikat?",
    answer:
      "Ya. E-sertifikat diberikan kepada peserta yang hadir dan mengisi presensi.",
  },
  {
    question: "Apakah bisa mengajukan pertanyaan teknis saat sesi berlangsung?",
    answer:
      "Bisa. Akan ada sesi tanya jawab bersama anggota tim Anargya.",
  },
  {
    question: "Bagaimana cara bergabung menjadi anggota tim Anargya ITS?",
    answer:
      "Informasi rekrutmen diumumkan melalui kanal resmi Anargya ITS.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header with Reveal */}
        <RevealOnScroll direction="up">
          <div className="space-y-2 text-center sm:text-left">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider text-[#00ff87] inline-block mb-2">
              Pertanyaan yang sering diajukan
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
              Ada yang ingin ditanyakan?
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Informasi tentang pendaftaran dan pelaksanaan acara.
            </p>
          </div>
        </RevealOnScroll>

        {/* FAQ Accordion - Soft Rounded Cards */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <RevealOnScroll key={index} delay={index * 60} direction="up">
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#00ff87]/40 bg-zinc-900/60 shadow-lg shadow-[#00ff87]/5"
                      : "border-white/10 bg-zinc-900/30 hover:border-white/20 hover:bg-zinc-900/50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:text-[#00ff87] transition-colors cursor-pointer group"
                    id={`faq-question-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-semibold text-base">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-[#00ff87]/20 text-[#00ff87] rotate-180"
                          : "bg-white/5 text-zinc-400 group-hover:bg-white/10"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      className="px-5 pb-5 text-sm text-zinc-300 leading-relaxed pt-1 border-t border-white/5 animate-in fade-in duration-200"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
