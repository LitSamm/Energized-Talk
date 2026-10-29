"use client";

import React, { useState } from "react";
import {
  Database,
  X,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Code2,
  ExternalLink,
  Layers,
} from "lucide-react";

interface DatabaseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status?: {
    connected: boolean;
    database: string;
    message: string;
  };
  onRefresh?: () => void;
}

export default function DatabaseStatusModal({
  isOpen,
  onClose,
  status,
  onRefresh,
}: DatabaseStatusModalProps) {
  const [testing, setTesting] = useState(false);
  const [activeTab, setActiveTab] = useState<"status" | "env" | "schema">("status");

  if (!isOpen) return null;

  const handleTest = async () => {
    setTesting(true);
    if (onRefresh) {
      await onRefresh();
    }
    setTimeout(() => setTesting(false), 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0b130f] border border-emerald-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-[#00ff87]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                Status Integrasi Database & ORM
              </h3>
              <p className="text-xs text-gray-400">
                Next.js 16 • Prisma ORM • Supabase PostgreSQL
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-4 pb-2 border-b border-white/5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("status")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "status"
                ? "bg-[#00ff87] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Koneksi & Health
          </button>
          <button
            onClick={() => setActiveTab("env")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "env"
                ? "bg-[#00ff87] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Konfigurasi Supabase .env
          </button>
          <button
            onClick={() => setActiveTab("schema")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "schema"
                ? "bg-[#00ff87] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Skema Prisma
          </button>
        </div>

        {/* Tab 1: Status */}
        {activeTab === "status" && (
          <div className="space-y-4 py-4">
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                status?.connected
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                  : "bg-amber-950/30 border-amber-500/40 text-amber-200"
              }`}
            >
              {status?.connected ? (
                <CheckCircle2 className="w-6 h-6 text-[#00ff87] shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-white">
                  {status?.connected
                    ? "Supabase PostgreSQL Terhubung via Prisma"
                    : "Menjalankan Mode Simulasi Lokal / Menunggu Kredensial Supabase"}
                </h4>
                <p className="text-xs leading-relaxed opacity-90">
                  {status?.message || "Memeriksa status database..."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-gray-400 block font-medium">ORM Provider</span>
                <span className="font-mono font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#00ff87]" />
                  Prisma ORM v6.19
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-gray-400 block font-medium">Target Database</span>
                <span className="font-mono font-bold text-white flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-cyan-400" />
                  Supabase (PostgreSQL)
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Sistem pendaftaran ini dirancang fleksibel: data pendaftaran akan langsung disimpan ke
              tabel <code className="text-[#00ff87] font-mono">registrations</code> di Supabase. Bila
              koneksi internet atau kredensial belum diisi di <code className="text-white">.env</code>,
              sistem otomatis beralih ke penyimpanan lokal agar aplikasi tetap berfungsi sempurna saat dicoba.
            </p>

            <button
              onClick={handleTest}
              disabled={testing}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? "animate-spin" : ""}`} />
              <span>{testing ? "Menguji Koneksi..." : "Uji Koneksi Ulang"}</span>
            </button>
          </div>
        )}

        {/* Tab 2: .env snippet */}
        {activeTab === "env" && (
          <div className="space-y-3 py-4 text-xs">
            <p className="text-gray-300">
              Salin URL koneksi dari akun Supabase Anda (<b>Project Settings &gt; Database &gt; Connection string</b>) ke dalam berkas <code className="text-[#00ff87] font-mono">.env</code>:
            </p>
            <div className="p-3.5 rounded-xl bg-black border border-white/10 font-mono text-[11px] text-gray-300 overflow-x-auto space-y-2">
              <div className="text-gray-500"># Pooler Connection (Port 6543)</div>
              <div className="text-emerald-400 break-all">
                DATABASE_URL=&quot;postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&quot;
              </div>
              <div className="text-gray-500 pt-1"># Direct Connection (Port 5432)</div>
              <div className="text-cyan-400 break-all">
                DIRECT_URL=&quot;postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres&quot;
              </div>
            </div>
            <p className="text-gray-400 text-[11px]">
              Setelah mengisi <code className="text-white">.env</code>, jalankan perintah <code className="text-[#00ff87] font-mono">npx prisma db push</code> di terminal untuk membuat tabel otomatis.
            </p>
          </div>
        )}

        {/* Tab 3: Schema snippet */}
        {activeTab === "schema" && (
          <div className="space-y-3 py-4 text-xs">
            <div className="p-3.5 rounded-xl bg-black border border-white/10 font-mono text-[11px] text-gray-300 max-h-60 overflow-y-auto space-y-1">
              <div className="text-purple-400">model Registration &#123;</div>
              <div className="pl-4 text-gray-300">id String @id @default(cuid())</div>
              <div className="pl-4 text-gray-300">ticketCode String @unique</div>
              <div className="pl-4 text-gray-300">fullName String</div>
              <div className="pl-4 text-gray-300">institution String</div>
              <div className="pl-4 text-gray-300">email String @unique</div>
              <div className="pl-4 text-gray-300">phone String</div>
              <div className="pl-4 text-gray-300">attendanceType String @default(&quot;ONLINE&quot;)</div>
              <div className="pl-4 text-gray-300">interestTopic String?</div>
              <div className="pl-4 text-gray-300">questionsForSpeaker String?</div>
              <div className="pl-4 text-gray-300">status String @default(&quot;CONFIRMED&quot;)</div>
              <div className="pl-4 text-gray-300">createdAt DateTime @default(now())</div>
              <div className="text-purple-400">&#125;</div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
