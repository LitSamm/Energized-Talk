# Energize Talk — Anargya ITS EV Team

Website pendaftaran Energize Talk 2026. Aplikasi dibuat dengan Next.js App Router, React, Tailwind CSS, Prisma, dan PostgreSQL (Supabase).

## Fitur

- Halaman acara yang responsif, dengan informasi acara, poster, topik, dan FAQ.
- Formulir pendaftaran dengan validasi data di browser dan server.
- Kode tiket unik setelah pendaftaran berhasil.
- Penyimpanan pendaftaran melalui PostgreSQL. Jika database tidak dapat diakses, aplikasi lokal menggunakan file `.local-registrations.json`.
- Halaman admin untuk mencari peserta, melihat detail, mengunduh CSV, dan menghapus data.

> **Catatan keamanan:** login `/admin` saat ini hanya pemeriksaan di sisi browser, sedangkan endpoint API data pendaftar belum dilindungi autentikasi server. Jangan gunakan dengan data pribadi sungguhan atau deploy ke publik sebelum autentikasi dan otorisasi server ditambahkan. Penyimpanan JSON lokal hanya untuk pengembangan; jangan mengandalkannya untuk deployment.

## Persyaratan

- Node.js 20.9 atau lebih baru (disarankan Node.js 22 LTS).
- npm.
- PostgreSQL/Supabase hanya diperlukan untuk menyimpan data secara persisten. Tanpa database, pendaftaran lokal disimpan ke file JSON pada mesin yang menjalankan server.

## Instalasi dan menjalankan lokal

```bash
git clone https://github.com/LitSamm/Energized-Talk-.git
cd Energized-Talk-
npm ci
npm run dev
```

Buka `http://localhost:3000`. Halaman admin tersedia di `http://localhost:3000/admin`.

`npm ci` juga membuat Prisma Client secara otomatis; proses ini tidak memerlukan koneksi database. Untuk memakai database, isi variabel koneksi sebelum menjalankan perintah Prisma atau aplikasi.

## Menghubungkan Supabase

1. Buat proyek di [Supabase](https://supabase.com/).
2. Salin `.env.example` menjadi `.env`.
3. Isi `DATABASE_URL` dengan connection string PostgreSQL untuk aplikasi. Gunakan pooler Supabase jika diperlukan.
4. Isi `DIRECT_URL` dengan connection string direct atau session pooler yang dapat digunakan untuk operasi skema.
5. Buat tabel dan indeks dari skema Prisma:

```bash
npx prisma db push
```

6. Jalankan aplikasi:

```bash
npm run dev
```

`npm run build` membuat build produksi dan `npm start` menjalankan build tersebut. Pastikan variabel database tersedia di environment deployment. Jangan commit `.env` atau memasukkan rahasia koneksi ke variabel `NEXT_PUBLIC_*`.

## Perintah yang tersedia

| Perintah | Kegunaan |
| --- | --- |
| `npm ci` | Memasang dependensi sesuai `package-lock.json` |
| `npm run dev` | Menjalankan server pengembangan |
| `npm run lint` | Menjalankan ESLint |
| `npx tsc --noEmit` | Memeriksa tipe TypeScript |
| `npm run build` | Membuat build produksi |
| `npm start` | Menjalankan build produksi |
| `npx prisma generate` | Membuat Prisma Client |
| `npx prisma db push` | Menyelaraskan skema ke database |

## Struktur proyek

```text
prisma/
  schema.prisma
src/
  app/
    admin/                 Halaman admin
    api/                   Endpoint health, pendaftaran, dan data peserta
    globals.css            Gaya global
    layout.tsx             Layout dan metadata
    page.tsx               Halaman utama
  components/              Komponen halaman dan formulir
  lib/                     Prisma, layanan pendaftaran, dan validasi
public/
  images/                  Poster, logo, dan foto mobil Anargya
```
