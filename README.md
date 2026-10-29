# Energize Talk — Anargya ITS EV Team Web Registration System

Aplikasi Web Formulir Pendaftaran Resmi **Energize Talk** yang diselenggarakan oleh **Anargya ITS EV Team** (Institut Teknologi Sepuluh Nopember Surabaya). Dibuat menggunakan **Next.js (App Router)**, **Prisma ORM**, dan **Supabase (PostgreSQL)** dengan estetika desain modern *Dark Electric Formula Motorsport*.

---

## Teknologi & Dependensi Utama

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL Cloud)
- **ORM**: [Prisma ORM](https://www.prisma.io/) (v6.19.3)
- **Validation**: [Zod](https://zod.dev/) untuk validasi format email, nomor WhatsApp Indonesia, dan input pendaftar
- **Styling**: Tailwind CSS & Vanilla CSS (Custom Electric Theme: `#00ff87`, Deep Obsidian `#060907`, Circuit Grid, Glow Effects)
- **Icons & Animation**: [Lucide React](https://lucide.dev/), [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## Fitur Unggulan

1. **Desain Imersif & Responsif**:
   - Hero Section dengan poster resmi *Energize Talk* dan *Countdown Timer* menuju acara.
   - Sorotan riset teknik mobil listrik: *High Voltage Battery Pack & BMS*, *Aerodinamika CFD & Carbon Fiber Monocoque*, *Inverter & Telemetri IoT*, serta *Formula Student Japan Preparation*.
   - FAQ interaktif (Accordion) mengenai pelaksanaan acara, link Zoom, dan e-sertifikat.

2. **Formulir Pendaftaran Lengkap & Terverifikasi**:
   - Validasi nama, institusi, format email unik (mencegah duplikasi), dan nomor WhatsApp Indonesia (`08...` atau `+62...`).
   - Pilihan topik bahasan minat utama & kotak pengajuan pertanyaan untuk engineer Anargya.
   - Status biaya registrasi (100% GRATIS).

3. **E-Ticket Digital Pass & Integrasi Komunitas**:
   - Animasi selebrasi confetti instan setelah submit.
   - Penerbitan tiket digital unik (*Unique Ticket Code*, misal: `ANR-ET26-XXXXX`), simulasi QR Code, dan tombol salin kode.
   - Tombol langsung untuk bergabung ke **Grup WhatsApp Resmi Peserta**.

4. **Portal Admin & Manajemen Peserta (`/admin`)**:
   - Pemantauan seluruh pendaftar secara langsung (*real-time*).
   - Indikator status koneksi Supabase / Prisma.
   - Pencarian cerdas berdasarkan nama, institusi, email, atau kode tiket.
   - Detail lengkap pendaftar (termasuk pertanyaan untuk pembicara).
   - Ekspor seluruh data pendaftar ke file format **CSV**.
   - Hapus data peserta.

5. **Ketahanan Sistem (*Graceful Fallback*)**:
   - Sistem dirancang siap pakai (*out-of-the-box*): Jika kredensial Supabase belum diisi di `.env`, aplikasi tetap dapat diuji secara lokal menggunakan *local storage fallback* tanpa error.
   - Begitu kredensial Supabase diisi, Prisma akan langsung tersambung ke tabel database PostgreSQL Anda.

---

## Panduan Menghubungkan ke Supabase

### 1. Buka Supabase Dashboard
Buat proyek baru di [supabase.com](https://supabase.com/).

### 2. Dapatkan Connection String
Buka menu **Project Settings** > **Database** > **Connection string (URI)**:
- **Mode Transaction / Session Pooler (Port 6543)** untuk `DATABASE_URL`
- **Mode Direct Connection (Port 5432)** untuk `DIRECT_URL`

### 3. Konfigurasi `.env`
Buka berkas `.env` dan masukkan connection string Anda:

### 4. Sinkronisasi Skema Database ke Supabase
Jalankan perintah berikut di terminal:

```bash
# Sinkronkan tabel 'registrations' ke Supabase secara instan
npx prisma db push

# Generate ulang Prisma Client
npx prisma generate
```

Tabel `registrations` akan otomatis dibuat di database Supabase Anda lengkap dengan indeks `email` dan `ticketCode`.

---

## Menjalankan Server Lokal

```bash
# Mode Development
npm run dev

# Buka di browser
http://localhost:3000

# Dashboard Admin & Data Pendaftar
http://localhost:3000/admin
```

---

## Struktur Direktori Proyek

```text
├── prisma/
│   └── schema.prisma         # Definisi model Registrations untuk Supabase PostgreSQL
├── public/
│   └── images/               # Key visual poster dan mobil formula listrik Anargya
├── src/
│   ├── app/
│   │   ├── admin/            # Halaman Admin & Data Peserta (/admin)
│   │   ├── api/
│   │   │   ├── health/       # Health check database Supabase/Prisma
│   │   │   ├── register/     # Endpoint POST pendaftaran dengan validasi Zod
│   │   │   └── registrations/# Endpoint GET & DELETE data peserta
│   │   ├── globals.css       # Tailwind 4 & custom styling electric motorsport
│   │   ├── layout.tsx        # SEO Meta tags & root layout
│   │   └── page.tsx          # Homepage Energize Talk
│   ├── components/
│   │   ├── AboutSection.tsx  # Informasi profil & pencapaian Anargya ITS
│   │   ├── DatabaseStatusModal.tsx # Modal inspeksi koneksi Supabase & Prisma
│   │   ├── EventTracks.tsx   # Topik presentasi & benefit peserta
│   │   ├── FaqSection.tsx    # Accordion pertanyaan umum
│   │   ├── Footer.tsx        # Tautan media sosial resmi & informasi hak cipta
│   │   ├── HeroSection.tsx   # Hero banner, hitung mundur, poster
│   │   ├── Navbar.tsx        # Navigasi atas & badge status database
│   │   └── RegistrationForm.tsx # Form pendaftaran + E-Ticket pass + confetti
│   └── lib/
│       ├── prisma.ts         # Singleton PrismaClient
│       ├── registration-service.ts # Service layer penyimpanan database & fallback
│       └── validations.ts    # Skema validasi Zod
├── .env                      # Konfigurasi variabel lingkungan
├── .env.example              # Panduan contoh konfigurasi Supabase
└── package.json
```

---


