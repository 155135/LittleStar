# Product Requirement Document (PRD)
## StarQuest: Aplikasi Reward & Habit Tracker Anak

---

## 1. Document Overview
* **Product Name:** StarQuest
* **Version:** 1.0 (MVP)
* **Status:** Ready for Design / Stitch Prototype
* **Target Audience:** Orang tua & Anak usia 4–10 tahun

---

## 2. Product Vision & Goals
* **Vision:** Mengubah pembentukan kebiasaan baik pada anak menjadi petualangan interaktif tanpa drama atau omelan harian.
* **Goals:**
  * Memberi orang tua instrumen terukur untuk melatih disiplin dan tanggung jawab anak.
  * Memberi anak motivasi intrinsik dan ekstrinsik melalui gamifikasi bintang dan sistem reward nyata.

---

## 3. User Personas

### Persona 1: Parent (Admin / Approver)
* **Karakteristik:** Sibuk, ingin anak mandiri tanpa harus sering diteriaki/diingatkan berkali-kali.
* **Kebutuhan:**
  * Kemudahan input tugas harian/mingguan.
  * Kontrol penuh atas verifikasi tugas dan validasi penukaran hadiah.
  * Perlindungan PIN agar konfigurasi tidak diubah anak.

### Persona 2: Child (Player / Achiever)
* **Karakteristik:** Anak usia 4–10 tahun, sangat responsif terhadap visual menarik, suara penghargaan, dan target hadiah konkret.
* **Kebutuhan:**
  * Tampilan sederhana dengan visual ikon besar dan teks singkat.
  * Rasa pencapaian saat melihat saldo bintang bertambah.
  * Katalog hadiah yang jelas menampilkan target yang bisa diraih.

---

## 4. Key User Flows

### Flow A: Setup Quest & Reward (Parent)
1. Parent login dan membuat profil anak.
2. Parent membuka menu **Quest Management** $\rightarrow$ menambah quest (nama, ikon, nilai bintang, frekuensi).
3. Parent membuka menu **Reward Shop** $\rightarrow$ menambah katalog hadiah (nama hadiah, ikon/foto, harga bintang).

### Flow B: Menjalankan & Menyelesaikan Quest (Child)
1. Child membuka Mode Anak dan melihat daftar quest hari ini.
2. Child menyelesaikan tugas di dunia nyata.
3. Child menekan tombol **"Selesai"** pada kartu quest terkait.
4. Status quest berubah menjadi **"Menunggu Persetujuan Orang Tua"**.

### Flow C: Verifikasi Quest (Parent)
1. Parent membuka Mode Orang Tua (input PIN).
2. Parent melihat daftar quest pending.
3. Parent menekan tombol **"Setujui"** (Approve).
4. Saldo bintang anak otomatis bertambah di toples/celengan virtual.

### Flow D: Klaim & Penebusan Hadiah (Child & Parent)
1. Child membuka tab **Katalog Hadiah**.
2. Jika saldo bintang mencukupi, tombol **"Tukar Hadiah"** aktif.
3. Child menekan **"Tukar Hadiah"** $\rightarrow$ Notifikasi klaim terkirim ke Parent.
4. Parent menyerahkan reward nyata dan menekan **"Selesai Diberikan"**.
5. Saldo bintang anak terpotong otomatis.

---

## 5. Functional Requirements (MVP Scope)

| Modul | Fitur | Deskripsi | Prioritas |
| :--- | :--- | :--- | :--- |
| **Auth & Mode** | Dual Mode Interface | Mode Anak (read-only action) dan Mode Orang Tua (diproteksi PIN 4 digit). | P0 (Critical) |
| **Profil** | Multi-Child Profile | Orang tua dapat mengelola lebih dari 1 profil anak dalam satu akun. | P1 (High) |
| **Quest** | CRUD Quest | Orang tua dapat membuat, mengedit, dan menghapus quest harian/mingguan. | P0 (Critical) |
| **Quest** | Mark as Done | Anak dapat menandai quest selesai dengan satu ketukan tombol besar. | P0 (Critical) |
| **Verifikasi** | Parent Approval | Orang tua memverifikasi penyelesaian tugas sebelum bintang ditambahkan. | P0 (Critical) |
| **Wallet** | Celengan Bintang | Visualisasi toples bintang interaktif dengan counter angka real-time. | P0 (Critical) |
| **Wallet** | Riwayat Bintang | Catatan ringkas perolehan bintang masuk dan pemotongan klaim. | P2 (Medium) |
| **Reward** | CRUD Reward Catalog | Orang tua mengatur item reward (mainan, jalan-jalan, screen time) dan harga bintang. | P0 (Critical) |
| **Reward** | Redeem Request | Anak mengajukan klaim reward jika bintang mencukupi; parent memvalidasi penyerahan. | P0 (Critical) |

---

## 6. Non-Functional Requirements (NFR)

* **UI & Visual Language:**
  * Warna dasar cerah (kuning ceria, biru langit, hijau ramah).
  * Komponen ramah sentuhan (touch target minimal $48 \times 48\text{ px}$).
  * Tipografi sans-serif membulat (*rounded*) agar mudah dibaca anak.
* **Audio-Visual Feedback:**
  * Efek visual koin/bintang jatuh saat quest disetujui.
  * Suara lonceng/chime bernada gembira saat reward di-claim.
* **Security:**
  * PIN Orang Tua wajib diminta setiap kali beralih dari Mode Anak ke Mode Orang Tua.
* **Responsiveness:**
  * Dioptimalkan untuk orientasi Portrait pada smartphone (layar 5.5 inci hingga 6.7 inci) dan tablet.

---

## 7. Wireframe & Stitch Prompt Guidelines

Jika ingin melanjutkan desain UI di Stitch atau Figma AI, gunakan referensi layar berikut:

1. **Screen 1: Child Home Screen**
   * Top bar: Avatar anak, nama anak, dan toples bintang besar dengan total bintang.
   * Section Quest Hari Ini: Kartu tugas horizontal/vertikal dengan ikon besar, judul tugas, badge (+X Bintang), dan tombol "Selesai".
   * Bottom bar navigasi: Home (Quest) dan Toko Hadiah.

2. **Screen 2: Reward Shop Screen (Child View)**
   * Banner saldo bintang saat ini.
   * Grid item hadiah: Ikon/gambar hadiah, label nama, harga bintang.
   * State tombol: Disable jika bintang kurang, tombol glow/aktif jika bintang cukup.

3. **Screen 3: Parent Dashboard (PIN Protected)**
   * Tab "Perlu Disetujui": Daftar quest yang telah dikerjakan anak menunggu approval.
   * Tab "Kelola Quest": Form tambah/edit quest.
   * Tab "Kelola Hadiah": Form tambah/edit katalog reward.

---

## 8. Success Metrics
* **Completion Rate:** $> 75\%$ quest harian selesai dan disetujui.
* **Daily Active Usage (DAU):** Minimal 1 sesi per hari untuk verifikasi dan pembaruan quest.
* **Redemption Cycle:** Minimal 1 kali penukaran hadiah per 1-2 minggu untuk menjaga antusiasme anak.