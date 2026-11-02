# LittleHeroes (LittleStar) 🌟🦸‍♂️

Aplikasi Habit Tracker & Reward Interaktif Anak berbasis Gamifikasi Bintang, didesain untuk melatih kemandirian dan tanggung jawab anak usia 4–10 tahun dengan antarmuka taktil 3D ramah anak dan Ruang Kontrol Orang Tua dengan proteksi PIN 4 digit.

---

## ✨ Fitur Utama

- **Mode Anak (Petualangan Cilik):**
  - **Header Profil & Toples Bintang:** Menampilkan avatar anak (Bima), status toples bintang aktif, dan indikator level.
  - **Hero Progress Card:** Menampilkan progress misi hari ini secara visual dengan animasi roket dan pesan motivasi gamifikasi.
  - **Daftar Misi Harian (Tactile 3D Cards):** 3 state interaktif (*Belum Dikerjakan*, *Menunggu Verifikasi*, dan *Selesai Disetujui*).
  - **Toko Hadiah Anak:** Katalog reward dengan status kesiapan bintang (*Bintang Cukup! 🎉* vs *Terkunci*).
  - **Modal Konfirmasi Tukar Hadiah:** Kalkulator toples bintang ramah anak (*Visual Math*).
  - **Layar Selebrasi Kemenangan:** Suara lonceng kemenangan (*Web Audio API Synth*) dan animasi konfeti ceria.
  - **Buku Bintang (Riwayat Transaksi):** Tabungan toples kaca 3D dan riwayat keluar-masuk bintang.

- **Mode Orang Tua (Parent Dashboard):**
  - **Proteksi PIN 4-Digit:** Keypad numerik 3x4 dengan animasi getar saat salah dan dukungan biometrik / Face ID.
  - **Quick Stats Bento:** Ringkasan misi yang perlu disetujui, saldo bintang aktif, dan tingkat konsistensi anak (85%).
  - **Tab Persetujuan Misi (Approval):** Orang tua dapat menyetujui misi (menerbangkan bintang ke toples anak) atau meminta anak mengulangi.
  - **Tab Kelola Quest:** Daftar misi aktif dan form pembuatan misi baru dengan *Live Preview*.
  - **Tab Kelola Hadiah:** Form penambahan item reward baru dengan *Tactile Stepper* bintang.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide React, Canvas Confetti.
- **Backend / Database:** Supabase (PostgreSQL, Realtime Subscriptions, RLS Policies).
- **Design Tokens:** Quicksand & Nunito Sans Typography, Tactile Gamified Play Theme Tokens.
- **Deployment:** Vercel (SPA Rewrites configured).

---

## 🚀 Menjalankan Project Secara Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/155135/LittleStar.git
   cd LittleStar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables:**
   Salin `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Isi dengan kredensial Supabase kamu:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Jalankan database migration di Supabase:**
   Buka SQL Editor di Supabase Dashboard, lalu jalankan script di `supabase/schema.sql`.

5. **Jalankan development server:**
   ```bash
   npm run dev
   ```

---

## 📱 Panduan Mode Orang Tua
- **PIN Default Pengujian:** `1234`
- Ketuk ikon gembok di pojok kanan atas Header untuk beralih ke Mode Orang Tua.

