"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

interface RegistrationSuccessData {
  id: string;
  ticketCode: string;
  fullName: string;
  institution: string;
  email: string;
  phone: string;
  attendanceType: string;
  interestTopic?: string;
  createdAt: string;
}

const INTEREST_TOPICS = [
  "Baterai Listrik & Custom BMS",
  "Aerodinamika & Bodi Serat Karbon",
  "Motor Controller, Inverter & Telemetri IoT",
  "Riset & Karir di Formula Student",
];

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    institution: "",
    email: "",
    phone: "",
    attendanceType: "ONLINE",
    interestTopic: "Baterai Listrik & Custom BMS",
    questionsForSpeaker: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<RegistrationSuccessData | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleTopicSelect = (topic: string) => {
    setFormData((prev) => ({ ...prev, interestTopic: topic }));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00ff87", "#10b981", "#ffffff"],
      });
    } catch (e) {
      console.warn("Confetti error:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage("Nama lengkap wajib diisi.");
      return;
    }
    if (!formData.institution.trim()) {
      setErrorMessage("Asal institusi / kampus / sekolah wajib diisi.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Silakan masukkan alamat email yang valid.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Nomor WhatsApp wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Gagal melakukan pendaftaran. Silakan coba lagi.");
      }

      setSuccessData(result.data);
      triggerConfetti();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTicket = () => {
    if (successData?.ticketCode) {
      navigator.clipboard.writeText(successData.ticketCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setFormData({
      fullName: "",
      institution: "",
      email: "",
      phone: "",
      attendanceType: "ONLINE",
      interestTopic: "Baterai Listrik & Custom BMS",
      questionsForSpeaker: "",
    });
  };

  return (
    <section id="register" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header with Reveal */}
        <RevealOnScroll direction="up">
          <div className="space-y-2 text-center sm:text-left">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider text-[#00ff87] inline-block mb-2">
              Pendaftaran Peserta
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
              Daftar Energize Talk 2026
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Pendaftaran gratis. Isi formulir ini untuk mendapatkan kode tiket dan informasi acara.
            </p>
          </div>
        </RevealOnScroll>

        {/* Success View */}
        {successData ? (
          <div className="p-7 sm:p-12 rounded-3xl border border-white/10 bg-zinc-900/60 space-y-8 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
            <div className="space-y-1.5">
              <span className="px-3.5 py-1 rounded-full bg-[#00ff87]/15 border border-[#00ff87]/30 text-xs font-bold uppercase tracking-wider text-[#00ff87] inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-ping" />
                Pendaftaran berhasil
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-2">
                Selamat Bergabung, {successData.fullName}!
              </h3>
              <p className="text-sm text-zinc-300">
                Kode tiket Anda sudah terbit. Simpan kode ini untuk keperluan acara.
              </p>
            </div>

            {/* Credential Pass Card - Soft Rounded */}
            <div className="rounded-3xl border border-white/15 bg-black/60 p-6 sm:p-8 space-y-5 text-sm relative overflow-hidden shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-bold text-xs text-zinc-300 uppercase tracking-wider font-heading">
                  Anargya ITS EV Team
                </span>
                <span className="px-3 py-1 rounded-full bg-[#00ff87]/15 border border-[#00ff87]/30 text-[#00ff87] text-xs font-semibold">
                  Tiket peserta
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-zinc-400 block">Nama Peserta</span>
                  <span className="font-bold text-white text-base block mt-0.5">
                    {successData.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block">Institusi / Afiliasi</span>
                  <span className="font-medium text-zinc-200 block mt-0.5">{successData.institution}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block">Alamat Email</span>
                  <span className="font-medium text-zinc-300 block mt-0.5">{successData.email}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block">Format Kehadiran</span>
                  <span className="font-medium text-zinc-300 block mt-0.5">Live Online via Zoom</span>
                </div>
              </div>

              <div className="pt-5 border-t border-dashed border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block">Kode Unik Tiket</span>
                  <span className="text-lg sm:text-xl font-bold text-[#00ff87] font-heading tracking-wider">
                    {successData.ticketCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white text-xs font-semibold btn-interactive"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00ff87]" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Kode</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* WhatsApp Group Box */}
            <div className="p-6 sm:p-7 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-heading">
                  Bergabung ke grup WhatsApp peserta
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Informasi tautan Zoom dan materi acara akan dibagikan melalui grup WhatsApp.
                </p>
              </div>

              <a
                href="https://chat.whatsapp.com/CXMDpcrl8CR6Ti5jFCcjVj?s=cl&p=i&ilr=4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#00ff87] text-black font-bold text-xs sm:text-sm btn-interactive shadow-lg shadow-emerald-500/20"
              >
                <span>Bergabung ke grup WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-zinc-400 hover:text-white underline transition-colors cursor-pointer"
            >
              Daftarkan peserta lain
            </button>
          </div>
        ) : (
          /* The Form with Reveal */
          <RevealOnScroll delay={150} direction="up">
            <div className="p-7 sm:p-12 rounded-3xl border border-white/10 bg-zinc-900/40 shadow-2xl backdrop-blur-md space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-200 text-sm animate-in fade-in duration-200">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Nama Lengkap <span className="text-[#00ff87]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nama lengkap"
                    required
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-500 input-smooth"
                  />
                </div>

                {/* Institusi */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Asal Kampus / Sekolah / Perusahaan <span className="text-[#00ff87]">*</span>
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="Contoh: Institut Teknologi Sepuluh Nopember"
                    required
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-500 input-smooth"
                  />
                </div>

                {/* 2-Columns: Email & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Alamat Email <span className="text-[#00ff87]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      required
                      className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-500 input-smooth"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Nomor WhatsApp <span className="text-[#00ff87]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="08123456789"
                      required
                      className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-500 input-smooth"
                    />
                  </div>
                </div>

                {/* Topik Minat - Soft Interactive Rounded Tiles */}
                <div className="space-y-2.5 pt-1">
                  <label className="block text-xs font-semibold text-zinc-300">
                    Topik yang paling ingin Anda ketahui
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INTEREST_TOPICS.map((topic) => {
                      const isSelected = formData.interestTopic === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => handleTopicSelect(topic)}
                          className={`text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "border-[#00ff87] bg-[#00ff87]/15 text-white shadow-md shadow-[#00ff87]/10 scale-[1.01]"
                              : "border-white/10 bg-black/30 text-zinc-300 hover:border-white/25 hover:bg-black/50 hover:scale-[1.008]"
                          }`}
                        >
                          <span className="leading-snug">{topic}</span>
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] shrink-0 ml-2 shadow-[0_0_8px_#00ff87]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pertanyaan */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Pertanyaan untuk Tim Engineer (Opsional)
                    </label>
                    <span className="text-[11px] text-zinc-400">Maksimal 500 karakter</span>
                  </div>
                  <textarea
                    name="questionsForSpeaker"
                    value={formData.questionsForSpeaker}
                    onChange={handleChange}
                    rows={3}
                    maxLength={500}
                    placeholder="Tuliskan pertanyaan untuk tim Anargya"
                    className="w-full p-4 bg-black/40 border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-500 input-smooth resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-[#00ff87] hover:bg-emerald-400 text-black font-bold text-sm tracking-wide disabled:opacity-50 btn-interactive shadow-lg shadow-[#00ff87]/20 cursor-pointer"
                  >
                    {loading ? "Mengirim pendaftaran..." : "Kirim pendaftaran gratis"}
                  </button>
                </div>
              </form>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
