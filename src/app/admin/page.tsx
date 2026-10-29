"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Download,
  Trash2,
  RefreshCw,
  ArrowLeft,
  CheckCircle,
  Eye,
  X,
  Lock,
  LogOut,
  Building,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

interface RegistrationItem {
  id: string;
  ticketCode: string;
  fullName: string;
  institution: string;
  email: string;
  phone: string;
  attendanceType: string;
  interestTopic: string | null;
  questionsForSpeaker: string | null;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<RegistrationItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Check existing session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("anargya_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    // Passcode validation
    if (passwordInput === "anargya2026" || passwordInput === "admin123") {
      sessionStorage.setItem("anargya_admin_auth", "true");
      setIsAuthenticated(true);
      setPasswordInput("");
    } else {
      setLoginError("Kata sandi salah. Silakan masukkan kata sandi admin yang benar.");
    }
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("anargya_admin_auth");
    setIsAuthenticated(false);
    setRegistrations([]);
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/registrations");
      const json = await res.json();
      if (json.success) {
        setRegistrations(json.data || []);
      }
    } catch (err) {
      console.error("Gagal memuat peserta:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus data pendaftaran "${name}"?`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/registrations?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert("Gagal menghapus pendaftaran.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCsv = () => {
    if (registrations.length === 0) {
      alert("Belum ada data peserta untuk diekspor.");
      return;
    }

    const headers = [
      "Kode Tiket",
      "Nama Lengkap",
      "Institusi",
      "Email",
      "WhatsApp",
      "Format Kehadiran",
      "Topik Minat",
      "Pertanyaan",
      "Waktu Pendaftaran",
    ];

    const rows = registrations.map((r) => [
      `"${r.ticketCode}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.institution.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.attendanceType}"`,
      `"${(r.interestTopic || "").replace(/"/g, '""')}"`,
      `"${(r.questionsForSpeaker || "").replace(/"/g, '""')}"`,
      `"${new Date(r.createdAt).toLocaleString("id-ID")}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `peserta-energize-talk-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered registrations
  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.fullName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.institution.toLowerCase().includes(q) ||
      r.ticketCode.toLowerCase().includes(q)
    );
  });

  const uniqueInstitutions = new Set(
    registrations.map((r) => r.institution.toLowerCase().trim())
  ).size;

  // ==========================================
  // VIEW 1: ADMIN LOGIN SCREEN (GATEKEEPER)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080b09] text-gray-100 flex items-center justify-center p-4 selection:bg-[#00ff87]/20 selection:text-white relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#00ff87]/6 blur-[120px] pointer-events-none rounded-full" />

        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-2xl shadow-2xl space-y-7 relative z-10">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#00ff87]/15 border border-[#00ff87]/30 text-[#00ff87] flex items-center justify-center mx-auto shadow-lg shadow-[#00ff87]/10">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Admin Portal Login
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Anargya ITS EV Team • Manajemen Peserta Energize Talk 2026
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs animate-in fade-in">
                {loginError}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-300">
                Kata Sandi Admin
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan kata sandi..."
                required
                autoFocus
                className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-sm text-white placeholder-zinc-500 input-smooth"
              />
              <p className="text-[11px] text-zinc-400">
                Kata sandi standar panitia: <span className="text-[#00ff87] font-semibold">anargya2026</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 rounded-full bg-[#00ff87] hover:bg-emerald-400 text-black font-bold text-sm tracking-wide btn-interactive shadow-lg shadow-[#00ff87]/20 cursor-pointer"
            >
              {isLoggingIn ? "Memverifikasi..." : "Masuk ke Dashboard Admin"}
            </button>
          </form>

          {/* Back Link */}
          <div className="pt-2 text-center border-t border-white/5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Utama</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#080b09] text-gray-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#00ff87]/20 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-[#00ff87] mb-2 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Lihat Halaman Publik</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3 font-heading">
              <Users className="w-7 h-7 text-[#00ff87]" />
              Data Pendaftar Energize Talk 2026
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Portal data pendaftaran resmi Anargya ITS EV Team
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchRegistrations}
              disabled={loading}
              className="p-3 rounded-full bg-zinc-900/60 hover:bg-zinc-800 border border-white/10 text-white text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md hover:border-white/20"
              title="Perbarui Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#00ff87]" : ""}`} />
              <span className="hidden sm:inline font-semibold">Refresh</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="px-5 py-3 rounded-full bg-[#00ff87] hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 btn-interactive shadow-lg shadow-[#00ff87]/20"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-3 rounded-full bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              title="Keluar dari Admin"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        {/* Stats Grid - Soft Rounded Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/10 interactive-card space-y-1.5 shadow-lg">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
              Total Pendaftar
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              {registrations.length}
            </div>
            <span className="text-xs text-[#00ff87] flex items-center gap-1.5 font-medium pt-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Status: Terdaftar &amp; Terverifikasi
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/10 interactive-card space-y-1.5 shadow-lg">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
              Asal Instansi Unik
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-heading">
              {uniqueInstitutions}
            </div>
            <span className="text-xs text-zinc-400 pt-1 block">
              Kampus, Sekolah, Perusahaan
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/10 interactive-card space-y-1.5 shadow-lg">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
              Format Kehadiran
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-heading">
              Online
            </div>
            <span className="text-xs text-zinc-400 pt-1 block">
              Live Zoom Meeting
            </span>
          </div>
        </div>

        {/* Search Input - Soft Pill Style */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan nama peserta, institusi, email, atau kode tiket..."
            className="w-full pl-12 pr-5 py-3.5 bg-zinc-900/50 border border-white/10 rounded-full text-sm text-white placeholder-zinc-500 input-smooth shadow-md"
          />
        </div>

        {/* Registrations Table - Rounded Container */}
        <div className="rounded-3xl border border-white/10 bg-zinc-900/40 overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-black/60 border-b border-white/10 text-zinc-400 font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-4.5 px-4 sm:px-6">Kode Tiket</th>
                  <th className="py-4.5 px-4">Nama Lengkap</th>
                  <th className="py-4.5 px-4">Institusi</th>
                  <th className="py-4.5 px-4">Kontak</th>
                  <th className="py-4.5 px-4">Topik Pilihan</th>
                  <th className="py-4.5 px-4">Waktu Daftar</th>
                  <th className="py-4.5 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-14 text-center text-zinc-400">
                      <RefreshCw className="w-6 h-6 animate-spin text-[#00ff87] mx-auto mb-2.5" />
                      Memuat daftar peserta...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-14 text-center text-zinc-400 text-sm">
                      {search
                        ? `Tidak ada peserta yang cocok dengan kata kunci "${search}"`
                        : "Belum ada peserta yang mendaftar."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-white/[0.03] transition-colors"
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <span className="px-3 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 text-[#00ff87] font-bold font-heading text-xs">
                          {item.ticketCode}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-white">
                        {item.fullName}
                      </td>
                      <td className="py-4 px-4 text-zinc-300">
                        {item.institution}
                      </td>
                      <td className="py-4 px-4 text-xs">
                        <div className="font-medium text-zinc-200">{item.email}</div>
                        <div className="text-zinc-500 mt-0.5">{item.phone}</div>
                      </td>
                      <td className="py-4 px-4 text-xs">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 inline-block max-w-[200px] truncate">
                          {item.interestTopic || "Umum"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-zinc-500 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-[#00ff87] transition-all hover:scale-110 active:scale-95"
                            title="Lihat Detail Peserta"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.fullName)}
                            disabled={deletingId === item.id}
                            className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-400 border border-red-500/20 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                            title="Hapus Data"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal - Rounded 3xl */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-7 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <h3 className="font-bold text-white text-lg font-heading">
                Detail Pendaftaran Peserta
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <span className="text-zinc-400 block text-xs">Kode Tiket:</span>
                <span className="font-bold text-xl text-[#00ff87] font-heading mt-0.5 block">
                  {selectedItem.ticketCode}
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block text-xs">Nama Lengkap:</span>
                <span className="font-semibold text-white text-base block mt-0.5">
                  {selectedItem.fullName}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div>
                  <span className="text-zinc-400 block text-xs">Institusi:</span>
                  <span className="text-zinc-200 font-medium mt-0.5 block">{selectedItem.institution}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-xs">Format:</span>
                  <span className="text-[#00ff87] font-semibold mt-0.5 block">
                    {selectedItem.attendanceType}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div>
                  <span className="text-zinc-400 block text-xs">Email:</span>
                  <span className="text-zinc-200 font-medium mt-0.5 block">{selectedItem.email}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-xs">WhatsApp:</span>
                  <span className="text-zinc-200 font-medium mt-0.5 block">{selectedItem.phone}</span>
                </div>
              </div>
              <div>
                <span className="text-zinc-400 block text-xs">Topik Minat:</span>
                <span className="text-zinc-200 font-medium mt-0.5 block">{selectedItem.interestTopic || "-"}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-xs">
                  Pertanyaan untuk Pembicara:
                </span>
                <p className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-zinc-300 mt-1 italic">
                  &ldquo;{selectedItem.questionsForSpeaker || "Tidak ada pertanyaan khusus."}&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold btn-interactive cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
