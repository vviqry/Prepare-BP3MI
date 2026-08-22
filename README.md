# 🛠️ BP3MI SMK Go Global — Welder & English Simulation App

> **Simulasi Seleksi Pelatihan SMK Go Global BP3MI — Bidang Welder & Bahasa Inggris**

Aplikasi Single Page Application (SPA) & Progressive Web App (PWA) modern dan interaktif yang dirancang khusus untuk persiapan calon Pekerja Migran Indonesia (PMI) bidang Pengelasan (Welder) dalam menghadapi tahapan seleksi program SMK Go Global BP3MI.

![Banner](https://img.shields.io/badge/BP3MI-SMK_Go_Global-orange?style=for-the-badge&logo=shield)
![PWA](https://img.shields.io/badge/PWA-Ready-success?style=for-the-badge&logo=pwa)
![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5_|_TailwindCSS_|_Vanilla_JS-blue?style=for-the-badge)

---

## 🌟 Fitur Utama

### 1. 📝 Simulasi Ujian Tertulis (15 Soal)
* **4 Kategori Soal Standar Industri:**
  * **Technical Welding**: SMAW, GTAW (TIG), GMAW (MIG), posisi las (1G-4G), cacat las (*porosity, undercut, slag inclusion*).
  * **Workshop English**: Istilah alat kerja, perintah keselamatan (*safety commands*), terminologi *blueprint* (WPS).
  * **K3 Safety Standards**: Pemilihan *shade* helm las, APD khusus posisi 4G, prosedur penanganan tabung gas bertekanan.
  * **Regulasi Migran & Logika**: Alur resmi penempatan BP2MI (SISKOP2MI s/d PAP) dan tes logika spasial dasar.
* **Fitur Ujian:**
  * Real-time countdown timer (15 menit) dengan indikator visual.
  * Penilaian persentase otomatis & kelulusan (standar 70%).
  * Pembahasan edukatif interaktif untuk setiap butir soal.
  * Fitur ulangi ujian (*retake*).

### 2. 📖 Panduan Materi Wawancara BP2MI (5 Sesi Kunci)
* Panduan taktis tanya-jawab resmi seleksi welder BP2MI/BP3MI:
  * **Sesi 1: Komitmen Dasar & Motivasi** (Latar belakang kejuruan vokasi & motivasi jalur resmi).
  * **Sesi 2: Kompetensi Teknis Pengelasan** (Penguasaan Las Listrik SMAW, baja karbon, posisi 1G & 2G).
  * **Sesi 3: Ketahanan Kerja & Kesehatan** (Fisik prima, K3, kesiapan kacamata koreksi kedok las).
  * **Sesi 4: Kesiapan Asrama & Bahasa** (Pengalaman mandiri di asrama & 640 JPL Bahasa Inggris).
  * **Sesi 5: Adaptasi Budaya & Komunikasi** (Penempatan multi-negara & etika instruksi supervisor).
* Accordion respon taktis, poin kunci strategi jawaban, dan fitur salin teks jawaban satu-klik.

### 3. 🎙️ English Interview Practice (8 Pertanyaan)
* Kumpulan 8 pertanyaan wawancara rekrutmen juru las global yang paling sering diujikan.
* Fitur accordion interaktif **"Show Best Answer Guide"**.
* Template jawaban profesional dalam bahasa Inggris teknis beserta terjemahan lengkap Bahasa Indonesia.

### 4. 📋 Welder Readiness Checklist (28 Item)
* State-saving otomatis menggunakan `localStorage` browser.
* 4 Kategori Kesiapan:
  * 📄 Kelengkapan Dokumen (Paspor, SKCK, Sertifikat BNSP, Surat Izin).
  * 🏥 Medical Check-Up & Kesehatan Fisik (Bebas tato/tindik, tes rontgen paru, visus mata, tes buta warna).
  * 🏋️ Kesiapan Fisik & Keterampilan Praktik.
  * 🧠 Kesiapan Mental & Penguasaan Bahasa.

### 5. ⚡ Quick Cheat-Sheet
* **Simbol Pengelasan (Welding Symbols)**: Fillet, V-Groove, Bevel, Field Weld, Weld All-Around, dll.
* **Posisi Pengelasan (Welding Positions)**: 1G s/d 6G lengkap dengan indikator tingkat kesulitan.
* **Kosakata Bahasa Inggris Industri**: 28 istilah teknis terpenting lengkap dengan filter kategori (Process, Material, Equipment, Defect, PPE, Safety).

### 6. 📱 Progressive Web App (PWA) Support
* Dapat di-install langsung di smartphone Android, iOS, maupun desktop PC.
* Dilengkapi icon maskable `BP3MI.png`, `manifest.json`, dan `service-worker.js` untuk offline caching.

---

## 🚀 Cara Menjalankan

Aplikasi ini bersifat **standalone** (tanpa perlu server/backend):

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/vviqry/Prepare-BP3MI.git
   ```
2. Buka file `index.html` langsung di browser favorit Anda (Chrome, Edge, Firefox, Safari) atau jalankan local server seperti `npx serve .` atau VS Code Live Server.

---

## 🌐 Deploy ke GitHub Pages / Vercel

1. **GitHub Pages**: Masuk ke Settings repository -> Pages -> Source: branch `main` -> Save.
2. **Vercel**: Import repository ke dashboard Vercel, file `vercel.json` sudah terkonfigurasi otomatis dengan PWA header caching.

---

*Dikembangkan untuk mendukung persiapan generasi muda Indonesia menjadi tenaga kerja global yang kompeten dan berdaya saing.*
