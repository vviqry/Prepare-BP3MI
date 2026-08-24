import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================================================
// 1. DATA MASTER: 20 SOAL INTERAKTIF (LENGKAP DENGAN HINT & PEMBAHASAN TEKNIS)
// ============================================================================
const INITIAL_QUESTIONS = [
  {
    "id": 1,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "What does SMAW stand for in industrial welding terminology?",
    "options": [
      "Submerged Metal Arc Welding",
      "Shielded Metal Arc Welding",
      "Standard Manual Arc Welding",
      "Semi-Manual Alloy Welding"
    ],
    "correct": 1,
    "hint": "Proses ini sering disebut \"Stick Welding\" karena menggunakan elektroda stik terbungkus fluks pelindung (shielding flux).",
    "explanation": "SMAW = Shielded Metal Arc Welding (Las Busur Listrik Terlindung / Las Stik). Fluks pada elektroda terbakar menghasilkan gas pelindung dan terak (slag) untuk melindungi kubangan las dari oksigen udara."
  },
  {
    "id": 2,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Dalam standardisasi pengelasan pelat alur (plate groove), kode posisi pengelasan \"3G\" merujuk pada posisi apa?",
    "options": [
      "Posisi Datar / Flat (bawah tangan)",
      "Posisi Horizontal (mendatar)",
      "Posisi Vertikal / Tegak (naik/turun)",
      "Posisi Overhead (di atas kepala)"
    ],
    "correct": 2,
    "hint": "Angka 1 = Flat, 2 = Horizontal, 3 = Vertikal, 4 = Overhead. Huruf \"G\" merujuk pada sambungan alur (Groove).",
    "explanation": "Posisi 3G adalah posisi pengelasan vertikal (Vertical Position) untuk sambungan alur pelat (Groove). Pengelasan dapat dilakukan dengan teknik vertical-up atau vertical-down."
  },
  {
    "id": 3,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Which welding process utilizes a non-consumable tungsten electrode and a shielding gas such as 100% Argon?",
    "options": [
      "SMAW (Stick Welding)",
      "GMAW (MIG Welding)",
      "GTAW (TIG Welding)",
      "FCAW (Flux-Cored Arc Welding)"
    ],
    "correct": 2,
    "hint": "Huruf \"T\" pada singkatannya merujuk pada unsur logam tahan panas tinggi berikatan \"Tungsten\".",
    "explanation": "GTAW (Gas Tungsten Arc Welding) atau TIG (Tungsten Inert Gas) menggunakan elektroda tungsten yang tidak ikut mencair (non-consumable) dan gas argon murni sebagai pelindung."
  },
  {
    "id": 4,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Cacat las (welding defect) berupa lubang-lubang kecil atau rongga gas yang terperangkap di dalam deposit logam las disebut:",
    "options": [
      "Undercut",
      "Porosity (Porositas)",
      "Slag Inclusion",
      "Lack of Fusion"
    ],
    "correct": 1,
    "hint": "Cacat ini menyerupai rongga spons/busa berpori yang disebabkan oleh kelembaban fluks atau aliran gas pelindung yang terganggu angin.",
    "explanation": "Porosity (porositas) terbentuk akibat gas yang terperangkap saat logam las membeku cepat. Penyebab utamanya adalah elektroda lembab, kontaminasi minyak/karat, atau hembusan angin pada gas pelindung."
  },
  {
    "id": 5,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "In GMAW (MIG/MAG welding), what is the primary function of the shielding gas cylinder mixture (e.g., Ar + CO2)?",
    "options": [
      "To increase electrical resistance and melt the wire faster",
      "To isolate and protect the molten weld pool from oxygen and nitrogen atmospheric contamination",
      "To cool down the welding gun handle continuously",
      "To add alloy elements to the steel base metal"
    ],
    "correct": 1,
    "hint": "Udara luar mengandung oksigen dan nitrogen yang dapat merusak kualitas ikatan logam cair jika tidak diselimuti (shielded).",
    "explanation": "Fungsi utama gas pelindung pada GMAW adalah menyelimuti dan mengisolasi cairan logam las (molten weld pool) agar tidak teroksidasi oleh oksigen atau terkontaminasi nitrogen dari atmosfer bebas."
  },
  {
    "id": 6,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Posisi pengelasan pipa tetap dengan sumbu kemiringan 45 derajat tanpa boleh diputar (fixed position) diklasifikasikan sebagai:",
    "options": [
      "Posisi 1G Pipe",
      "Posisi 2G Pipe",
      "Posisi 5G Pipe",
      "Posisi 6G Pipe"
    ],
    "correct": 3,
    "hint": "Ini adalah kualifikasi tingkat tertinggi untuk sertifikasi juru las pipa dengan sudut kemiringan 45°.",
    "explanation": "Posisi 6G adalah posisi pengujian pipa paling komprehensif di mana pipa dipasang pada sudut kemiringan 45° dan tidak boleh diputar. Welder yang lulus 6G umumnya terkualifikasi untuk semua posisi lainnya."
  },
  {
    "id": 7,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Berdasarkan klasifikasi elektroda AWS A5.1, arti dua angka pertama pada elektroda \"E7018\" menunjukkan:",
    "options": [
      "Kuat tarik minimum (minimum tensile strength) sebesar 70.000 psi",
      "Kuat luluh (yield strength) sebesar 70 MPa",
      "Panjang elektroda sebesar 70 cm",
      "Kadar karbon elektroda sebesar 0,70%"
    ],
    "correct": 0,
    "hint": "Huruf \"E\" = Elektroda, dua digit pertama (70) dikalikan 1.000 psi menghasilkan kekuatan tarik logam las.",
    "explanation": "Pada E7018, angka \"70\" mengindikasikan kuat tarik minimum hasil las adalah 70.000 psi (pound per square inch), angka \"1\" berarti untuk semua posisi las, dan \"8\" menunjukkan fluks serbuk besi rendah hidrogen (low hydrogen iron powder)."
  },
  {
    "id": 8,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Jenis elektroda SMAW berselaput selulosa (Cellulose) yang terkenal menghasilkan penetrasi sangat dalam pada lapisan akar (root pass) pipa saluran migas adalah:",
    "options": [
      "AWS E7018",
      "AWS E6010 / E6011",
      "AWS E6013",
      "AWS E308L-16"
    ],
    "correct": 1,
    "hint": "Elektroda berakhiran digit \"0\" atau \"1\" dengan fluks selulosa organik menghasilkan gas semburan busur yang kuat dan penetrasi akar tembus.",
    "explanation": "E6010 dan E6011 menggunakan fluks selulosa yang menghasilkan busur las kencang dan penetrasi akar (root penetration) yang dalam dan cepat membeku, standar industri untuk pengelasan pipa cross-country."
  },
  {
    "id": 9,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Pada pengelasan busur listrik arus searah (DC), polaritas DCEP (Direct Current Electrode Positive / Reverse Polarity) menghasilkan karakteristik:",
    "options": [
      "Dua pertiga panas terkonsentrasi pada elektroda, menghasilkan penetrasi yang lebih dalam pada logam induk",
      "Seluruh panas terpusat pada klem massa arde",
      "Tidak menghasilkan panas sama sekali pada benda kerja",
      "Hanya dapat digunakan untuk pengelasan bahan plastik sintetis"
    ],
    "correct": 0,
    "hint": "DCEP (polaritas terbalik): stang elektroda dihubungkan ke kutub positif (+) dan benda kerja ke kutub negatif (-).",
    "explanation": "Pada DCEP, aliran elektron menuju elektroda, menstabilkan transfer logam dan menghasilkan penetrasi las yang lebih dalam dibandingkan DCEN pada proses SMAW dan GMAW."
  },
  {
    "id": 10,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Istilah \"Duty Cycle\" 60% pada mesin las berkapasitas 200 Ampere berarti mesin tersebut aman digunakan mengelas terus-menerus selama:",
    "options": [
      "6 menit dalam siklus periode kerja 10 menit pada arus 200 Ampere",
      "60 menit tanpa henti dalam siklus 100 menit",
      "6 jam dalam sehari",
      "Hanya boleh digunakan saat efisiensi listrik 60%"
    ],
    "correct": 0,
    "hint": "Standar Duty Cycle internasional dihitung berdasarkan periode siklus total 10 menit.",
    "explanation": "Duty Cycle 60% @ 200A berarti mesin las dapat beroperasi pada beban 200A selama 6 menit penuh, kemudian wajib istirahat pendinginan (cooling) selama 4 menit dalam rentang siklus 10 menit agar tidak overheat."
  },
  {
    "id": 11,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Perbedaan utama antara proses las FCAW-S (Self-Shielded) dan FCAW-G (Gas-Shielded) adalah:",
    "options": [
      "FCAW-S tidak memerlukan tabung gas pelindung eksternal karena fluks inti kawat sudah menghasilkan gas pelindung mandiri",
      "FCAW-S menggunakan elektroda tungsten yang tidak mencair",
      "FCAW-G hanya bisa digunakan untuk memotong pelat baja tebal",
      "FCAW-S tidak menghasilkan busur listrik sama sekali"
    ],
    "correct": 0,
    "hint": "Huruf \"S\" adalah singkatan dari \"Self-Shielded\" (melindungi dirinya sendiri lewat serbuk fluks inti).",
    "explanation": "FCAW-S (Self-Shielded) memiliki bahan kimiawi di dalam inti kawat tubular yang menghasilkan gas pelindung saat terbakar, sehingga sangat ideal untuk pekerjaan luar ruangan berangin tanpa membawa tabung gas berat."
  },
  {
    "id": 12,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Posisi pengelasan pipa tetap dengan sumbu pipa terpasang horizontal dan juru las mengelas melingkari pipa secara vertikal disebut:",
    "options": [
      "Posisi 1G Pipe",
      "Posisi 2G Pipe",
      "Posisi 5G Pipe",
      "Posisi 6GR Pipe"
    ],
    "correct": 2,
    "hint": "Pipa horizontal tetap (tidak diputar) mengharuskan juru las mengelas dari arah bawah jam 6 naik ke atas jam 12 (5G).",
    "explanation": "Posisi 5G (Pipe Horizontal Fixed) adalah posisi di mana sumbu pipa horizontal diam/tetap, dan welder harus mengelas berkeliling vertikal (mencakup posisi flat, vertikal, dan overhead)."
  },
  {
    "id": 13,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Proses pengelasan otomatis di mana busur listrik sepenuhnya tertutup di bawah timbunan serbuk fluks granular tanpa percikan sinar tampak adalah:",
    "options": [
      "SAW (Submerged Arc Welding)",
      "SMAW (Stick Welding)",
      "OAW (Oxy-Acetylene Welding)",
      "GTAW (TIG Welding)"
    ],
    "correct": 0,
    "hint": "Kata \"Submerged\" berarti terendam atau tenggelam di bawah lapisan timbunan fluks mineral.",
    "explanation": "SAW (Submerged Arc Welding / Las Busur Terendam) menimbun busur listrik dan cairan las di bawah lapisan tebal fluks butiran, menghasilkan laju deposisi tertinggi dan tanpa radiasi sinar busur terbuka."
  },
  {
    "id": 14,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Cacat las berupa alur parit (groove) yang termakan pada tepi jalur las akibat logam induk mencair tanpa terisi cairan logam las disebut:",
    "options": [
      "Porosity",
      "Undercut",
      "Spatter",
      "Excessive Reinforcement"
    ],
    "correct": 1,
    "hint": "Sering disebabkan oleh arus pengelasan yang terlalu tinggi (amperage too high) atau ayunan elektroda terlalu cepat di bagian tepi.",
    "explanation": "Undercut adalah takik/cekungan tajam pada tepi jari-jari manik las (weld toe) yang mengurangi ketebalan efektif pelat dan dapat menjadi titik konsentrasi tegangan pemicu retak kelelahan (fatigue crack)."
  },
  {
    "id": 15,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Penyebab utama terjadinya cacat \"Slag Inclusion\" pada pengelasan multi-pass adalah:",
    "options": [
      "Pembersihan terak las antar-lapisan (pass) yang tidak tuntas sebelum mengelas lapisan berikutnya",
      "Penggunaan gas argon murni 100%",
      "Kecepatan pengelasan yang terlalu lambat pada pelat tipis",
      "Penggunaan elektroda tungsten tanpa fluks"
    ],
    "correct": 0,
    "hint": "Terak sisa lapisan terdahulu yang tidak digerinda/disikat kawat akan tertimpa dan terperangkap di dalam cairan las baru.",
    "explanation": "Slag inclusion (terak terjebak) terjadi ketika juru las tidak membersihkan kerak fluks secara sempurna dengan chipping hammer dan sikat kawat baja sebelum memulai lapisan (pass) berikutnya."
  },
  {
    "id": 16,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Kondisi di mana logam las tidak melebur menyatu secara metalurgi dengan logam dasar atau lapisan las sebelumnya disebut:",
    "options": [
      "Lack of Fusion (Incomplete Fusion / Cold Lap)",
      "Root Concavity",
      "Burn-through",
      "Overfill"
    ],
    "correct": 0,
    "hint": "Terjadi akibat masukan panas (heat input) yang tidak mencukupi untuk melelehkan permukaan dinding sambungan.",
    "explanation": "Lack of Fusion (kurang peleburan) adalah cacat planar di mana cairan las hanya menempel di permukaan tanpa mencairkan dan mengikat logam induk, biasanya akibat amper terlalu kecil atau kecepatan ayunan salah."
  },
  {
    "id": 17,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Tujuan utama dilakukannya pemanasan awal (Pre-heating) sebelum pengelasan pada baja karbon tebal adalah:",
    "options": [
      "Memperlambat laju pendinginan (cooling rate) untuk mencegah pembentukan struktur getas martensit dan retak hidrogen",
      "Membuat elektroda mencair lebih lambat",
      "Menghilangkan lapisan cat dekoratif pada baja",
      "Menambah ketebalan pelat baja secara instan"
    ],
    "correct": 0,
    "hint": "Pendinginan yang terlalu mendadak (rapid quenching) pada baja tebal dapat memicu struktur keras namun getas yang rentan retak.",
    "explanation": "Preheating mengurangi gradien suhu antara sambungan dan lingkungan, memperlambat pendinginan zona HAZ, memungkinkan difusi gas hidrogen keluar, dan meminimalkan tegangan sisa pencegah retak dingin."
  },
  {
    "id": 18,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Proses perlakuan panas pasca-pengelasan (Post-Weld Heat Treatment / PWHT) bertujuan utama untuk:",
    "options": [
      "Menghilangkan tegangan sisa (residual stress) dan meningkatkan keuletan sambungan",
      "Mengubah warna permukaan logam menjadi mengkilap",
      "Meningkatkan berat total struktur konstruksi",
      "Mempercepat proses pembekuan terak las"
    ],
    "correct": 0,
    "hint": "Setelah dilas, daerah sekitar las menyimpan tegangan tarik sisa yang sangat tinggi akibat penyusutan termal.",
    "explanation": "PWHT memanaskan sambungan las secara terkontrol ke suhu di bawah titik kritis transformasi untuk mereduksi tegangan sisa (stress relief), memperbaiki ketangguhan, dan mencegah keretakan saat beroperasi."
  },
  {
    "id": 19,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Zona pada logam induk yang mengalami perubahan struktur mikro akibat panas las tetapi tidak ikut mencair disebut:",
    "options": [
      "Weld Metal Zone (WMZ)",
      "Heat-Affected Zone (HAZ)",
      "Base Metal Unaffected",
      "Fusion Boundary Line"
    ],
    "correct": 1,
    "hint": "Singkatan dari \"Heat-Affected Zone\" (Daerah Pengaruh Panas).",
    "explanation": "HAZ (Heat-Affected Zone) adalah area logam dasar yang tidak mencair tetapi sifat mekanik dan struktur butir kristalnya berubah akibat siklus termal pengelasan, sering menjadi zona paling kritis terhadap retak."
  },
  {
    "id": 20,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Kode warna cincin merah pada elektroda tungsten GTAW (TIG) menunjukkan tipe kandungan:",
    "options": [
      "Pure Tungsten (Tungsten Murni)",
      "2% Thoriated Tungsten (EWTh-2)",
      "2% Ceriated Tungsten (EWCe-2)",
      "Zirconiated Tungsten"
    ],
    "correct": 1,
    "hint": "Warna merah adalah tanda paduan Torium (Thoria 2%), memiliki emisi elektron tinggi untuk arus DC pada baja.",
    "explanation": "Elektroda tungsten berkode warna Merah (EWTh-2) mengandung 2% Thorium Oksida, memiliki kemampuan start busur yang stabil dan daya tahan panas tinggi untuk pengelasan arus DCEN pada baja karbon dan stainless steel."
  },
  {
    "id": 21,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Saat mengelas material Aluminium dengan proses GTAW (TIG), jenis arus listrik yang wajib digunakan adalah:",
    "options": [
      "DCEN (Direct Current Electrode Negative)",
      "DCEP (Direct Current Electrode Positive)",
      "AC (Alternating Current / Arus Bolak-Balik)",
      "DC Arus Konstan Tanpa Frekuensi"
    ],
    "correct": 2,
    "hint": "Siklus positif pada arus AC berfungsi membersihkan lapisan oksida aluminium (cleaning action), dan siklus negatif mencairkan logam.",
    "explanation": "Pengelasan aluminium GTAW memerlukan arus AC (Alternating Current). Siklus polaritas positif memecah lapisan oksida aluminium (Al2O3) yang bersuhu lebur 2050°C, sementara siklus negatif memberikan penetrasi cairan las."
  },
  {
    "id": 22,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Proses pengisian gas pelindung inert (Back Purging) ke dalam bagian dalam rongga pipa stainless steel saat pengelasan akar (root) bertujuan:",
    "options": [
      "Mencegah oksidasi dan pembentukan kerak \"sugaring\" pada bagian dalam tembusan akar las",
      "Mempercepat pendinginan air pada pipa",
      "Meningkatkan tekanan gas di dalam pipa agar meledak",
      "Menghilangkan kebutuhan juru las memakai topeng kedok"
    ],
    "correct": 0,
    "hint": "Stainless steel panas sangat peka bereaksi dengan oksigen di dalam rongga pipa membentuk oksidasi kasar seperti gula terbakar (sugaring).",
    "explanation": "Back purging dengan gas Argon murni mengusir oksigen dari bagian dalam pipa, menghasilkan penembusan akar (root pass) yang halus, bersih, tahan korosi, dan bebas dari cacat kristalisasi oksida (sugaring)."
  },
  {
    "id": 23,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Posisi pengelasan pipa 2G (Pipe Horizontal) memiliki konfigurasi sumbu pipa yang berada pada posisi:",
    "options": [
      "Sumbu pipa vertikal tegak, dan juru las mengelas jalur sambungan secara horizontal",
      "Sumbu pipa horizontal berputar bebas",
      "Sumbu pipa miring 45 derajat tetap",
      "Pipa digantung di langit-langit"
    ],
    "correct": 0,
    "hint": "Pada 2G pipa, pipa berdiri tegak lurus (vertikal) seperti tiang, jalur kampuh sambungannya melingkar mendatar.",
    "explanation": "Posisi 2G pipa adalah posisi di mana pipa dipasang dengan sumbu vertikal tetap (tegak lurus bumi), dan kampuh sambungan las berada pada bidang horizontal melingkar."
  },
  {
    "id": 24,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Pada sambungan las sudut (Fillet Weld), ukuran dimensi \"Throat\" (Tenggorokan Las) merujuk pada:",
    "options": [
      "Jarak terpendek dari akar sambungan (root) ke permukaan muka manik las",
      "Panjang total keseluruhan pelat baja",
      "Diameter kawat elektroda yang digunakan",
      "Lebar celah akar sambungan pelat tumpang"
    ],
    "correct": 0,
    "hint": "Throat adalah ketebalan kritis penentu kekuatan sambungan sudut fillet menahan beban geser.",
    "explanation": "Throat (tebal leher) pada fillet weld adalah jarak terpendek dari titik temu akar (root) hingga bidang muka las (weld face), yang menjadi parameter utama perhitungan kekuatan mekanis sambungan las sudut."
  },
  {
    "id": 25,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Fungsi utama pembuatan celah akar (Root Gap) pada persiapan sambungan alur (Groove Joint) adalah:",
    "options": [
      "Memberikan ruang bagi cairan elektroda untuk menembus penuh hingga dasar sambungan (complete root penetration)",
      "Membuat pelat mudah bergeser saat dipukul",
      "Mengurangi jumlah kawat las yang dibutuhkan",
      "Mencegah juru las menyalakan busur api"
    ],
    "correct": 0,
    "hint": "Tanpa celah akar (zero gap), cairan las sulit menembus ke sisi belakang pelat tebal.",
    "explanation": "Root gap (celah akar) selebar 2-3 mm disiapkan agar busur dan cairan logam elektroda dapat mencapai dasar celah kampuh dan meleburkan kedua sisi root face secara sempurna."
  },
  {
    "id": 26,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Tindakan yang benar sebelum melanjutkan pengelasan pada las ikat sementara (Tack Weld) adalah:",
    "options": [
      "Menggerinda kedua ujung tack weld hingga membentuk lereng landai (feathering) untuk memastikan fusi sempurna",
      "Membiarkan tack weld retak dan menimpanya langsung dengan amper tinggi",
      "Memukul tack weld dengan palu hingga terlepas",
      "Mengecat tack weld dengan cat primer merah"
    ],
    "correct": 0,
    "hint": "Ujung tack weld yang tebal dan bulat akan menimbulkan cacat kurang peleburan jika tidak ditiruskan (feathered) dengan gerinda.",
    "explanation": "Feathering (meniruskan kedua ujung tack weld dengan batu gerinda) memastikan busur lapisan utama (root pass) dapat melebur mulus menyatu dengan tack weld tanpa meninggalkan cacat lack of fusion atau porositas."
  },
  {
    "id": 27,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Suhu antar-lapisan (Interpass Temperature) maksimum pada baja paduan rendah tidak boleh dilewati karena:",
    "options": [
      "Suhu yang terlalu panas akan memperlambat pendinginan, memperbesar butir kristal, dan menurunkan ketangguhan (toughness)",
      "Membuat mesin las mati otomatis",
      "Mengubah elektroda menjadi cair di udara",
      "Menghilangkan sifat konduktor listrik pada kabel las"
    ],
    "correct": 0,
    "hint": "Pendinginan yang terlalu lama akibat interpass berlebih menyebabkan pembesaran butir struktur mikro baja.",
    "explanation": "Mempertahankan interpass temperature maksimum di bawah batas WPS (misal < 250°C) mencegah pertumbuhan butir kasar pada HAZ dan menjaga ketahanan impak serta kekuatan luluh logam las."
  },
  {
    "id": 28,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Fenomena penyimpangan busur las dari jalurnya akibat gaya medan magnetik yang tidak seimbang di sekitar benda kerja disebut:",
    "options": [
      "Magnetic Arc Blow",
      "Thermal Shock",
      "Eddy Current",
      "Corona Discharge"
    ],
    "correct": 0,
    "hint": "Sering terjadi saat mengelas arus DC di dekat sudut benda kerja atau ujung pelat baja feromagnetik.",
    "explanation": "Arc Blow terjadi akibat medan magnetik asimetris saat arus DC mengalir melalui baja feromagnetik, membelokkan busur las ke arah samping dan menimbulkan spatter berlebih serta kurang fusi."
  },
  {
    "id": 29,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Cara efektif untuk mengatasi gangguan \"Magnetic Arc Blow\" saat mengelas baja dengan arus DC adalah:",
    "options": [
      "Beralih ke arus bolak-balik (AC), memperpendek panjang busur, atau memindahkan posisi klem massa",
      "Menaikkan amper ke kapasitas maksimum",
      "Menambah panjang busur listrik setinggi 20 mm",
      "Menyiram benda kerja dengan air dingin"
    ],
    "correct": 0,
    "hint": "Arus AC tidak membentuk medan magnet terarah tetap, dan busur pendek meminimalkan pembelokan busur.",
    "explanation": "Mengganti mesin ke mode AC, memperpendek arc length, melilitkan kabel massa di sekeliling benda kerja, atau mengelas menjauhi arah klem massa adalah solusi standar industri mengatasi arc blow."
  },
  {
    "id": 30,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Uji Tak Rusak (Non-Destructive Testing / NDT) yang menggunakan cairan zat pewarna kapiler untuk mendeteksi retak terbuka di permukaan logam las adalah:",
    "options": [
      "Liquid Penetrant Testing (PT / DPT)",
      "Radiographic Testing (RT)",
      "Ultrasonic Testing (UT)",
      "Hardness Testing"
    ],
    "correct": 0,
    "hint": "Menggunakan semprotan cairan merah peresap (penetrant), cairan pembersih (cleaner), dan cairan pengembang putih (developer).",
    "explanation": "Liquid Penetrant Testing (Dye Penetrant / PT) memanfaatkan daya kapilaritas cairan penetran berwarna terang untuk meresap ke dalam celah retak permukaan, kemudian ditarik keluar oleh developer bubuk putih."
  },
  {
    "id": 31,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Metode pengujian NDT yang paling efektif untuk mendeteksi cacat internal di dalam ketebalan logam las menggunakan gelombang suara frekuensi tinggi adalah:",
    "options": [
      "Ultrasonic Testing (UT)",
      "Visual Testing (VT)",
      "Liquid Penetrant Testing (PT)",
      "Spark Testing"
    ],
    "correct": 0,
    "hint": "Memanfaatkan pantulan pulsa gelombang ultrasonik (2-10 MHz) yang ditampilkan pada layar osiloskop instrumen.",
    "explanation": "Ultrasonic Testing (UT) menembakkan gelombang suara frekuensi tinggi melalui probe transduser; pantulan gema gelombang mendeteksi kedalaman, ukuran, dan orientasi cacat internal seperti lack of fusion atau retak."
  },
  {
    "id": 32,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Dokumen tertulis resmi yang berisi catatan data riil hasil uji mekanik (tarik, tekuk, impak) untuk membuktikan bahwa suatu prosedur pengelasan memenuhi standar kode konstruksi disebut:",
    "options": [
      "PQR (Procedure Qualification Record)",
      "WPS (Welding Procedure Specification)",
      "MTC (Mill Test Certificate)",
      "Inspection Release Note"
    ],
    "correct": 0,
    "hint": "PQR adalah dokumen induk hasil pengujian laboratorium nyata yang menjadi dasar penyusunan WPS operasional.",
    "explanation": "PQR (Procedure Qualification Record) mencatat seluruh variabel aktual pengelasan sampel uji (kupon) dan hasil uji laboratorium mekanik (tensile, bend, impact) sebagai bukti legalitas validasi WPS."
  },
  {
    "id": 33,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Kode elektroda AWS ER70S-6 pada kawat las GMAW (MIG/MAG) memiliki arti huruf \"S\" dan angka \"6\":",
    "options": [
      "\"S\" = Solid Wire (kawat pejal), \"6\" = tingkat penambahan deoksidator silikon dan mangan tinggi",
      "\"S\" = Stainless Steel, \"6\" = diameter 6 mm",
      "\"S\" = Soft Iron, \"6\" = voltase 6 Volt",
      "\"S\" = Shielded, \"6\" = panjang 6 meter"
    ],
    "correct": 0,
    "hint": "ER = Electrode / Rod, 70 = 70.000 psi kuat tarik, S = Solid bare wire, 6 = komposisi kimiawi Si/Mn deoxidizer.",
    "explanation": "ER70S-6 adalah kawat las solid baja karbon yang mengandung deoksidator Silikon (Si) dan Mangan (Mn) tinggi untuk meredam pembentukan porositas saat mengelas pelat yang sedikit berkarat atau kotor."
  },
  {
    "id": 34,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Cacat tembus jebol (Burn-through) pada pengelasan akar pelat tipis biasanya diakibatkan oleh:",
    "options": [
      "Arus (amperage) terlalu tinggi dan kecepatan gerak las (travel speed) terlalu lambat",
      "Gas argon yang terlalu dingin",
      "Kawat las terlalu besar diameternya",
      "Klem massa arde dipasang terlalu kuat"
    ],
    "correct": 0,
    "hint": "Masukan panas berlebihan melelehkan seluruh dasar celah hingga logam cair ambrol meninggalkan lubang menganga.",
    "explanation": "Burn-through terjadi akibat masukan panas (heat input) berlebihan saat root pass—kombinasi amper terlalu besar, root gap terlalu renggang, dan kecepatan gerak terlalu lambat pada logam berpenampang tipis."
  },
  {
    "id": 35,
    "category": "Technical Welding",
    "catColor": "bg-blue-100 text-blue-700",
    "question": "Posisi pengelasan pipa 6GR berbeda dengan posisi 6G standar karena adanya penambahan:",
    "options": [
      "Cincin cincin penghalang pembatas (Restriction Ring) yang membatasi ruang gerak tangan juru las di dekat sambungan",
      "Dua buah elektroda yang dinyalakan bersamaan",
      "Sistem pendingin air bertekanan tinggi",
      "Motor pemutar otomatis berkecepatan konstan"
    ],
    "correct": 0,
    "hint": "Huruf \"R\" pada 6GR berarti \"Restriction\" (hambatan/rintangan fisik pelat penghalang cincin).",
    "explanation": "Posisi 6GR (Restriction Ring) adalah kualifikasi khusus struktur T-Y-K lepas pantai (offshore), di mana pelat rintangan dipasang 12,5 mm di dekat sambungan pipa untuk mensimulasikan ruang gerak sempit."
  },
  {
    "id": 36,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the correct English term for \"palu terak\" used to chip away solidified flux slag after completing a weld bead?",
    "options": [
      "Ball-peen hammer",
      "Chipping hammer",
      "Sledge hammer",
      "Claw hammer"
    ],
    "correct": 1,
    "hint": "Kata dasarnya adalah \"chip\" (mengelupas/memecah kerak kecil).",
    "explanation": "Chipping hammer (palu ketok terak) memiliki ujung runcing dan ujung pipih pahat untuk membersihkan terak sisa pembakaran fluks pada las SMAW atau FCAW."
  },
  {
    "id": 37,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "On an engineering blueprint and welding drawing, what does the technical abbreviation \"WPS\" stand for?",
    "options": [
      "Welding Procedure Specification",
      "Weld Position Standard",
      "Workshop Production Schedule",
      "Wire Processing System"
    ],
    "correct": 0,
    "hint": "Dokumen panduan parameter resmi yang mengatur voltase, amper, kawat las, dan suhu kerja.",
    "explanation": "WPS (Welding Procedure Specification) adalah dokumen acuan tertulis yang merinci seluruh parameter teknis pengelasan yang telah diuji dan disetujui (PQR) untuk memastikan kualitas hasil sambungan."
  },
  {
    "id": 38,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "\"Adjust the wire feed speed and ensure proper gas flow rate before striking the arc.\" — Kalimat instruksi tersebut paling sering digunakan pada proses:",
    "options": [
      "Manual Oxy-Acetylene Cutting (OAW)",
      "Gas Metal Arc Welding (GMAW / MIG)",
      "Shielded Metal Arc Welding (SMAW)",
      "Submerged Arc Welding (SAW)"
    ],
    "correct": 1,
    "hint": "Kata kunci: \"wire feed speed\" (kecepatan pengumpanan kawat gulung otomatis) dan \"gas flow rate\".",
    "explanation": "Instruksi \"wire feed speed\" dan \"gas flow rate\" sangat spesifik untuk mesin las semi-otomatis GMAW (MIG/MAG) atau FCAW yang menggunakan feeder kawat roll."
  },
  {
    "id": 39,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the Indonesian equivalent for the industrial safety instruction: \"Inspect the ground clamp connection to prevent stray current\"?",
    "options": [
      "Periksa regulator gas untuk mencegah kebocoran selang",
      "Periksa koneksi klem massa (ground clamp) untuk mencegah arus liar",
      "Ganti stang las elektroda agar tidak terjadi sengatan listrik",
      "Matikan sakelar utama ketika kabel las mulai memanas"
    ],
    "correct": 1,
    "hint": "\"Ground clamp\" = klem massa (arde/penjepit ke benda kerja), \"stray current\" = arus bocor/arus liar.",
    "explanation": "Ground clamp adalah penjepit massa ke logam kerja. Sambungan yang longgar dapat memicu percikan berbahaya, panas berlebih, dan arus liar (stray current) yang merusak mesin las."
  },
  {
    "id": 40,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "Which English phrase correctly describes the defect where the weld metal fails to penetrate completely through the root of the joint?",
    "options": [
      "Excessive Spatter",
      "Incomplete Root Penetration",
      "Root Concavity",
      "Overfill Crown"
    ],
    "correct": 1,
    "hint": "Perhatikan kata \"penetrate\" dan bagian akar sambungan \"root\".",
    "explanation": "Incomplete Root Penetration (kurang penembusan akar) terjadi ketika logam las tidak menembus hingga bagian dasar/akar celah sambungan."
  },
  {
    "id": 41,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the English term for the handheld power tool used with an abrasive disc to clean bevel edges and grind weld caps?",
    "options": [
      "Angle Grinder",
      "Bench Drill Press",
      "Hydraulic Guillotine Shear",
      "Band Saw Machine"
    ],
    "correct": 0,
    "hint": "Alat tangan listrik berputar kencang dengan piringan batu gerinda abrasif 4 atau 7 inci.",
    "explanation": "Angle grinder (mesin gerinda tangan) adalah perkakas utama bengkel las untuk membersihkan karat, membuat kampuh bevel, memotong logam, dan meratakan manik las."
  },
  {
    "id": 42,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "On a standard AWS welding symbol, what does a flag symbol (⚑) placed at the intersection of the reference line and arrow line indicate?",
    "options": [
      "Field Weld (The weld must be made on site / field, not in the fabrication workshop)",
      "The weld requires immediate fire extinguisher stand-by",
      "The weld is rejected by quality control",
      "The weld must be painted with country national flag colors"
    ],
    "correct": 0,
    "hint": "Simbol bendera kecil menandakan pengelasan dikerjakan di lokasi proyek luar (site/lapangan).",
    "explanation": "Simbol bendera hitam pada garis referensi gambar teknik menunjukkan \"Field Weld\" (Las Lapangan), artinya komponen dirakit dan dilas di lokasi konstruksi site, bukan di dalam bengkel fabrikasi."
  },
  {
    "id": 43,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "On a welding symbol, a small circle (○) located at the junction where the arrow line meets the reference line signifies:",
    "options": [
      "Weld All Around (The joint must be welded completely around the entire perimeter of the connection)",
      "Drill a round hole before welding",
      "Use a circular non-consumable electrode",
      "Circular weld pool inspection required"
    ],
    "correct": 0,
    "hint": "Lingkaran pada sambungan garis panah berarti las keliling di sepanjang keliling bidang tumpang.",
    "explanation": "Simbol lingkaran kecil (Weld-All-Around) memerintahkan juru las untuk mengelas penuh mengelilingi seluruh kontur sambungan komponen secara tertutup."
  },
  {
    "id": 44,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the meaning of the workshop instruction: \"Preheat the base metal to 150°C and check with a temperature-indicating crayon (Tempilstik)\"?",
    "options": [
      "Panaskan logam dasar hingga 150°C dan periksa suhunya menggunakan kapur indikator suhu (Tempilstik)",
      "Warnai logam dengan krayon merah agar tidak berkarat",
      "Dinginkan logam hingga 150°C di dalam lemari es",
      "Ukur ketebalan pelat menggunakan mistar krayon"
    ],
    "correct": 0,
    "hint": "Tempilstik adalah kapur khusus yang meleleh tepat saat permukaan logam mencapai suhu leleh kimianya.",
    "explanation": "Tempilstik (temperature-indicating crayon) adalah kapur pengukur suhu permukaan praktis; coretan kapur akan mencair secara visual saat temperatur baja mencapai nilai derajat yang tertera pada kemasan kapur."
  },
  {
    "id": 45,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the correct English term for the specialized precision measuring tool used to measure fillet weld leg length and reinforcement height?",
    "options": [
      "Welding Gauge (Bridge Cam Gauge / Fillet Gauge)",
      "Micrometer Outside",
      "Spirit Level",
      "Measuring Tape"
    ],
    "correct": 0,
    "hint": "Alat ukur baja stainless dengan skala pengukur tebal leher (throat) dan tinggi penembusan/reinforcement.",
    "explanation": "Welding gauge (seperti Bridge Cam Gauge atau Fillet Weld Gauge) dirancang khusus untuk mengukur tinggi reinforcement, ukuran kaki fillet (leg size), kedalaman undercut, dan sudut bevel secara presisi."
  },
  {
    "id": 46,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What does the blueprint drawing dimension note \"6 - 50 / 100\" beside a fillet weld symbol mean?",
    "options": [
      "Fillet weld with 6 mm size, 50 mm weld bead length, and 100 mm center-to-center pitch distance (intermittent weld)",
      "6 welds with 50 amperes and 100 volts",
      "6 mm diameter pipe with 50 kg weight",
      "Plate thickness 6 mm with 50 bevel angle"
    ],
    "correct": 0,
    "hint": "Ini adalah dimensi pengelasan selang-seling (intermittent fillet weld): Ukuran las - Panjang las / Jarak titik pusat antar las (Pitch).",
    "explanation": "Notasi tersebut menunjukkan las sudut intermittent (berselang): ukuran kaki las 6 mm, panjang tiap manik las 50 mm, dan jarak antar pusat segmen las (pitch) adalah 100 mm."
  },
  {
    "id": 47,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the Indonesian meaning of the blueprint abbreviation \"N.D.T. REQ'D: 100% R.T.\"?",
    "options": [
      "Wajib Uji Tak Rusak: 100% Pemeriksaan Radiografi (Radiographic Testing / X-ray)",
      "Tidak perlu pemeriksaan sama sekali",
      "Wajib uji tarik di laboratorium 100 kali",
      "Pengecatan tahan karat 100 lapis"
    ],
    "correct": 0,
    "hint": "N.D.T = Non-Destructive Testing, R.T = Radiographic Testing (pemeriksaan foto rontgen sinar-X / gamma).",
    "explanation": "Catatan tersebut menginstruksikan bahwa seluruh panjang sambungan las (100%) wajib diinspeksi secara internal menggunakan metode Uji Tak Rusak Radiografi (Radiographic X-Ray Film)."
  },
  {
    "id": 48,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "Which tool is used to hold and clamp two pipe ends in perfect concentric alignment before tack welding?",
    "options": [
      "Pipe Alignment Clamp (External / Internal Line-up Clamp)",
      "Bench Vise",
      "Pipe Wrench",
      "Hydraulic Jack"
    ],
    "correct": 0,
    "hint": "Klem berbentuk sangkar melingkar yang mengikat kedua ujung pipa agar lurus sejajar (fit-up aligned).",
    "explanation": "Pipe alignment clamp (klem penjepit pipa) digunakan untuk menyelaraskan kedua ujung pipa, memastikan keseragaman celah akar (root gap) dan mencegah ketidaksejajaran internal (hi-lo misalignment)."
  },
  {
    "id": 49,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "Translate the following workshop command: \"Ensure the travel speed is consistent to avoid excessive heat input and warping of the plate.\"",
    "options": [
      "Pastikan kecepatan jalan pengelasan konstan agar tidak terjadi masukan panas berlebih dan distorsi pelat melengkung",
      "Jalankan mesin secepat mungkin agar pelat tidak meleleh",
      "Ukur jarak perjalanan kendaraan pengangkut pelat",
      "Panaskan pelat hingga melengkung sebelum dilas"
    ],
    "correct": 0,
    "hint": "\"Travel speed\" = kecepatan gerak ayunan las, \"warping\" = distorsi melengkung/deformasi.",
    "explanation": "Instruksi tersebut mengingatkan welder agar menjaga kecepatan tangan tetap stabil demi mengontrol heat input dan mencegah pelat baja melengkung akibat pemuaian panas yang tidak merata."
  },
  {
    "id": 50,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the correct English term for \"kawat las tahan karat (stainless steel)\" used for welding AISI 304 material?",
    "options": [
      "Stainless Steel Filler Wire / Electrode (AWS ER308L / E308L)",
      "Mild Steel Electrode (E6013)",
      "Hardfacing Rod",
      "Cast Iron Rod"
    ],
    "correct": 0,
    "hint": "Material stainless steel seri 304 memerlukan bahan tambah las seri 308 dengan kadar karbon rendah (L).",
    "explanation": "Untuk mengelas baja tahan karat AISI 304, filler metal standar internasional yang digunakan adalah ER308L (TIG/MIG) atau E308L (SMAW), di mana \"L\" menandakan Extra Low Carbon pencegah presipitasi karbida."
  },
  {
    "id": 51,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What does the term \"Feathering the tack welds\" mean in international piping workshop practice?",
    "options": [
      "Grinding the start and stop ends of each tack weld into a thin taper slope so the root pass blends smoothly",
      "Attaching bird feathers to the welding gun",
      "Cooling the tack welds with compressed air",
      "Painting tack welds with yellow primer"
    ],
    "correct": 0,
    "hint": "Meniruskan/melandaikan ujung las ikat dengan batu gerinda tipis.",
    "explanation": "Feathering tack welds adalah teknik menggerinda kedua ujung las ikat sementara menjadi tirus miring seperti bulu agar kawat las lapisan pertama dapat menyatu tembus tanpa membentuk lubang atau ketebalan ganda."
  },
  {
    "id": 52,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the English name for the consumable copper tube inside a GMAW (MIG) gun nozzle that transfers electrical current to the moving wire?",
    "options": [
      "Contact Tip",
      "Diffuser Nozzle",
      "Insulator Sleeve",
      "Liner Conduit"
    ],
    "correct": 0,
    "hint": "Ujung tabung tembaga berlubang presisi tempat keluarnya kawat las di dalam nozzle stang MIG.",
    "explanation": "Contact Tip adalah komponen tembaga habis pakai pada ujung torch GMAW yang berfungsi mentransmisikan arus listrik las langsung ke kawat las saat kawat didorong keluar feeder."
  },
  {
    "id": 53,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "Translate to Indonesian: \"Purge the oxygen from the stainless steel pipe line until the oxygen analyzer reads below 50 ppm.\"",
    "options": [
      "Kuras oksigen dari dalam pipa stainless steel dengan gas pelindung hingga alat ukur oksigen menunjukkan di bawah 50 ppm",
      "Isi pipa dengan oksigen bertekanan 50 bar",
      "Bakar bagian dalam pipa hingga kadar gas mencapai 50 ppm",
      "Cuci pipa menggunakan air sabun 50 liter"
    ],
    "correct": 0,
    "hint": "\"Purge\" = menguras/mengusir gas pengotor, \"ppm\" = parts per million (kadar kemurnian).",
    "explanation": "Instruksi pembersihan gas (purging) untuk pipa stainless steel kritis mensyaratkan kadar oksigen sisa di dalam rongga pipa di bawah 50 ppm agar penetrasi akar las tidak mengalami oksidasi korosi."
  },
  {
    "id": 54,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the meaning of the safety sign: \"DANGER: HIGH VOLTAGE - LOCKOUT BEFORE SERVICING\"?",
    "options": [
      "BAHAYA: TEGANGAN TINGGI - GEMBOK PENGAMAN SAKELAR SEBELUM MELAKUKAN PERBAIKAN",
      "Hati-hati lantai licin dekat mesin las",
      "Dilarang membawa kunci gembok ke workshop",
      "Peringatan suara bising tinggi"
    ],
    "correct": 0,
    "hint": "Prosedur LOTO (Lockout / Tagout) mematikan dan menggembok sumber energi listrik utama sebelum teknisi memperbaiki mesin.",
    "explanation": "Tanda keselamatan tersebut mewajibkan prosedur Lockout/Tagout (LOTO) yaitu memutus aliran listrik panel dan memasang gembok pengaman fisik sebelum melakukan servis pada peralatan bertegangan tinggi."
  },
  {
    "id": 55,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the English term for \"lapisan penutup paling atas pada manik las pengelasan alur\"?",
    "options": [
      "Capping Pass (Cover Pass / Cap Pass)",
      "Root Pass",
      "Hot Pass",
      "Tack Pass"
    ],
    "correct": 0,
    "hint": "Lapisan mahkota paling akhir yang menutup permukaan sambungan las.",
    "explanation": "Capping pass (atau cover pass) adalah lapisan las penutup paling akhir yang tampak di permukaan, berfungsi melengkapi ketebalan pengisian dan memberikan penguatan (reinforcement) yang rapi seragam."
  },
  {
    "id": 56,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What does the term \"Root Face\" (Land) represent on a V-groove weld joint preparation?",
    "options": [
      "The flat, un-beveled vertical portion of the groove edge at the root of the joint",
      "The outer surface face of the plate",
      "The width of the weld cap",
      "The angle of the grinding disc"
    ],
    "correct": 0,
    "hint": "Bagian bidang vertikal datar tegak (tanpa miring) di ujung paling bawah bibir alur pelat (biasanya setebal 1,5 - 2 mm).",
    "explanation": "Root face (land) adalah bagian datar vertikal pada ujung bawah kampuh las yang berfungsi menahan busur api agar tidak langsung tembus jebol saat juru las melakukan root pass."
  },
  {
    "id": 57,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the correct English term for \"alat pembersih sikat kawat baja\" used to remove light surface rust and slag?",
    "options": [
      "Wire Brush",
      "Paint Roller",
      "Flap Disc",
      "File Rasp"
    ],
    "correct": 0,
    "hint": "Sikat bergagang kayu atau besi dengan bulu kawat baja karbon atau stainless steel.",
    "explanation": "Wire brush (sikat kawat) adalah perkakas manual esensial untuk membersihkan sisa terak halus, karat tipis, dan kotoran debu sebelum dan sesudah setiap lintasan pengelasan."
  },
  {
    "id": 58,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "Translate the instruction: \"Keep the welding cables straight and uncoiled during high-amperage welding to prevent inductance overheating.\"",
    "options": [
      "Luruskan kabel las dan jangan dibiarkan tergulung saat mengelas amper tinggi agar kabel tidak panas akibat induksi listrik",
      "Gulung kabel las sekencang mungkin di tiang besi",
      "Tarik kabel las hingga putus saat mengelas",
      "Ikat kabel las bersama selang gas oksigen"
    ],
    "correct": 0,
    "hint": "Kabel las beraliran arus besar yang digulung melingkar akan bekerja seperti kumparan trafo induksi penghasil panas berlebih.",
    "explanation": "Menguraikan gulungan kabel las mencegah efek induktansi elektromagnetik yang dapat menyebabkan insulasi kabel meleleh dan menurunkan efisiensi voltase pada ujung stang las."
  },
  {
    "id": 59,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the English term for \"kacamata pelindung mata dari geram gerinda dan debu bengkel\"?",
    "options": [
      "Safety Glasses / Clear Impact Goggles",
      "Welding Mask Shade #12",
      "Sunglasses",
      "Magnifying Glass"
    ],
    "correct": 0,
    "hint": "Kacamata polikarbonat bening tahan benturan serpihan gram besi gerinda.",
    "explanation": "Safety glasses / clear goggles adalah APD pelindung mata standar berlabel ANSI Z87.1 untuk melindungi mata dari percikan serpihan gram logam panas saat menggerinda atau membersihkan terak."
  },
  {
    "id": 60,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What does the term \"Crater\" mean at the end of a completed weld bead?",
    "options": [
      "The depression or cavity left at the termination point of a weld bead where the arc was extinguished",
      "A hole drilled intentionally through the base metal",
      "The spark produced during grinding",
      "The gas cylinder pressure valve"
    ],
    "correct": 0,
    "hint": "Cekungan kubangan di titik ujung akhir manik las tempat busur listrik dimatikan.",
    "explanation": "Crater adalah cekungan di ujung akhir jalur las akibat penyusutan cairan saat busur api diputus tiba-tiba. Juru las wajib mengisi penuh kawah kawah (crater filling) agar tidak timbul retak bintang (crater crack)."
  },
  {
    "id": 61,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What does \"Weaving\" technique mean in technical welding vocabulary?",
    "options": [
      "Moving the electrode with a side-to-side oscillating pattern across the joint to deposit a wider weld bead",
      "Sewing leather protective jackets",
      "Rolling welding wire onto a spool",
      "Mixing shielding gases manually"
    ],
    "correct": 0,
    "hint": "Gerakan mengayunkan elektroda ke kiri dan ke kanan (zig-zag / bulan sabit) untuk menghasilkan manik las yang lebar.",
    "explanation": "Weaving (teknik ayunan) adalah gerakan osilasi transversal elektroda melintasi celah kampuh untuk mengontrol masukan panas dan membentuk manik las penutup yang rata dan lebar pada posisi vertikal atau horizontal."
  },
  {
    "id": 62,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the meaning of \"Stringer Bead\" compared to a Weave Bead?",
    "options": [
      "A straight, narrow weld bead made with little or no side-to-side electrode oscillation",
      "A weld bead tied with nylon strings",
      "A weld made without electrical current",
      "A circular pipe weld made underwater"
    ],
    "correct": 0,
    "hint": "Manik las lurus tanpa ayunan menyamping, meminimalkan masukan panas pada baja paduan.",
    "explanation": "Stringer bead adalah teknik penarikan elektroda secara lurus searah tanpa ayunan menyamping, sangat dianjurkan untuk stainless steel demi menjaga masukan panas (heat input) serendah mungkin."
  },
  {
    "id": 63,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the correct English term for \"alat penyedot asap beracun dan debu pengelasan\"?",
    "options": [
      "Fume Extraction System / Fume Extractor",
      "Pneumatic Drill",
      "Air Conditioner Compressor",
      "Dust Collector Blower"
    ],
    "correct": 0,
    "hint": "Sistem pipa belalai hisap yang menyedot partikel asap las berbahaya langsung dari sumbernya.",
    "explanation": "Fume extractor adalah perangkat ventilasi hisap lokal (Local Exhaust Ventilation) dengan filter HEPA khusus untuk menangkap partikel gas beracun dan uap logam las sebelum terhirup pernapasan juru las."
  },
  {
    "id": 64,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "Translate: \"Verify the bevel angle is precisely 37.5 degrees with a protractor before assembling the pipe joints.\"",
    "options": [
      "Periksa sudut kemiringan kampuh bevel tepat 37,5 derajat dengan busur derajat sebelum menyambung pipa",
      "Potong pipa sepanjang 37,5 meter menggunakan gergaji",
      "Panaskan pipa hingga 37,5 derajat Celcius",
      "Isi pipa dengan 37,5 liter air bertekanan"
    ],
    "correct": 0,
    "hint": "37,5° adalah sudut bevel standar pipa API untuk menghasilkan sudut total kampuh V sebesar 75° saat disatukan.",
    "explanation": "Instruksi inspeksi persiapan sambungan untuk memastikan sudut bevel masing-masing pipa tepat 37,5° (sudut total kampuh V 75°) dengan alat ukur protractor agar penetrasi akar las presisi sesuai WPS."
  },
  {
    "id": 65,
    "category": "Workshop English",
    "catColor": "bg-green-100 text-green-700",
    "question": "What is the term for \"selisih perbedaan tinggi dinding bagian dalam antara dua pipa yang disambung\"?",
    "options": [
      "Hi-Lo (Internal Misalignment)",
      "Bevel Slope",
      "Root Gap Offset",
      "Crown Elevation"
    ],
    "correct": 0,
    "hint": "Dikenal dengan istilah \"Hi-Lo\" (tinggi-rendah) ketidaksejajaran diameter dalam dinding pipa.",
    "explanation": "Hi-Lo (internal misalignment) adalah ketidakrataan bidang dalam antara dua ujung pipa yang disambung; toleransi maksimum biasanya dibatasi di bawah 1,5 mm agar tidak menghambat aliran fluida dan tidak memicu lack of penetration."
  },
  {
    "id": 66,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Tingkat kegelapan kaca filter (Shade Number) berapakah yang direkomendasikan standar ANSI Z87.1 untuk proses SMAW dengan arus kerja 100 – 150 Ampere?",
    "options": [
      "Shade #5 - #6",
      "Shade #8",
      "Shade #10",
      "Shade #14"
    ],
    "correct": 2,
    "hint": "Shade 5 untuk pemotongan oksi-asetilen, shade 8 untuk arus rendah < 75A, dan shade 10 adalah standar umum 100-150A.",
    "explanation": "Standar ANSI / OSHA menetapkan filter shade #10 untuk pengelasan busur listrik elektroda terbungkus (SMAW) pada rentang arus 75 hingga 150 Ampere guna melindungi retina dari sinar ultraviolet dan inframerah."
  },
  {
    "id": 67,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Manakah tindakan keselamatan yang BENAR saat memindahkan dan menyimpan tabung gas bertekanan tinggi (Argon, CO2, Oksigen) di area workshop?",
    "options": [
      "Menggelindingkan tabung secara horizontal di atas lantai agar lebih cepat dipindahkan",
      "Menyimpan tabung dalam posisi berdiri tegak dan diikat/dirantai kuat pada rak atau dinding pengaman",
      "Membuka tutup pelindung katup (safety valve cap) saat tabung diangkat dengan forklift",
      "Menempatkan tabung gas berdampingan tepat di sebelah sumber percikan api las agar selang tidak terlalu panjang"
    ],
    "correct": 1,
    "hint": "Tabung bertekanan tidak boleh roboh atau terkena benturan katupnya karena dapat melesat seperti roket.",
    "explanation": "Tabung gas bertekanan wajib disimpan dalam posisi tegak vertikal, diikat rantai pengaman, tutup pelindung terpasang saat tidak digunakan, dan dijauhkan minimal 6 meter dari sumber panas atau percikan api terbuka."
  },
  {
    "id": 68,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Kondisi iritasi mata akibat paparan langsung radiasi sinar ultraviolet (UV) busur las tanpa kacamata pelindung disebut secara medis:",
    "options": [
      "Astigmatisme Akut",
      "Photokeratitis / Arc Eye (Flash Burn)",
      "Katarak Traumatik",
      "Presbiopia"
    ],
    "correct": 1,
    "hint": "Dikenal di kalangan welder dengan istilah \"Welder's Flash\" atau rasa berpasir terbakar pada kornea mata.",
    "explanation": "Arc Eye atau Welder's Flash (Photokeratitis) adalah luka bakar radiasi UV pada kornea mata. Gejalanya mata merah, berair, sangat perih dan terasa seperti ada pasir di mata beberapa jam setelah terpapar."
  },
  {
    "id": 69,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "When welding inside a \"Confined Space\" (tangki tertutup, ruang sempit kapal), what critical safety measure is mandatory?",
    "options": [
      "Use only 100% pure oxygen ventilation to keep workers alert",
      "Continuous atmospheric gas testing, proper exhaust ventilation, and a designated standby safety observer outside",
      "Working alone in silence to avoid disturbing other personnel",
      "Switching off all lighting to prevent short circuits"
    ],
    "correct": 1,
    "hint": "Ruang terbatas rentan penumpukan gas beracun dan kekurangan oksigen, sehingga perlu pemantauan udara dan pengawas di pintu masuk.",
    "explanation": "Pekerjaan di confined space mewajibkan tes udara berkala (kadar O2, LEL, H2S/CO), ventilasi blower keluar masuk udara, izin kerja ruang terbatas, dan petugas standby (safety watcher) di luar."
  },
  {
    "id": 70,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Bahan APD sarung tangan dan apron juru las yang paling aman terhadap percikan logam cair dan konduksi panas adalah terbuat dari:",
    "options": [
      "Kulit split sapi asli tahan panas (Heavy Duty Split Cowhide Leather)",
      "Kain nilon sintetis elastis",
      "Karet sintetis PVC tahan air",
      "Kain poliester rajut tebal"
    ],
    "correct": 0,
    "hint": "Bahan sintetis (nilon/poliester) akan meleleh saat terkena percikan panas dan menempel pada kulit, sehingga bahan alami kulit hewan adalah standar utama.",
    "explanation": "Bahan kulit asli (cowhide leather) tidak mudah meleleh atau terbakar, memberikan isolasi termal yang baik dan melindungi kulit tangan dari tetesan terak serta spatter bersuhu tinggi."
  },
  {
    "id": 71,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Berapakah batas aman kadar Oksigen (O2) di udara dalam ruang kerja terbatas (Confined Space) menurut standar K3 internasional?",
    "options": [
      "19,5% hingga 23,5%",
      "10% hingga 15%",
      "30% hingga 50%",
      "Tepat 100%"
    ],
    "correct": 0,
    "hint": "Di bawah 19,5% terjadi bahaya asfiksia lemas kekurangan oksigen, di atas 23,5% udara menjadi sangat mudah terbakar/meledak.",
    "explanation": "Standar OSHA menetapkan rentang aman kadar oksigen pernapasan di ruang terbatas adalah antara 19,5% (batas minimum pencegah sesak napas) dan 23,5% (batas maksimum pencegah pengayaan oksigen eksplosif)."
  },
  {
    "id": 72,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Mengapa tabung gas Asetilen (Acetylene) TIDAK BOLEH digunakan pada tekanan kerja regulator melebihi 15 psi (1 bar)?",
    "options": [
      "Gas asetilen menjadi sangat tidak stabil dan dapat meledak secara spontan akibat dekomposisi pada tekanan di atas 15 psi",
      "Membuat api las menjadi terlalu dingin",
      "Dapat membekukan selang karet",
      "Menyebabkan regulator mengeluarkan cairan minyak"
    ],
    "correct": 0,
    "hint": "Asetilen murni bertekanan bebas di atas 15 psi rentan mengalami reaksi eksotermik pelepasan atom yang memicu ledakan tanpa perlu pemicu api luar.",
    "explanation": "Asetilen (C2H2) pada tekanan bebas di atas 15 psi (103 kPa) sangat tidak stabil secara kimiawi dan dapat mengalami dekomposisi eksplosif hebat; di dalam tabung, asetilen dilarutkan dalam cairan aseton berpori agar aman."
  },
  {
    "id": 73,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Alat keselamatan yang dipasang pada selang atau regulator las gas Oksi-Asetilen untuk mencegah api merambat balik ke dalam tabung disebut:",
    "options": [
      "Flashback Arrestor",
      "Pressure Relief Valve",
      "Needle Valve",
      "Manometer Gauge"
    ],
    "correct": 0,
    "hint": "Alat penahan api balik dengan saringan logam berpori (flame arrestor filter) dan katup satu arah (check valve).",
    "explanation": "Flashback Arrestor adalah katup pengaman mutlak pada sistem gas oksi-asetilen yang mematikan dan memblokir rambatan lidah api balik (flashback) agar tidak meledakkan selang dan tabung gas."
  },
  {
    "id": 74,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Jenis alat pemadam api ringan (APAR) yang paling tepat untuk memadamkan kebakaran akibat korsleting peralatan listrik las adalah:",
    "options": [
      "APAR Karbon Dioksida (CO2) atau Dry Chemical Powder",
      "Air bertekanan tinggi",
      "Busa sabun cair (Foam water)",
      "Kain basah berlumpur"
    ],
    "correct": 0,
    "hint": "Kebakaran kelas C (kelistrikan) tidak boleh disiram air karena air menghantarkan listrik dan memicu sengatan maut.",
    "explanation": "Kebakaran instalasi listrik (Kelas C) wajib dipadamkan dengan APAR CO2 atau bubuk kimia kering (Dry Chemical) yang bersifat non-konduktif dan tidak merusak komponen elektronik mesin las."
  },
  {
    "id": 75,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Berapa jarak radius minimum pembersihan bahan-bahan yang mudah terbakar (kayu, bensin, kertas) di sekitar area pengelasan panas (Hot Work)?",
    "options": [
      "Minimal 35 kaki (10,7 meter) / 11 meter",
      "1 meter",
      "50 sentimeter",
      "Tidak perlu dibersihkan"
    ],
    "correct": 0,
    "hint": "Standar NFPA 51B menetapkan radius \"35-Foot Rule\" untuk area bebas bahan mudah terbakar.",
    "explanation": "Standar keselamatan kebakaran internasional (NFPA 51B) menetapkan aturan jarak 35 kaki (sekitar 11 meter) bebas dari semua material yang mudah terbakar di sekeliling titik pengelasan atau wajib ditutup selimut api (fire blanket)."
  },
  {
    "id": 76,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Berapa lama petugas pengawas api (Fire Watcher) wajib tetap berada di lokasi kerja setelah pengelasan selesai untuk memantau sisa bara api?",
    "options": [
      "Minimal 30 menit setelah pekerjaan las selesai",
      "1 menit saja",
      "Hanya sampai juru las mematikan mesin",
      "Langsung pulang bersama pekerja lain"
    ],
    "correct": 0,
    "hint": "Bara api terak spatter dapat membakar material tersembunyi secara lambat (smoldering fire) hingga puluhan menit setelah ditinggalkan.",
    "explanation": "Standar OSHA mewajibkan Fire Watcher standby melakukan pengawasan di lokasi minimal 30 hingga 60 menit setelah operasi Hot Work selesai guna memastikan tidak timbul bara api sekunder yang tersembunyi."
  },
  {
    "id": 77,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Bahaya paparan asap logam berat beracun \"Hexavalent Chromium\" (Cr VI) paling berisiko terjadi saat juru las mengelas material:",
    "options": [
      "Baja Tahan Karat (Stainless Steel) dan Paduan Nikel-Krom",
      "Baja Karbon Rendah",
      "Kayu Tripleks",
      "Tembaga Murni"
    ],
    "correct": 0,
    "hint": "Stainless steel mengandung kromium 18% yang pada suhu busur las teroksidasi menjadi senyawa karsinogenik Kromium Heksavalen.",
    "explanation": "Asap pengelasan stainless steel menghasilkan uap karsinogenik Hexavalent Chromium [Cr(VI)] yang berbahaya bagi paru-paru, sehingga wajib menggunakan masker respirator cartridge P100 atau PAPR."
  },
  {
    "id": 78,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Mengapa juru las dilarang keras memakai pakaian berbahan serat sintetis (seperti poliester, nilon, atau akrilik) saat bekerja?",
    "options": [
      "Kain sintetis sangat mudah meleleh saat terkena percikan spatter panas dan menempel erat membakar kulit daging",
      "Kain sintetis terlalu berat dipakai",
      "Kain sintetis memantulkan sinar X-ray",
      "Kain sintetis membuat elektroda cepat habis"
    ],
    "correct": 0,
    "hint": "Kain sintetis adalah turunan plastik yang akan mencair melekat pada luka bakar saat terkena percikan api.",
    "explanation": "Kain poliester dan nilon akan meleleh seketika saat terkena butiran spatter 1500°C, menempel pada pori-pori kulit dan menimbulkan luka bakar derajat tiga yang parah. Juru las wajib memakai katun 100% tebal (jeans/denim) atau kulit."
  },
  {
    "id": 79,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Metode yang aman dan benar untuk mendeteksi kebocoran gas pada sambungan selang regulator oksi-asetilen adalah:",
    "options": [
      "Mengoleskan larutan air sabun atau cairan pendeteksi kebocoran non-minyak pada sambungan",
      "Menyulutkan korek api gas di sekitar selang",
      "Mendengarkan dengan telinga sedekat mungkin tanpa kacamata",
      "Mencium bau gas langsung dengan hidung menempel di tabung"
    ],
    "correct": 0,
    "hint": "Busa sabun akan menggelembung jika terdapat kebocoran gas bertekanan tanpa risiko pemicu api.",
    "explanation": "Pemeriksaan kebocoran gas wajib menggunakan larutan busa air sabun bebas minyak (leak test solution) yang akan berbusa di titik kebocoran. Dilarang keras menggunakan nyala api terbuka atau minyak/gemuk pada tabung oksigen."
  },
  {
    "id": 80,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Tegangan tanpa beban (Open Circuit Voltage / OCV) pada mesin las stik SMAW yang berkisar 60 - 80 Volt berbahaya karena:",
    "options": [
      "Dapat menimbulkan sengatan listrik fatal (electrocution) jika juru las menyentuh elektroda dalam kondisi tubuh berkeringat atau basah",
      "Dapat membuat kawat las meledak seketika",
      "Membuat kabel mesin las terbakar dalam 1 detik",
      "Menghilangkan radiasi sinar ultraviolet"
    ],
    "correct": 0,
    "hint": "Keringat tubuh mengandung garam yang menjadi konduktor listrik kuat; tegangan 60V AC/DC cukup untuk menghentikan denyut jantung.",
    "explanation": "OCV (tegangan saat mesin hidup tapi belum mengelas) sebesar 60-80V dapat mengalirkan arus listrik mematikan melalui tubuh manusia jika sarung tangan basah kuyup oleh keringat atau bekerja di tempat lembab tanpa isolasi."
  },
  {
    "id": 81,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Ujung ulir drat pada tabung gas bahan bakar yang mudah terbakar (seperti Asetilen dan LPG) dibuat dengan ulir kiri (Left-Hand Thread) dengan tujuan:",
    "options": [
      "Mencegah kesalahan pemasangan regulator gas oksigen atau gas inert yang berulir kanan ke tabung gas bahan bakar",
      "Agar regulator lebih cepat dipasang teknisi kidal",
      "Membuat tabung tidak bisa dibuka orang awam",
      "Mengurangi tekanan gas di dalam tabung"
    ],
    "correct": 0,
    "hint": "Ulir kiri (memutar berlawanan arah jarum jam untuk mengencangkan) memiliki tanda takik (notch) pada mur penghubungnya.",
    "explanation": "Standar keselamatan membedakan drat tabung gas bahan bakar dengan ulir kiri (left-hand thread ber-notched nut) dan gas oksidator/inert dengan ulir kanan (right-hand thread) agar regulator tidak tertukar secara fatal."
  },
  {
    "id": 82,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Alat pelindung pendengaran (Earplugs atau Earmuffs) wajib digunakan di area workshop pengelasan apabila intensitas kebisingan telah mencapai:",
    "options": [
      "85 desibel (dBA) atau lebih dalam paparan 8 jam kerja",
      "10 desibel",
      "40 desibel",
      "Hanya jika telinga terasa sakit"
    ],
    "correct": 0,
    "hint": "Batas Nilai Ambang Batas (NAB) kebisingan di tempat kerja menurut regulasi K3 adalah 85 dBA.",
    "explanation": "Paparan bising suara gerinda, pemotongan plasma, dan gouging yang melampaui 85 dBA secara kumulatif dapat merusak saraf pendengaran permanen (Noise-Induced Hearing Loss), sehingga pelindung telinga wajib dipakai."
  },
  {
    "id": 83,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Pertolongan pertama yang paling tepat saat tangan juru las terkena sengatan panas logam las (luka bakar termal derajat satu/dua) adalah:",
    "options": [
      "Mengalirkan air bersih bersuhu sejuk (bukan air es) pada luka bakar selama minimal 15–20 menit",
      "Mengoleskan pasta gigi, mentega, atau kecap kental pada luka",
      "Membalut luka kencang dengan kantong plastik sampah",
      "Membiarkan luka terkena sinar matahari terik"
    ],
    "correct": 0,
    "hint": "Air bersih sejuk mengalir menyerap sisa panas di lapisan kulit dan menghentikan kerusakan jaringan lebih dalam.",
    "explanation": "Luka bakar termal wajib didinginkan di bawah air bersih mengalir bersuhu ruang selama 15-20 menit. Dilarang mengoleskan pasta gigi/mentega karena mengurung panas dan memicu infeksi bakteri."
  },
  {
    "id": 84,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Sepatu keselamatan (Safety Shoes) standar bengkel las wajib dilengkapi dengan fitur:",
    "options": [
      "Pelindung jari baja (Steel Toe Cap 200 Joule) dan sol tahan tusukan paku serta anti-licin tahan panas",
      "Bahan kain jaring tanpa sol tebal",
      "Tali sepatu dari kawat tembaga telanjang",
      "Hak tinggi kayu untuk bergaya"
    ],
    "correct": 0,
    "hint": "Melindungi kaki dari kejatuhan pelat baja berat dan tusukan sisa potongan kawat las tajam di lantai.",
    "explanation": "Safety shoes juru las wajib memiliki pelindung baja pelindung jari (Steel Toe Cap), sol karet tahan minyak dan panas (oil & heat resistant), serta lapisan baja anti-tembus paku (puncture resistant midsole)."
  },
  {
    "id": 85,
    "category": "K3 Safety Standards",
    "catColor": "bg-amber-100 text-amber-700",
    "question": "Dokumen izin kerja resmi yang wajib diterbitkan dan ditandatangani oleh bagian Safety Officer sebelum memulai pekerjaan las di area kilang minyak berisiko tinggi disebut:",
    "options": [
      "Hot Work Permit (Izin Kerja Panas)",
      "Surat Izin Mengemudi",
      "Kuitansi Pembelian Gas",
      "Kartu Tanda Penduduk"
    ],
    "correct": 0,
    "hint": "Surat verifikasi bahwa area kerja telah diuji bebas gas eksplosif dan aman untuk menimbulkan percikan api.",
    "explanation": "Hot Work Permit (Izin Kerja Panas) adalah dokumen kontrol K3 wajib di fasilitas industri untuk memastikan bahwa gas atmosfer telah diuji, APAR tersedia, dan risiko kebakaran telah dimitigasi sebelum menyalakan busur las."
  },
  {
    "id": 86,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Berdasarkan UU No. 18 Tahun 2017 tentang Pelindungan Pekerja Migran Indonesia, platform resmi satu pintu milik BP2MI untuk pendataan dan verifikasi dokumen calon PMI adalah:",
    "options": [
      "SIAPkerja Kemnaker",
      "SISKOP2MI (Sistem Komputerisasi Pelayanan Penempatan dan Pelindungan PMI)",
      "SIMDA Migran",
      "Portal Paspor Ditjen Imigrasi"
    ],
    "correct": 1,
    "hint": "Singkatan dari Sistem Komputerisasi Pelayanan Penempatan dan Pelindungan Pekerja Migran Indonesia.",
    "explanation": "SISKOP2MI adalah basis data terpadu resmi BP2MI yang mencatat seluruh tahapan seleksi, verifikasi dokumen, perjanjian kerja, e-PMI, hingga kepulangan PMI guna menjamin penempatan secara prosedural dan terlindungi."
  },
  {
    "id": 87,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Tahapan wajib yang harus diikuti oleh calon Pekerja Migran Indonesia (PMI) setelah lulus medical check-up dan sebelum diberangkatkan ke negara tujuan penempatan adalah:",
    "options": [
      "Uji Kompetensi Ulang di Bandara Internasional",
      "PAP (Pembekalan Akhir Pemberangkatan) / Orientasi Pra-Pemberangkatan",
      "Wawancara Langsung di Kedutaan Besar Tanpa Dokumen",
      "Pelatihan Bahasa Tambahan Mandiri Tanpa Pengawasan"
    ],
    "correct": 1,
    "hint": "Program pembekalan resmi dari pemerintah mengenai regulasi, perlindungan hukum, dan hak-kewajiban sebelum terbang.",
    "explanation": "PAP (Pembekalan Akhir Pemberangkatan) adalah orientasi pra-keberangkatan resmi yang diselenggarakan oleh BP3MI/BP2MI untuk memberikan pemahaman mengenai hak kewajiban, kebiasaan lokal negara tujuan, dan mitigasi masalah hukum."
  },
  {
    "id": 88,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Tes Logika Spasial: Sebuah pipa silinder dengan diameter 10 inci dipotong miring tepat bersudut 45 derajat. Bentuk penampang bidang potongan (cross-section surface) pipa tersebut adalah:",
    "options": [
      "Lingkaran sempurna (Perfect Circle)",
      "Elips / Lonjong (Ellipse)",
      "Segitiga siku-siku (Right Triangle)",
      "Persegi panjang (Rectangle)"
    ],
    "correct": 1,
    "hint": "Jika dipotong tegak lurus 90° menghasilkan lingkaran; jika dipotong miring miring menghasilkan bentuk oval/lonjong beraturan.",
    "explanation": "Irisan kerucut atau silinder lingkaran yang dipotong miring oleh bidang datar membentuk bangun geometri Elips (lonjong beraturan)."
  },
  {
    "id": 89,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Manakah kombinasi dokumen mutlak yang wajib dipegang oleh Pekerja Migran Indonesia saat bekerja di luar negeri secara resmi (prosedural)?",
    "options": [
      "Hanya KTP dan Paspor Turis (Visa Kunjungan)",
      "Paspor, Visa Kerja Resmi, Perjanjian Kerja (PK), dan Terdaftar di SISKOP2MI/e-PMI",
      "Surat Rekomendasi dari Kepala Desa dan Tiket Pesawat Pulang-Pergi",
      "Sertifikat Pelatihan Kursus Singkat tanpa Visa Kerja"
    ],
    "correct": 1,
    "hint": "PMI wajib berangkat dengan visa kerja (bukan turis), perjanjian kerja resmi yang ditandatangani, dan perlindungan e-PMI.",
    "explanation": "Bekerja ke luar negeri secara prosedural mewajibkan visa kerja legal (bukan visa wisata/ziarah), kontrak Perjanjian Kerja berkekuatan hukum, kepemilikan e-PMI BP2MI, serta jaminan BPJS Ketenagakerjaan Migran."
  },
  {
    "id": 90,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Ciri-ciri utama tawaran kerja luar negeri yang patut dicurigai sebagai sindikat penipuan / Tindak Pidana Perdagangan Orang (TPPO) adalah:",
    "options": [
      "Menggunakan visa kunjungan/turis, proses keberangkatan kilat tanpa pelatihan, dan tidak terdata di SISKOP2MI BP2MI",
      "Diwajibkan mengikuti pelatihan bahasa 640 JPL di BLK resmi",
      "Dilakukan verifikasi berkas di kantor BP3MI",
      "Memiliki kontrak Perjanjian Kerja berkop resmi perusahaan"
    ],
    "correct": 0,
    "hint": "Pemberangkatan non-prosedural selalu mengabaikan pelatihan resmi, memakai visa turis/ziarah, dan menghindari pencatatan dinas ketenagakerjaan.",
    "explanation": "Sindikat penempatan non-prosedural kerap menjanjikan kerja cepat menggunakan visa wisata, tanpa kontrak kerja legal yang disahkan KBRI, dan menahan dokumen asli PMI secara sepihak."
  },
  {
    "id": 91,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Lembaga perwakilan resmi Republik Indonesia di luar negeri yang bertugas memberikan pendampingan hukum dan perlindungan darurat bagi PMI adalah:",
    "options": [
      "KBRI (Kedutaan Besar RI) / KJRI (Konsulat Jenderal RI)",
      "Kantor Imigrasi Negara Setempat",
      "Polres Daerah Asal",
      "Dinas Pariwisata"
    ],
    "correct": 0,
    "hint": "Perwakilan diplomatik dan konsuler negara Republik Indonesia di ibukota negara penempatan.",
    "explanation": "KBRI (Kedutaan Besar Republik Indonesia) dan KJRI adalah garda terdepan perlindungan WNI/PMI di luar negeri yang memiliki Atase Ketenagakerjaan untuk advokasi hukum dan mediasi ketenagakerjaan."
  },
  {
    "id": 92,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Program jaminan sosial wajib yang melindungi Pekerja Migran Indonesia dari risiko kecelakaan kerja, kematian, dan masalah hukum pra-hingga purna penempatan adalah:",
    "options": [
      "BPJS Ketenagakerjaan Program Jaminan Sosial PMI",
      "Asuransi Kendaraan Bermotor",
      "Tabungan Haji Mandiri",
      "Kartu Diskon Supermarket"
    ],
    "correct": 0,
    "hint": "Badan Penyelenggara Jaminan Sosial resmi ketenagakerjaan dengan skema khusus jaminan PMI.",
    "explanation": "BPJS Ketenagakerjaan skema PMI memberikan perlindungan komprehensif mencakup JKK (Jaminan Kecelakaan Kerja), JKM (Jaminan Kematian), santunan gagal berangkat akibat bukan kesalahan PMI, hingga perlindungan risiko PHK sepihak di luar negeri."
  },
  {
    "id": 93,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Jika terjadi situasi darurat kekerasan, upah tidak dibayar, atau penyekapan di negara penempatan, kanal aduan resmi 24 jam milik BP2MI adalah:",
    "options": [
      "Call Center Halo BP2MI (Telepon Dalam Negeri 08001000 / Luar Negeri +622129244800) & Portal Peduli WNI",
      "Komentar di akun media sosial tidak resmi",
      "Surat pos manual tanpa alamat jelas",
      "Menghubungi calo pendaftaran"
    ],
    "correct": 0,
    "hint": "Layanan bebas pulsa Halo BP2MI dan aplikasi terpadu Peduli WNI milik Kementerian Luar Negeri RI.",
    "explanation": "Pusat bantuan Halo BP2MI dan sistem hotline KBRI/Kemlu terhubung langsung 24 jam untuk memproses koordinasi evakuasi, perlindungan shelter, dan bantuan hukum diplomatik bagi PMI yang menghadapi masalah."
  },
  {
    "id": 94,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Hak normatif paling mendasar yang wajib dicantumkan secara gamblang di dalam naskah Perjanjian Kerja (PK) juru las di luar negeri adalah:",
    "options": [
      "Besaran gaji pokok, jam kerja, jaminan asuransi, fasilitas akomodasi, tiket kepulangan, dan hari libur mingguan",
      "Daftar makanan kesukaan staf kantor",
      "Nomor rekening bank milik calo perantara",
      "Foto liburan keluarga pemberi kerja"
    ],
    "correct": 0,
    "hint": "Kontrak kerja wajib memuat hak finansial, jam kerja maksimal, tempat tinggal layak, dan asuransi kesehatan.",
    "explanation": "Perjanjian Kerja (PK) yang sah wajib mencantumkan identitas kedua pihak, jabatan pekerjaan (Welder), besaran upah dan cara pembayaran, jam kerja (maksimal 40-48 jam/minggu), hak cuti, akomodasi layak, serta klausul biaya tiket kepulangan saat kontrak berakhir."
  },
  {
    "id": 95,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Tes Logika Geometri: Jika sebuah pipa silinder baja berlubang dibelah membujur lurus sepanjang sumbunya lalu dibentangkan mendatar di atas lantai, bentuk 2 dimensi yang dihasilkan adalah:",
    "options": [
      "Persegi Panjang (Rectangle)",
      "Segitiga Sama Kaki",
      "Setengah Lingkaran",
      "Trapesium Siku-siku"
    ],
    "correct": 0,
    "hint": "Keliling silinder (π × D) menjadi panjang bidang, dan tinggi silinder (L) menjadi lebar bidang.",
    "explanation": "Bentangan selimut silinder tabung adalah bidang datar Persegi Panjang, dengan ukuran panjang sama dengan keliling lingkaran pipa (Keliling = π × Diameter) dan lebar sama dengan tinggi/panjang pipa."
  },
  {
    "id": 96,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Konversi Aritmatika Teknis: Ukuran kawat las standar Amerika tertulis 1/8 inci (1/8 inch). Berapakah ukuran diameter tersebut dalam satuan milimeter (mm)?",
    "options": [
      "3,18 mm (dibulatkan menjadi 3,2 mm)",
      "1,50 mm",
      "5,00 mm",
      "8,00 mm"
    ],
    "correct": 0,
    "hint": "1 inci = 25,4 mm. Hitung: (1 / 8) × 25,4 mm = ?",
    "explanation": "1 inci setara dengan 25,4 mm. Maka 1/8 inci = 25,4 / 8 = 3,175 mm, yang dalam standardisasi internasional diklasifikasikan sebagai elektroda diameter 3,2 mm."
  },
  {
    "id": 97,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Tes Aritmatika Bengkel: Juru las mengelas sambungan pelat sepanjang 300 mm dengan kecepatan jalan las (travel speed) konstan 150 mm/menit. Waktu bersih yang dibutuhkan untuk menyelesaikan 1 lintasan tersebut adalah:",
    "options": [
      "2 menit (120 detik)",
      "5 menit",
      "30 detik",
      "10 menit"
    ],
    "correct": 0,
    "hint": "Waktu = Jarak panjang las / Kecepatan gerak (Waktu = 300 mm / 150 mm per menit).",
    "explanation": "Waktu pengelasan = Panjang sambungan / Travel speed = 300 mm / 150 mm/menit = 2 menit (120 detik)."
  },
  {
    "id": 98,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Aritmatika Listrik Las: Berdasarkan rumus Hukum Ohm dan Daya Listrik (Daya P = Volt × Ampere), jika mesin las SMAW bekerja pada voltase busur 25 Volt dan arus 120 Ampere, berapakah daya listrik yang dikonsumsi busur api tersebut?",
    "options": [
      "3.000 Watt (3 kW)",
      "500 Watt",
      "145 Watt",
      "12.000 Watt"
    ],
    "correct": 0,
    "hint": "Daya (Watt) = Voltase (Volt) × Arus (Ampere) = 25 × 120 = ?",
    "explanation": "Daya busur listrik las = Voltase × Arus = 25 V × 120 A = 3.000 Watt (3 kiloWatt)."
  },
  {
    "id": 99,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Tes Spasial Proyeksi Orthogonal: Diberikan sebuah benda sambungan pelat berbentuk huruf \"T\" (T-joint). Jika dilihat tepat dari pandangan atas (Top View), penampakan gambar teknik 2D yang tampak adalah:",
    "options": [
      "Sebuah bidang persegi panjang dengan sebuah garis lurus di tengah yang memanjang",
      "Sebuah lingkaran bulat pejal",
      "Dua buah segitiga berhadapan",
      "Sebuah trapesium miring"
    ],
    "correct": 0,
    "hint": "Pelat dasar horizontal terlihat sebagai persegi panjang utuh, dan pelat tegak terlihat sebagai garis lurus tebal di tengahnya.",
    "explanation": "Pada proyeksi orthogonal tampak atas (Top View), pelat bawah T-joint terlihat sebagai bidang persegi panjang datar dan ketebalan pelat vertikal yang menancap tampak sebagai garis lurus di sumbu tengah."
  },
  {
    "id": 100,
    "category": "Regulasi & Logika",
    "catColor": "bg-purple-100 text-purple-700",
    "question": "Sikap etika profesional paling utama yang wajib dijunjung tinggi oleh seorang juru las bersertifikasi internasional di tempat kerja adalah:",
    "options": [
      "Selalu mematuhi instruksi WPS, mengutamakan keselamatan K3, dan tidak menyembunyikan cacat las demi keuntungan sesaat",
      "Mengelas secepat mungkin tanpa membersihkan terak untuk mengejar bonus harian",
      "Mengabaikan pemakaian kacamata pelindung jika cuaca terasa gerah",
      "Menyalahkan juru las lain ketika terjadi cacat pada hasil kerjanya"
    ],
    "correct": 0,
    "hint": "Integritas kualitas hasil pengelasan menyangkut keselamatan nyawa orang banyak (seperti pada jembatan, gedung, dan kapal).",
    "explanation": "Integritas profesional juru las menuntut kepatuhan mutlak pada prosedur WPS yang telah terkualifikasi, disiplin K3, dan kejujuran teknis untuk memperbaiki setiap cacat las sesuai standar sebelum dilakukan inspeksi NDT."
  }
];

// ============================================================================
// 2. DATA CHEAT-SHEET STRUKTUR LENGKAP: 4 KATEGORI UTAMA
// ============================================================================
const CHEAT_SHEET_PROCESSES = [
  {
    id: 'smaw',
    code: 'SMAW / MMAW',
    name: 'Shielded Metal Arc Welding (Las Stik)',
    electrode: 'Consumable stick electrode berbalut fluks padat',
    shielding: 'Gas dan terak (slag) dari hasil pembakaran fluks',
    current: 'AC atau DC (DCEP / DCEN tergantung tipe elektroda)',
    bestFor: 'Konstruksi baja struktural, maintenance lapangan, outdoor berangin, pipa baja tebal.',
    pros: 'Peralatan portabel, biaya murah, tidak memerlukan tabung gas eksternal, tahan hembusan angin.',
    cons: 'Sering ganti elektroda, produktivitas lebih rendah, wajib pembersihan terak (chipping slag).'
  },
  {
    id: 'gtaw',
    code: 'GTAW / TIG',
    name: 'Gas Tungsten Arc Welding (Las Argon / TIG)',
    electrode: 'Non-consumable Tungsten electrode (Tungsten murni / Thoriated / Ceriated)',
    shielding: '100% Gas Argon murni atau campuran Argon-Helium',
    current: 'DCEN (Baja & Stainless Steel), AC (Aluminium & Magnesium)',
    bestFor: 'Root pass pipa bertekanan tinggi, stainless steel tipis, aluminium aero, industri makanan/farmasi.',
    pros: 'Kualitas las paling bersih, penetrasi akar sempurna, nol spatter, estetika manik las indah.',
    cons: 'Kecepatan lambat, memerlukan keterampilan tangan tinggi (dua tangan), sensitif terhadap angin.'
  },
  {
    id: 'gmaw',
    code: 'GMAW / MIG-MAG',
    name: 'Gas Metal Arc Welding (Las Kawat Roll Otomatis)',
    electrode: 'Consumable solid wire kontinu (kawat gulung ER70S-6)',
    shielding: 'Argon murni (MIG untuk Al/SS) atau Ar + CO2 / 100% CO2 (MAG untuk Mild Steel)',
    current: 'DCEP (Direct Current Electrode Positive) transfer semprot/celup',
    bestFor: 'Fabrikasi otomotif, manufaktur massal, perakitan pelat kapal, tangki industri.',
    pros: 'Kecepatan deposisi tinggi, tanpa terak las, continuous welding tanpa henti.',
    cons: 'Peralatan lebih kompleks (feeder + gas kit), tidak cocok di lingkungan luar ruangan berangin kencang.'
  },
  {
    id: 'fcaw',
    code: 'FCAW',
    name: 'Flux-Cored Arc Welding (Las Kawat Berinti Fluks)',
    electrode: 'Tubular wire kontinu dengan inti serbuk fluks di dalamnya',
    shielding: 'Self-shielded (tanpa tabung gas) atau Gas-shielded (dengan CO2/Ar+CO2)',
    current: 'DCEP atau DCEN tergantung tipe kawat las',
    bestFor: 'Galangan kapal besar, jembatan berat, struktur lepas pantai (offshore rigs).',
    pros: 'Laju deposisi tertinggi, penetrasi sangat dalam, varian self-shielded tahan angin.',
    cons: 'Menghasilkan asap/fume tebal, menghasilkan terak (slag) yang harus dibersihkan, kawat lebih mahal.'
  }
];

const CHEAT_SHEET_POSITIONS = [
  { pos: '1G / 1F', type: 'Plate & Pipe Rotated', name: 'Flat Position (Bawah Tangan)', desc: 'Sumbu las mendatar dan pengelasan dilakukan dari sisi atas. Gravitasi membantu cairan las mengisi celah secara merata.', difficulty: 1, stars: '★☆☆☆☆' },
  { pos: '2G / 2F', type: 'Plate & Pipe Vertical', name: 'Horizontal Position (Mendatar)', desc: 'Sumbu jalur las horizontal pada bidang tegak. Cairan logam cenderung melorot ke bawah akibat gravitasi; sudut elektroda harus sedikit diangkat.', difficulty: 2, stars: '★★☆☆☆' },
  { pos: '3G / 3F', type: 'Plate Only', name: 'Vertical Position (Tegak)', desc: 'Jalur las vertikal tegak (naik/turun). Teknik vertical-up memanfaatkan segitiga ayunan (weaving) untuk membangun pondasi tumpukan cairan.', difficulty: 3, stars: '★★★☆☆' },
  { pos: '4G / 4F', type: 'Plate Only', name: 'Overhead Position (Atas Kepala)', desc: 'Pengelasan di langit-langit (benda kerja di atas welder). Arus disetel lebih rendah dan busur harus pendek untuk mencegah spatter jatuh.', difficulty: 4, stars: '★★★★☆' },
  { pos: '5G', type: 'Pipe Fixed Horizontal', name: 'Fixed Pipe (Sumbu Pipa Horizontal)', desc: 'Pipa dipasang horizontal tetap (tidak boleh diputar). Welder bergerak mengitari pipa dari bawah (6 o\'clock) naik ke atas (12 o\'clock).', difficulty: 4, stars: '★★★★☆' },
  { pos: '6G', type: 'Pipe Fixed Inclined', name: 'Fixed Inclined Pipe (Sumbu Miring 45°)', desc: 'Standar pengujian kualifikasi tertinggi. Pipa dipasang miring 45° statis. Menguji kemahiran gabungan posisi flat, vertikal, horizontal, & overhead.', difficulty: 5, stars: '★★★★★' }
];

const CHEAT_SHEET_DEFECTS = [
  {
    name: 'Porosity (Porositas)',
    enTerm: 'Gas Cavity / Porosity',
    description: 'Rongga-rongga lubang gas kecil berbentuk bulat atau memanjang seperti spons di dalam atau permukaan logam las.',
    causes: 'Elektroda basah/lembab, kontaminasi minyak/karat pada base metal, hembusan angin merusak gas pelindung.',
    remedy: 'Baking elektroda dalam oven, gerinda bersih benda kerja, gunakan pelindung angin (wind screen).'
  },
  {
    name: 'Slag Inclusion (Terak Terjebak)',
    enTerm: 'Slag Inclusion',
    description: 'Terak sisa pembakaran fluks terperangkap di antara lapisan manik las (pass) atau di tepi dinding sambungan.',
    causes: 'Pembersihan terak antar-lapisan kurang bersih, ayunan elektroda terlalu lebar, sudut stang las salah.',
    remedy: 'Sikat kawat dan chipping hammer menyeluruh di setiap pass, perbaiki travel speed.'
  },
  {
    name: 'Undercut (Takik Tepi)',
    enTerm: 'Undercutting',
    description: 'Cekungan atau parit alur yang termakan pada tepi jalur las di mana logam induk mencair tetapi tidak terisi kembali.',
    causes: 'Arus (amperage) terlalu tinggi, ayunan terlalu cepat di tepi sambungan, travel speed terlalu ngebut.',
    remedy: 'Turunkan amper, lakukan jeda sejenak (dwell) di kedua sisi tepi ayunan, sesuaikan sudut elektroda.'
  },
  {
    name: 'Lack of Penetration (Kurang Penetrasi)',
    enTerm: 'Incomplete Joint Penetration',
    description: 'Logam las gagal menembus sampai ke akar sambungan (root face/gap), meninggalkan celah kosong di dasar.',
    causes: 'Root gap terlalu sempit, root face terlalu tebal, arus terlalu rendah, sudut elektroda tidak tepat.',
    remedy: 'Atur root gap sesuai WPS (2-3 mm), naikkan amper root pass, arahkan busur tepat ke celah akar.'
  },
  {
    name: 'Lack of Fusion (Tidak Menyatu)',
    enTerm: 'Incomplete Fusion / Cold Lap',
    description: 'Logam las menempel pada base metal tanpa terjadi peleburan ikatan metalurgi yang sempurna.',
    causes: 'Heat input terlalu rendah, permukaan terkena lapisan oksida/mill scale tebal, travel speed tidak stabil.',
    remedy: 'Tingkatkan amper, gerinda permukaan sambungan hingga bersih mengkilap, pertahankan panjang busur.'
  },
  {
    name: 'Crack (Retak Panas & Dingin)',
    enTerm: 'Hot Crack / Cold Hydrogen Cracking',
    description: 'Patahan garis retak linier pada logam las atau HAZ (Heat Affected Zone) yang dapat memicu kegagalan katastropik.',
    causes: 'Kandungan hidrogen tinggi pada elektroda, pendinginan terlalu mendadak, tegangan sisa (residual stress) tinggi.',
    remedy: 'Gunakan elektroda Low-Hydrogen (E7018), lakukan pre-heating dan post-weld heat treatment (PWHT).'
  },
  {
    name: 'Excessive Spatter (Percikan Kasar)',
    enTerm: 'Excessive Spattering',
    description: 'Tetesan butiran logam las cair yang terpental dan menempel di sekitar permukaan pelat dasar.',
    causes: 'Busur las terlalu panjang (arc length too long), voltase/amper terlalu tinggi, polaritas DC terbalik.',
    remedy: 'Pendekkan jarak busur, sesuaikan parameter mesin las, gunakan anti-spatter spray pada nozzle.'
  },
  {
    name: 'Burn-Through (Tembus Jebol)',
    enTerm: 'Melt-Through / Burn-Through',
    description: 'Logam las cair meleleh menembus habis dasar sambungan hingga meninggalkan lubang besar menganga.',
    causes: 'Arus terlalu panas pada root pass, travel speed terlalu lambat, root gap terlalu lebar pada pelat tipis.',
    remedy: 'Turunkan amper, percepat travel speed saat root pass, rapikan root gap sambungan.'
  }
];

const CHEAT_SHEET_VOCAB = [
  { en: 'Root Gap', category: 'Dimension', id: 'Celah akar antar sambungan pelat', example: '"Maintain a 2.5 mm root gap according to the approved WPS."' },
  { en: 'Bevel Angle', category: 'Preparation', id: 'Sudut kemiringan kampuh potong pelat', example: '"Grind the plate edges to a 30-degree bevel angle before fit-up."' },
  { en: 'Tack Weld', category: 'Fit-up', id: 'Las ikat titik penahan sementara', example: '"Apply four bridge tack welds to hold the pipe alignment securely."' },
  { en: 'Heat Input', category: 'Parameter', id: 'Jumlah masukan energi panas las', example: '"Excessive heat input will distort the thin stainless steel plate."' },
  { en: 'Arc Length', category: 'Technique', id: 'Jarak antara ujung elektroda ke cairan las', example: '"Keep a tight arc length to prevent porosity and atmospheric contamination."' },
  { en: 'Chipping Hammer', category: 'Tool', id: 'Palu perontok kerak terak las', example: '"Chip away the slag completely before applying the capping pass."' },
  { en: 'Ground Clamp', category: 'Equipment', id: 'Klem penjepit massa arde benda kerja', example: '"Ensure the ground clamp is tightly fastened to clean bare metal."' },
  { en: 'Shielding Gas', category: 'Gas', id: 'Gas pelindung cairan las (Ar/CO2)', example: '"Check the shielding gas flow meter to maintain 15 Liters per minute."' },
  { en: 'Electrode Holder', category: 'Equipment', id: 'Stang pemegang elektroda stik (SMAW)', example: '"Inspect the electrode holder insulation to avoid electrical shock."' },
  { en: 'Fillet Weld', category: 'Joint Type', id: 'Las sudut pada sambungan T / tumpang', example: '"Inspect the fillet weld throat thickness with a welding gauge."' },
  { en: 'Slag', category: 'Byproduct', id: 'Lapisan terak padat pelindung pendinginan', example: '"Slag must peel off easily when the weld bead cools down."' },
  { en: 'Spatter', category: 'Defect', id: 'Percikan butiran logam las terpental', example: '"Use an angle grinder to remove surface spatter before painting."' },
  { en: 'Welding Helmet', category: 'PPE', id: 'Kedok / helm pelindung muka juru las', example: '"Always lower your welding helmet before striking an electric arc."' },
  { en: 'Leather Gauntlet Gloves', category: 'PPE', id: 'Sarung tangan kulit panjang tahan panas', example: '"Wear heavy-duty leather gauntlet gloves during overhead welding."' },
  { en: 'Confined Space', category: 'Safety', id: 'Ruang terbatas / sempit berisiko tinggi', example: '"Obtain a hot work permit before entering the confined tank space."' },
  { en: 'Fume Extractor', category: 'Safety', id: 'Penyedot dan penyaring asap beracun las', example: '"Position the fume extractor nozzle 15 centimeters from the weld zone."' },
  { en: 'Fire Blanket', category: 'Safety', id: 'Selimut tahan api penahan percikan spatter', example: '"Cover nearby rubber hoses with a fire blanket before welding."' },
  { en: 'Weaving Technique', category: 'Technique', id: 'Teknik ayunan elektroda zig-zag/lingkar', example: '"Use a side-to-side weaving technique on the 3G vertical-up pass."' },
  { en: 'Root Pass', category: 'Pass Type', id: 'Lapisan las pertama pada celah akar', example: '"A sound root pass is essential for 100% radiographic inspection."' },
  { en: 'Capping Pass', category: 'Pass Type', id: 'Lapisan penutup paling atas manik las', example: '"The capping pass should be uniform and not exceed 3 mm reinforcement."' }
];

// ============================================================================
// 3. DATA MATERI WAWANCARA BP2MI (5 SESI TACTICAL)
// ============================================================================
const BP2MI_MATERIALS = [
  {
    id: 1,
    sessionNumber: 'Sesi 1',
    title: '1. Komitmen Dasar & Motivasi PMI',
    category: 'Motivasi & Komitmen',
    badgeColor: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
    interviewerQuestion:
      'Dari data administrasi, Anda adalah lulusan MAN 1 Payakumbuh, bukan dari SMK jurusan Teknik Pengelasan seperti mayoritas pendaftar lainnya. Kenapa Anda begitu yakin memilih posisi Welder? Apa motivasi terbesar Anda ingin bekerja ke luar negeri melalui program BP2MI ini?',
    recommendedAnswer:
      'Meskipun dari MAN, MAN 1 Payakumbuh memiliki program keterampilan vokasi pengelasan khusus. Setiap minggu kami praktik langsung di workshop pengelasan sekolah, jadi dasar-dasar memegang stang las, menyalakan busur, dan menyambung besi sudah sangat familiar bagi saya. Motivasi terbesar saya adalah ingin mandiri secara finansial di usia muda, membantu ekonomi keluarga, dan mengembangkan karier serta keahlian pengelasan saya di kancah internasional melalui jalur resmi negara BP2MI.',
    keyPoints: [
      'Jelaskan program vokasi dan praktik rutin mingguan di workshop sekolah.',
      'Sampaikan familiaritas teknis dasar (memegang stang las, menyalakan busur, menyambung besi).',
      'Tegaskan motivasi kuat: mandiri finansial, mengangkat ekonomi keluarga, dan memilih jalur resmi negara.'
    ]
  },
  {
    id: 2,
    sessionNumber: 'Sesi 2',
    title: '2. Kompetensi Teknis Pengelasan',
    category: 'Kompetensi Teknis',
    badgeColor: 'bg-amber-900/40 text-amber-300 border-amber-700/50',
    interviewerQuestion:
      'Anda tidak melampirkan sertifikat pengelasan BNSP/AWS resmi, namun menyebutkan memiliki pengalaman praktik vokasi selama di sekolah. Bisa Anda jelaskan secara mendetail: Apa saja jenis pengelasan (misal: SMAW, GMAW/MIG, GTAW/TIG) yang pernah Anda praktikkan? Jenis material apa yang biasa Anda las, dan posisi pengelasan apa saja yang sudah Anda kuasai?',
    recommendedAnswer:
      'Di sekolah kami fokus pada praktik intensif di workshop. Saya sangat menguasai penggunaan Las Listrik Stik (SMAW). Saya sudah terbiasa menyambung material besi baja karbon ringan (mild steel), mengatur amper, membersihkan terak las (slag), dan melakukan penyambungan posisi datar (flat/1G) maupun horizontal (2G) untuk konstruksi tralis dan pagar.',
    keyPoints: [
      'Jawab jujur dan spesifik mengenai kompetensi riil yang dikuasai: Las Listrik Stik (SMAW).',
      'Sebutkan material konkret yang sering dikerjakan: besi baja karbon ringan.',
      'Tunjukkan kebiasaan kerja baik: pembersihan terak (slag) dan kemampuan posisi 1G serta 2G.'
    ]
  },
  {
    id: 3,
    sessionNumber: 'Sesi 3',
    title: '3. Ketahanan Kerja & Kesehatan K3',
    category: 'Kesehatan & K3',
    badgeColor: 'bg-red-900/40 text-red-300 border-red-700/50',
    interviewerQuestion:
      'Pekerjaan sebagai Welder di luar negeri itu berat. Anda akan menghadapi panas, percikan api, asap, dan dituntut fokus berjam-jam dengan APD lengkap. Bagaimana Anda meyakinkan kami bahwa fisik Anda sanggup menghadapi tekanan kerja tersebut? Apakah Anda memiliki riwayat penyakit pernapasan atau mata silindris?',
    recommendedAnswer:
      'Alhamdulillah, saya memiliki pola hidup sehat dan tidak merokok, sehingga kondisi fisik dan kapasitas paru-paru saya prima untuk menghadapi lingkungan kerja Welder. Mengenai mata, saya memiliki sedikit silindris ringan, namun selama ini tidak mengganggu fokus saya saat mengelas di workshop sekolah. Jika nanti dari hasil medical check-up resmi diharuskan menggunakan kacamata koreksi atau lensa khusus di dalam kedok las, saya siap menyediakannya demi keselamatan dan akurasi kerja.',
    keyPoints: [
      'Tegaskan pola hidup sehat & bebas rokok sebagai modal utama daya tahan pernapasan.',
      'Transparan mengenai mata silindris ringan tanpa membuat interviewer ragu atas fokus kerja.',
      'Berikan solusi proaktif: siap menggunakan lensa koreksi khusus di kedok las sesuai anjuran medis resmi.'
    ]
  },
  {
    id: 4,
    sessionNumber: 'Sesi 4',
    title: '4. Kesiapan Pelatihan Asrama & Bahasa (640 JPL)',
    category: 'Disiplin & Asrama',
    badgeColor: 'bg-purple-900/40 text-purple-300 border-purple-700/50',
    interviewerQuestion:
      'Di brosur tertera bahwa posisi Welder ini mewajibkan Pelatihan Bahasa Inggris sebanyak 640 Jam Pelajaran (JPL), sedangkan pelatihan teknis lasnya hanya 180 JPL. Kelas bahasa ini akan sangat padat dan berjalan berbulan-bulan di dalam asrama dengan disiplin tinggi. Bagaimana kesiapan Anda untuk belajar bahasa Inggris intensif di asrama? Apakah Anda tipe orang yang mudah rindu rumah (homesick)?',
    recommendedAnswer:
      'Sistem kehidupan asrama sudah sangat familiar bagi saya, karena saya sudah berpengalaman selama 3 tahun asrama di Bukittinggi dan 3 tahun merantau di asrama Jogja. Jadi, masalah adaptasi lingkungan baru, kedisiplinan asrama, dan kemandirian sudah menjadi bagian dari keseharian saya. Bagi saya, rasa rindu keluarga adalah hal manusiawi, namun tekad saya menjadi seorang Welder profesional global jauh lebih besar. Saya siap mendedikasikan fokus saya sepenuhnya untuk program ini.',
    keyPoints: [
      'Gunakan rekam jejak nyata: 3 tahun asrama di Bukittinggi & 3 tahun merantau di Jogja sebagai bukti kemandirian.',
      'Tunjukkan kedewasaan sikap dalam menyikapi rasa rindu keluarga (homesick).',
      'Tegaskan tekad bulat mendedikasikan fokus penuh pada 640 JPL Bahasa Inggris & pelatihan asrama.'
    ]
  },
  {
    id: 5,
    sessionNumber: 'Sesi 5',
    title: '5. Adaptasi Budaya & Komunikasi Luar Negeri',
    category: 'Adaptasi Global',
    badgeColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
    interviewerQuestion:
      'Karena program ini menggunakan jalur Welder - Bahasa Inggris, penempatan kerja Anda nantinya bisa mengarah ke negara-negara Eropa, Timur Tengah, atau wilayah Asia Pasifik. Apakah Anda siap jika nantinya ditempatkan di negara yang budayanya sangat berbeda jauh dengan Indonesia? Dan apa yang akan Anda lakukan jika di awal bekerja nanti mengalami kendala komunikasi dengan supervisor asing?',
    recommendedAnswer:
      'Saya sangat siap untuk ditempatkan di negara mana pun dengan budaya yang berbeda, karena bagi saya perbedaan itu adalah ruang untuk belajar. Jika nanti di tempat kerja saya menghadapi kendala komunikasi atau instruksi yang membingungkan, prinsip saya adalah tetap tenang dan tidak mengambil keputusan secara impulsif demi menghindari risiko kesalahan fatal. Saya akan mengedepankan komunikasi profesional dengan meminta kejelasan ulang kepada supervisor, atau meminta bimbingan dari kolega senior agar pekerjaan tetap berjalan aman dan sesuai standar perusahaan.',
    keyPoints: [
      'Tunjukkan keterbukaan pola pikir terhadap keberagaman budaya di berbagai negara penempatan.',
      'Terapkan prinsip K3 & keselamatan: tidak gegabah/impulsif saat menghadapi instruksi yang ambigu.',
      'Utamakan etika profesional: aktif meminta klarifikasi ke supervisor atau bimbingan dari teknisi senior.'
    ]
  }
];

// ============================================================================
// 4. DATA ENGLISH INTERVIEW (8 SIMULASI PERTANYAAN REKRUTMEN GLOBAL)
// ============================================================================
const ENGLISH_INTERVIEW_QUESTIONS = [
  {
    question: 'Tell me about yourself and your vocational background.',
    tip: 'Fokus pada program kejuruan di sekolah, pengalaman praktik pengelasan di workshop, dan motivasi standar global.',
    answer:
      '"Good morning, Sir/Ma\'am. My name is [Your Name], I completed the vocational program in welding technology at MAN 1 Payakumbuh. During my studies, I gained extensive hands-on experience in our school workshop, practicing SMAW processes, joint preparations, and safety standards according to industrial requirements. I am disciplined, eager to learn, and highly motivated to work overseas through this BP3MI program."',
    translation:
      '"Selamat pagi, Bapak/Ibu. Nama saya [Nama Anda], saya menyelesaikan program vokasi pengelasan di MAN 1 Payakumbuh. Selama belajar, saya memperoleh pengalaman praktik langsung di workshop sekolah, melatih proses SMAW, persiapan sambungan, dan K3 standar industri. Saya disiplin, antusias belajar, dan sangat bermotivasi bekerja ke luar negeri lewat BP3MI."'
  },
  {
    question: 'Why do you want to work abroad as an industrial welder?',
    tip: 'Tunjukkan motivasi profesional, penguasaan kode internasional (AWS/ASME), dan pengembangan karier jangka panjang.',
    answer:
      '"I want to work abroad because I am eager to improve my welding skills by working with international standards such as AWS and ASME codes. Working overseas will expose me to modern industrial equipment, high safety standards, and strict quality requirements that will make me a competent global welder."',
    translation:
      '"Saya ingin bekerja di luar negeri karena ingin meningkatkan keahlian las dengan standar internasional AWS dan ASME. Bekerja di luar negeri memberi paparan peralatan modern, standar K3 tinggi, dan persyaratan kualitas yang ketat."'
  },
  {
    question: 'How do you handle a welding defect when you discover one during inspection?',
    tip: 'Jelaskan metode sistematis: Hentikan pengelasan -> Identifikasi jenis cacat -> Gerinda perbaikan -> Las ulang -> Inspeksi visual.',
    answer:
      '"When I discover a defect, I follow a systematic approach. First, I stop welding and identify the root cause—whether it is porosity, undercut, or lack of fusion. I grind out the defective area completely, adjust my welding parameters according to the WPS, re-weld the joint, and visually inspect the final repair."',
    translation:
      '"Ketika menemukan cacat, saya menghentikan las, mengidentifikasi akar masalahnya, menggerinda bagian cacat hingga bersih, mengatur ulang amper/voltase sesuai WPS, mengelas ulang sambungan, dan memeriksa hasil perbaikan."'
  },
  {
    question: 'How do you handle a high-stress or tight-deadline work environment in the workshop?',
    tip: 'Tunjukkan ketenangan, prioritas keselamatan K3 di atas segalanya, dan komunikasi tim yang jelas.',
    answer:
      '"In welding, rushing leads to severe defects and safety hazards. I manage pressure by staying focused, following the WPS strictly, and maintaining clear communication with my team and supervisor. Preparation, proper PPE, and a positive mindset are key to working safely under pressure."',
    translation:
      '"Dalam pengelasan, terburu-buru memicu cacat fatal dan bahaya keselamatan. Saya mengelola tekanan dengan tetap fokus, mematuhi WPS, dan menjaga komunikasi yang jelas dengan tim serta supervisor. Persiapan dan pola pikir positif adalah kunci bekerja aman."'
  },
  {
    question: 'Explain the main technical difference between SMAW and GTAW processes.',
    tip: 'Bandingkan tipe elektroda (consumable vs non-consumable) dan gas pelindungnya.',
    answer:
      '"SMAW uses a consumable electrode coated with flux that melts to create shielding gas and protective slag. GTAW uses a non-consumable tungsten electrode with separate shielding gas like 100% pure Argon, producing high-precision, spatter-free welds for critical piping or thin materials."',
    translation:
      '"SMAW memakai elektroda habis pakai terbungkus fluks yang mencair menghasilkan gas dan kerak. GTAW menggunakan elektroda tungsten yang tidak mencair dengan gas argon murni terpisah, menghasilkan las presisi tinggi tanpa spatter untuk pipa kritis atau pelat tipis."'
  },
  {
    question: 'What safety precautions do you always follow before striking an arc?',
    tip: 'Sebutkan APD lengkap, inspeksi kabel mesin las, ventilasi, dan pembersihan bahan mudah terbakar.',
    answer:
      '"Before welding, I perform a thorough safety check: inspect all PPE including proper shade #10 helmet lens, check cable insulation and ground clamp connection, verify work area ventilation, ensure fire extinguishers are accessible, and clear away any flammable materials within 6 meters."',
    translation:
      '"Sebelum mengelas, saya memeriksa APD dan lensa shade helm yang benar, memeriksa isolasi kabel dan klem massa, memastikan ventilasi memadai, memastikan APAR siap pakai, dan menyingkirkan bahan mudah terbakar dalam radius 6 meter."'
  },
  {
    question: 'Can you work effectively in a multicultural team with foreign supervisors?',
    tip: 'Tegaskan sikap toleransi, keterbukaan budaya, dan komitmen komunikasi aktif dalam bahasa Inggris.',
    answer:
      '"Yes, absolutely. I respect different cultural backgrounds and work ethics. Having lived in diverse boarding school environments, I adapt quickly. I actively improve my English communication skills and always clarify instructions with supervisors before proceeding to ensure zero miscommunication on site."',
    translation:
      '"Ya, tentu saja. Saya menghormati latar belakang budaya yang beragam. Terbiasa hidup di lingkungan asrama membuat saya cepat beradaptasi. Saya aktif meningkatkan komunikasi bahasa Inggris dan selalu mengonfirmasi ulang instruksi supervisor demi mencegah kesalahan."'
  },
  {
    question: 'Where do you see yourself in 5 years in the global welding industry?',
    tip: 'Sampaikan visi peningkatan sertifikasi (6G, CWI / Welding Inspector) dan kontribusi ke industri.',
    answer:
      '"In five years, I see myself as a certified international 6G pipe welder with extensive overseas project experience. My long-term goal is to advance towards becoming a certified Welding Inspector (CWI) or Supervisor, mentoring future Indonesian vocational welders for global careers."',
    translation:
      '"Dalam lima tahun, saya melihat diri saya sebagai welder pipa 6G internasional bersertifikasi dengan banyak pengalaman proyek luar negeri. Target saya adalah berkembang menjadi Welding Inspector (CWI) atau Supervisor serta membimbing calon welder muda Indonesia."'
  }
];

// ============================================================================
// 5. DATA CHECKLIST KESIAPAN PEKERJA MIGRAN
// ============================================================================
const CHECKLIST_SECTIONS = [
  {
    title: '📄 Kelengkapan Dokumen & Administrasi',
    items: [
      { id: 'doc-1', text: 'Cek email hasil seleksi dari BP3MI / P3MI secara berkala' },
      { id: 'doc-2', text: 'Paspor aktif (masa berlaku minimal 18 bulan ke depan)' },
      { id: 'doc-3', text: 'Fotokopi e-KTP dan Kartu Keluarga (legalisir cap basah)' },
      { id: 'doc-4', text: 'Ijazah terakhir & transkrip nilai asli beserta fotokopi legalisir' },
      { id: 'doc-5', text: 'Sertifikat kompetensi vokasi pengelasan (buku saku/laporan praktik)' },
      { id: 'doc-6', text: 'Pas foto terbaru 4x6 latar belakang putih (10 lembar)' },
      { id: 'doc-7', text: 'SKCK dari Kepolisian Resor (Polres) untuk keperluan kerja luar negeri' },
      { id: 'doc-8', text: 'Surat Izin Orang Tua / Wali / Pasangan bermaterai Rp 10.000' }
    ]
  },
  {
    title: '🏥 Medical Check-Up & Kesehatan Fisik',
    items: [
      { id: 'med-1', text: 'Bebas dari tato / rajah tubuh di seluruh area badan' },
      { id: 'med-2', text: 'Bebas dari tindik / piercing selain standar daun telinga wanita' },
      { id: 'med-3', text: 'Kesehatan mata diperiksa (visus normal atau terkoreksi kacamata kedok)' },
      { id: 'med-4', text: 'Rontgen paru-paru (Thorax) bersih bebas dari flek / TBC' },
      { id: 'med-5', text: 'Bebas buta warna total maupun parsial (Tes Ishihara normal)' },
      { id: 'med-6', text: 'Pemeriksaan gigi dan gusi sehat bebas infeksi aktif' },
      { id: 'med-7', text: 'Tekanan darah stabil normal (Sistol < 130, Diastol < 85)' },
      { id: 'med-8', text: 'Bebas narkoba dan alkohol (hasil tes urine laboratorium negatif)' },
      { id: 'med-9', text: 'Bebas penyakit menular (Hepatitis B/C, HIV/AIDS, Sifilis)' }
    ]
  },
  {
    title: '🏋️ Kesiapan Fisik & Keterampilan Praktik',
    items: [
      { id: 'phys-1', text: 'Ketahanan stamina fisik berdiri bekerja 8-10 jam per hari' },
      { id: 'phys-2', text: 'Rutin melatih tangan stabil pada posisi las 1G, 2G, dan 3G' },
      { id: 'phys-3', text: 'Mampu membaca simbol las AWS dan gambar teknik dasar' },
      { id: 'phys-4', text: 'Menguasai penggunaan alat potong gerinda & chipping hammer' },
      { id: 'phys-5', text: 'Mampu mengoperasikan alat ukur welding gauge & vernier caliper' }
    ]
  },
  {
    title: '🧠 Kesiapan Mental, Bahasa & Asrama (640 JPL)',
    items: [
      { id: 'ment-1', text: 'Siap menjalani masa asrama disiplin penuh dan jauh dari keluarga' },
      { id: 'ment-2', text: 'Siap mengikuti kurikulum padat 640 JPL Bahasa Inggris dari dasar' },
      { id: 'ment-3', text: 'Menghafal 30+ kosakata teknis pengelasan dalam bahasa Inggris' },
      { id: 'ment-4', text: 'Latihan menjawab pertanyaan wawancara rekrutmen secara lancar' },
      { id: 'ment-5', text: 'Memahami budaya kerja, hukum, dan iklim negara penempatan' },
      { id: 'ment-6', text: 'Siap mengikuti rangkaian PAP (Pembekalan Akhir Pemberangkatan)' }
    ]
  }
];

// ============================================================================
// 6. KOMPONEN UTAMA REACT: Bp3miApp
// ============================================================================
export default function Bp3miApp() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('exam');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ==========================================================================
  // REQUIREMENT 1: MODE TOGGLE ('study' | 'exam')
  // ==========================================================================
  const [examMode, setExamMode] = useState('study'); // 'study' = Mode Belajar (Instant Feedback), 'exam' = Mode Ujian (Strict Timer)
  const [activeQuestionPool, setActiveQuestionPool] = useState(INITIAL_QUESTIONS);
  const [isMistakeRetakeSession, setIsMistakeRetakeSession] = useState(false);

  // Exam Progress States
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(INITIAL_QUESTIONS.length).fill(-1));
  const [revealedHints, setRevealedHints] = useState({}); // { [qId]: boolean }
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 Menit = 5400 detik

  // ==========================================================================
  // REQUIREMENT 2: MISTAKE TRACKER
  // ==========================================================================
  const [wrongQuestionIds, setWrongQuestionIds] = useState([]);

  // ==========================================================================
  // REQUIREMENT 3: CHEAT-SHEET TABS & ACCORDIONS
  // ==========================================================================
  const [activeCheatTab, setActiveCheatTab] = useState('processes'); // 'processes' | 'positions' | 'defects' | 'vocab'
  const [openCheatAccordions, setOpenCheatAccordions] = useState({});
  const [activeVocabCat, setActiveVocabCat] = useState('all');

  // Materials & Interview Accordions
  const [activeMaterialCat, setActiveMaterialCat] = useState('all');
  const [openMaterialAccordions, setOpenMaterialAccordions] = useState({});
  const [openInterviewAccordions, setOpenInterviewAccordions] = useState({});

  // Checklist State with LocalStorage
  const [checklist, setChecklist] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bp3mi_react_checklist');
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  // Toast Notification System
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  // Timer Effect (Only active during Strict Exam Mode)
  useEffect(() => {
    let timerInterval = null;
    if (examStarted && !examSubmitted && examMode === 'exam') {
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            handleAutoSubmitOnTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [examStarted, examSubmitted, examMode]);

  const handleAutoSubmitOnTimeOut = () => {
    setExamSubmitted(true);
    setExamStarted(false);
    addToast('⏰ Waktu Ujian Habis (00:00)! Jawaban otomatis dikumpulkan.', 'error');
  };

  // Format Time MM:SS
  const formattedTime = useMemo(() => {
    const min = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const sec = (timeLeft % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }, [timeLeft]);

  // Exam Score & Mistake Calculation
  const examResults = useMemo(() => {
    if (!examSubmitted) return null;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    const mistakes = [];

    activeQuestionPool.forEach((q, idx) => {
      const userAns = userAnswers[idx];
      if (userAns === -1) {
        unanswered++;
        mistakes.push(q.id);
      } else if (userAns === q.correct) {
        correct++;
      } else {
        wrong++;
        mistakes.push(q.id);
      }
    });

    const percent = Math.round((correct / activeQuestionPool.length) * 100);
    const passed = percent >= 70;

    return { correct, wrong, unanswered, percent, passed, mistakes };
  }, [examSubmitted, userAnswers, activeQuestionPool]);

  // Update Mistake Tracker state when exam submits
  useEffect(() => {
    if (examResults) {
      setWrongQuestionIds(examResults.mistakes);
    }
  }, [examResults]);

  // Start Exam / Study Session Handler
  const startSession = (modeToUse = examMode, questionSet = INITIAL_QUESTIONS, isRetake = false) => {
    setExamMode(modeToUse);
    setActiveQuestionPool(questionSet);
    setIsMistakeRetakeSession(isRetake);
    setExamStarted(true);
    setExamSubmitted(false);
    setCurrentQuestionIdx(0);
    setUserAnswers(Array(questionSet.length).fill(-1));
    setRevealedHints({});
    setTimeLeft(90 * 60);

    if (modeToUse === 'study') {
      addToast('📖 Mode Belajar aktif: Umpan balik instan & penjelasan otomatis terbuka.', 'info');
    } else {
      addToast('⏱️ Mode Ujian aktif: Timer 90 Menit dimulai. Fitur hint dinonaktifkan.', 'warning');
    }
  };

  // Select Answer Handler
  const selectAnswer = (optionIdx) => {
    setUserAnswers((prev) => {
      const copy = [...prev];
      copy[currentQuestionIdx] = optionIdx;
      return copy;
    });

    // In Study mode, automatically show hint/explanation
    if (examMode === 'study') {
      const currentQ = activeQuestionPool[currentQuestionIdx];
      if (optionIdx === currentQ.correct) {
        addToast('✓ Jawaban Anda Benar!', 'success');
      } else {
        addToast('✗ Jawaban Anda Belum Tepat. Simak pembahasan di bawah!', 'error');
      }
    }
  };

  // Toggle Hint
  const toggleHint = (qIdx) => {
    setRevealedHints((prev) => ({
      ...prev,
      [qIdx]: !prev[qIdx]
    }));
  };

  // Manual Submit Exam
  const submitExam = () => {
    const answeredCount = userAnswers.filter((a) => a !== -1).length;
    if (answeredCount < activeQuestionPool.length) {
      const unans = activeQuestionPool.length - answeredCount;
      const confirmSubmit = window.confirm(
        `Anda masih memiliki ${unans} soal yang belum dijawab. Apakah Anda yakin ingin menyelesaikan sesi sekarang?`
      );
      if (!confirmSubmit) return;
    }
    setExamSubmitted(true);
    setExamStarted(false);
    addToast('Jawaban berhasil dikumpulkan!', 'success');
  };

  // Restart Full Exam
  const retakeFullExam = () => {
    startSession(examMode, INITIAL_QUESTIONS, false);
  };

  // REQUIREMENT 2: Retake Mistake Questions Only
  const retakeMistakesOnly = () => {
    if (wrongQuestionIds.length === 0) {
      addToast('Luar biasa! Tidak ada soal salah untuk diulang.', 'success');
      return;
    }
    const mistakePool = INITIAL_QUESTIONS.filter((q) => wrongQuestionIds.includes(q.id));
    startSession('study', mistakePool, true);
    addToast(`🎯 Sesi Perbaikan: Mengulang ${mistakePool.length} soal yang salah dalam Mode Belajar.`, 'info');
  };

  // Checklist Item Toggle
  const toggleChecklistItem = (id) => {
    setChecklist((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      if (typeof window !== 'undefined') {
        localStorage.setItem('bp3mi_react_checklist', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const checklistStats = useMemo(() => {
    const totalItems = CHECKLIST_SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
    const checkedItems = CHECKLIST_SECTIONS.reduce(
      (sum, s) => sum + s.items.filter((i) => checklist[i.id]).length,
      0
    );
    const percent = Math.round((checkedItems / totalItems) * 100);
    return { totalItems, checkedItems, percent };
  }, [checklist]);

  // Copy helper
  const copyToClipboard = (text, label = 'Teks') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        addToast(`✓ ${label} berhasil disalin ke clipboard!`, 'success');
      });
    }
  };

  // Toggle Cheat Sheet Accordion
  const toggleCheatAccordion = (id) => {
    setOpenCheatAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-amber-500 selection:text-black">
      {/* ==================================================================== */}
      {/* TOAST CONTAINER */}
      {/* ==================================================================== */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold text-white border transition-all animate-bounce ${
              t.type === 'success'
                ? 'bg-emerald-600 border-emerald-400'
                : t.type === 'error'
                ? 'bg-rose-600 border-rose-400'
                : t.type === 'warning'
                ? 'bg-amber-600 border-amber-400'
                : 'bg-blue-600 border-blue-400'
            }`}
          >
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* ==================================================================== */}
      {/* MOBILE MENU TOGGLE & OVERLAY */}
      {/* ==================================================================== */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 text-amber-400 p-2.5 rounded-xl border border-slate-800 shadow-xl focus:outline-none"
        aria-label="Toggle Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ==================================================================== */}
      {/* SIDEBAR NAVIGATION */}
      {/* ==================================================================== */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-slate-950 border-r border-slate-800/80 flex flex-col z-50 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center gap-3.5 bg-slate-950">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 border border-amber-300/40">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-black tracking-wider text-white">SMK GO GLOBAL</h1>
            <p className="text-[10px] font-bold text-amber-400 tracking-widest uppercase">BP3MI · Welder Prep</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => {
              setCurrentPage('exam');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
              currentPage === 'exam'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-inner'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">📝</span>
            <span>Simulasi Ujian</span>
            <span className="ml-auto bg-amber-500/20 text-amber-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-500/30">
              100 SOAL
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('cheatsheet');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
              currentPage === 'cheatsheet'
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30 shadow-inner'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">⚡</span>
            <span>Quick Cheat-Sheet</span>
            <span className="ml-auto bg-orange-500/20 text-orange-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-orange-500/30">
              UPDATE
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('materi-bp2mi');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
              currentPage === 'materi-bp2mi'
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-inner'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">📖</span>
            <span>Materi BP2MI</span>
            <span className="ml-auto bg-blue-500/20 text-blue-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-blue-500/30">
              5 SESI
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('interview');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
              currentPage === 'interview'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-inner'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">🎙️</span>
            <span>Latihan Interview</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('checklist');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
              currentPage === 'checklist'
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-inner'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">📋</span>
            <span>Checklist Kesiapan</span>
            <span className="ml-auto text-xs font-mono text-slate-400">{checklistStats.percent}%</span>
          </button>
        </nav>

        {/* Footer Status Pill */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <div className="bg-slate-900 rounded-xl p-3.5 border border-slate-800 flex items-center gap-3">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                examStarted ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <div className="text-xs">
              <p className="font-bold text-slate-300">Status Aplikasi</p>
              <p className="text-[11px] text-slate-400">
                {examStarted
                  ? examMode === 'study'
                    ? 'Mode Belajar Aktif'
                    : 'Mode Ujian (90 Menit)'
                  : examSubmitted
                  ? 'Selesai & Dievaluasi'
                  : 'Siap Digunakan'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <main className="flex-1 min-h-screen flex flex-col bg-slate-900/60 pb-20 lg:pb-8">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 h-16 flex items-center justify-between px-4 sm:px-8">
          <div className="pl-12 lg:pl-0">
            <h2 className="text-sm sm:text-base font-black text-white tracking-wide">
              {currentPage === 'exam' && 'Simulasi Seleksi Juru Las & English'}
              {currentPage === 'cheatsheet' && 'Quick Reference Cheat-Sheet'}
              {currentPage === 'materi-bp2mi' && 'Materi Wawancara BP2MI / BP3MI'}
              {currentPage === 'interview' && 'Global English Interview Simulator'}
              {currentPage === 'checklist' && 'Checklist Kesiapan Pekerja Migran'}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 hidden sm:block">
              {currentPage === 'exam' && 'Target 100 Soal Simulasi Resmi — Dual Mode Belajar & Ujian'}
              {currentPage === 'cheatsheet' && 'Proses Las (SMAW/GTAW/GMAW/FCAW), Posisi 1G-6G, Cacat Las & Top 20 Kosakata'}
              {currentPage === 'materi-bp2mi' && '5 Sesi Tanya Jawab Taktis Seleksi Program SMK Go Global'}
              {currentPage === 'interview' && 'Top 8 Pertanyaan Rekrutmen Welder Global + Jawaban Standar AWS'}
              {currentPage === 'checklist' && 'Persiapan Berkas, Medical & Mental (BP3MI Sumbar)'}
            </p>
          </div>

          {/* Timer Display on Exam Mode */}
          {currentPage === 'exam' && examStarted && !examSubmitted && (
            <div>
              {examMode === 'exam' ? (
                <div
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-mono font-black ${
                    timeLeft <= 300
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-pulse'
                      : 'bg-slate-900 text-amber-400 border-amber-500/30'
                  }`}
                >
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formattedTime}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-500/30 text-xs font-bold">
                  <span>📖 Mode Belajar (Bebas Waktu)</span>
                </div>
              )}
            </div>
          )}
        </header>

        {/* Dynamic Main Body Content */}
        <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full flex-1">
          {/* ================================================================ */}
          {/* 1. PAGE: EXAM SIMULATION WITH MODE SELECTOR & MISTAKE RETAKE */}
          {/* ================================================================ */}
          {currentPage === 'exam' && (
            <div className="space-y-6">
              {/* Intro Dashboard & Mode Selector */}
              {!examStarted && !examSubmitted && (
                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl animate-fadeIn">
                  {/* Hero Banner */}
                  <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 text-xs font-black px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest mb-3">
                      <span>⚡</span> SIMULASI RESMI SMK GO GLOBAL
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                      Simulasi Ujian Seleksi Welder & English
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                      Persiapkan diri Anda untuk seleksi pelatihan BP3MI. Pilihlah mode latihan yang Anda inginkan: pelajari konsep dengan umpan balik langsung (Mode Belajar) atau uji kesiapan dengan batas waktu nyata (Mode Ujian).
                    </p>
                  </div>

                  {/* Dashboard Metrics (Requirement: 100 Total Soal & 90:00 Menit) */}
                  <div className="p-6 sm:p-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-white">100</div>
                        <div className="text-[11px] text-slate-400 font-bold mt-1">Total Bank Soal</div>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">90:00</div>
                        <div className="text-[11px] text-slate-400 font-bold mt-1">Standar Waktu (Menit)</div>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-blue-400">4</div>
                        <div className="text-[11px] text-slate-400 font-bold mt-1">Kategori Soal</div>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-emerald-400">70%</div>
                        <div className="text-[11px] text-slate-400 font-bold mt-1">Batas Kelulusan</div>
                      </div>
                    </div>

                    {/* ======================================================== */}
                    {/* REQUIREMENT 1: MODE TOGGLE SELECTOR */}
                    {/* ======================================================== */}
                    <div className="mb-8">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-3">
                        Pilih Mode Latihan Anda:
                      </label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Option 1: Mode Belajar */}
                        <div
                          onClick={() => setExamMode('study')}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                            examMode === 'study'
                              ? 'bg-blue-950/30 border-blue-500 shadow-lg shadow-blue-500/10'
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">📖</span>
                            <span
                              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                examMode === 'study'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {examMode === 'study' ? 'Terpilih' : 'Pilih'}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white mb-1">
                            Mode Belajar (Instant Feedback)
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed mb-3">
                            Tanpa batasan timer waktu. Jawaban benar/salah langsung disorot seketika dan pembahasan teknis otomatis terbuka untuk dipelajari.
                          </p>
                          <ul className="text-[11px] text-blue-300 space-y-1 font-medium">
                            <li>✓ Evaluasi instan tiap klik pilihan</li>
                            <li>✓ Pembahasan teknis & arti Inggris langsung muncul</li>
                            <li>✓ Fitur Hint bebas digunakan</li>
                          </ul>
                        </div>

                        {/* Option 2: Mode Ujian */}
                        <div
                          onClick={() => setExamMode('exam')}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                            examMode === 'exam'
                              ? 'bg-amber-950/30 border-amber-500 shadow-lg shadow-amber-500/10'
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">⏱️</span>
                            <span
                              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                examMode === 'exam'
                                  ? 'bg-amber-500 text-slate-950'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {examMode === 'exam' ? 'Terpilih' : 'Pilih'}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white mb-1">
                            Mode Ujian (Strict Timer 90:00)
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed mb-3">
                            Simulasi ketat seperti ujian tertulis resmi. Timer 90 menit berjalan mundur, petunjuk dinonaktifkan, dan otomatis submit saat waktu habis.
                          </p>
                          <ul className="text-[11px] text-amber-300 space-y-1 font-medium">
                            <li>✓ Countdown 90:00 dengan auto-submit saat 00:00</li>
                            <li>✓ Fitur Hint dinonaktifkan (Strict)</li>
                            <li>✓ Kunci jawaban & skor lengkap di akhir sesi</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Start Button */}
                    <button
                      onClick={() => startSession(examMode, INITIAL_QUESTIONS, false)}
                      className={`w-full font-black py-4 px-8 rounded-xl shadow-xl text-base transition-all flex items-center justify-center gap-3 ${
                        examMode === 'study'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-500/20'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      <span>
                        Mulai {examMode === 'study' ? 'Mode Belajar (Instant Feedback)' : 'Mode Ujian (90 Menit)'}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Active Exam / Study Card */}
              {examStarted && !examSubmitted && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Remedial Banner if applicable */}
                  {isMistakeRetakeSession && (
                    <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-rose-300 flex items-center gap-2">
                        <span>🎯</span> Sesi Remedial: Mengulang {activeQuestionPool.length} Soal yang Salah Saja
                      </span>
                      <button
                        onClick={retakeFullExam}
                        className="text-[11px] font-extrabold text-slate-300 hover:text-white underline"
                      >
                        Kembali ke 20 Soal Penuh
                      </button>
                    </div>
                  )}

                  {/* Progress Header */}
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-400">
                          {examMode === 'study' ? 'Progres Belajar' : 'Progres Ujian'}
                        </span>
                        <span className="font-mono text-amber-400 font-bold">
                          {userAnswers.filter((a) => a !== -1).length} / {activeQuestionPool.length} Terjawab
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            examMode === 'study'
                              ? 'bg-gradient-to-r from-blue-500 to-emerald-400'
                              : 'bg-gradient-to-r from-amber-500 to-amber-400'
                          }`}
                          style={{
                            width: `${
                              (userAnswers.filter((a) => a !== -1).length / activeQuestionPool.length) * 100
                            }%`
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                          examMode === 'study'
                            ? 'bg-blue-950 text-blue-300 border-blue-800'
                            : 'bg-amber-950 text-amber-400 border-amber-800'
                        }`}
                      >
                        {examMode === 'study' ? 'Mode Belajar' : 'Mode Ujian'}
                      </span>
                    </div>
                  </div>

                  {/* Question Card Container */}
                  {(() => {
                    const q = activeQuestionPool[currentQuestionIdx];
                    const selected = userAnswers[currentQuestionIdx];
                    const hasAnsweredThis = selected !== -1;
                    const isHintVisible = revealedHints[currentQuestionIdx];
                    const isCorrect = selected === q.correct;

                    return (
                      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                        <div className="p-5 sm:p-8">
                          {/* Question Top Row */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">
                                {currentQuestionIdx + 1}
                              </span>
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${q.catColor}`}>
                                {q.category}
                              </span>
                            </div>

                            {/* Hint Button (Only in Study Mode, Hidden in Strict Exam Mode) */}
                            {examMode === 'study' && (
                              <button
                                onClick={() => toggleHint(currentQuestionIdx)}
                                className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl border transition-all ${
                                  isHintVisible
                                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-900 text-amber-400 border-amber-500/30 hover:bg-slate-800'
                                }`}
                              >
                                <span>💡</span>
                                <span>{isHintVisible ? 'Tutup Hint' : 'Buka Hint'}</span>
                              </button>
                            )}
                          </div>

                          {/* Question Text */}
                          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed mb-6">
                            {q.question}
                          </h3>

                          {/* Hint Box (Study Mode) */}
                          {examMode === 'study' && isHintVisible && (
                            <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs sm:text-sm leading-relaxed flex items-start gap-3 animate-fadeIn">
                              <span className="text-base flex-shrink-0">🔍</span>
                              <div>
                                <span className="font-black text-amber-400 uppercase tracking-wider block mb-0.5">
                                  Petunjuk Pengerjaan:
                                </span>
                                {q.hint}
                              </div>
                            </div>
                          )}

                          {/* Options Grid */}
                          <div className="space-y-3">
                            {q.options.map((opt, optIdx) => {
                              const isChoice = selected === optIdx;
                              const isThisCorrect = optIdx === q.correct;
                              const letters = ['A', 'B', 'C', 'D'];

                              // Dynamic styling based on mode and selection
                              let optionClass = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700';
                              let badgeClass = 'bg-slate-800 text-slate-400';

                              if (examMode === 'study') {
                                if (hasAnsweredThis) {
                                  if (isThisCorrect) {
                                    optionClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold shadow-md shadow-emerald-500/10';
                                    badgeClass = 'bg-emerald-500 text-slate-950';
                                  } else if (isChoice && !isThisCorrect) {
                                    optionClass = 'bg-rose-950/40 border-rose-500 text-rose-200 font-bold shadow-md shadow-rose-500/10 line-through';
                                    badgeClass = 'bg-rose-500 text-white';
                                  }
                                } else if (isChoice) {
                                  optionClass = 'bg-blue-500/10 border-blue-500 text-white';
                                  badgeClass = 'bg-blue-500 text-white';
                                }
                              } else {
                                // Strict Exam Mode: only highlight selection neutrally
                                if (isChoice) {
                                  optionClass = 'bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10';
                                  badgeClass = 'bg-amber-500 text-slate-950';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => selectAnswer(optIdx)}
                                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 ${optionClass}`}
                                >
                                  <span
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${badgeClass}`}
                                  >
                                    {letters[optIdx]}
                                  </span>
                                  <span className="text-xs sm:text-sm font-medium pt-0.5 leading-relaxed">
                                    {opt}
                                  </span>

                                  {/* Badges in Study Mode */}
                                  {examMode === 'study' && hasAnsweredThis && isThisCorrect && (
                                    <span className="ml-auto text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40 flex-shrink-0">
                                      Kunci Jawaban ✓
                                    </span>
                                  )}
                                  {examMode === 'study' && hasAnsweredThis && isChoice && !isThisCorrect && (
                                    <span className="ml-auto text-[10px] font-black uppercase text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/40 flex-shrink-0">
                                      Pilihan Anda ✗
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* ================================================== */}
                          {/* REQUIREMENT 1: INSTANT EXPLANATION BOX IN STUDY MODE */}
                          {/* ================================================== */}
                          {examMode === 'study' && hasAnsweredThis && (
                            <div className="mt-6 p-5 rounded-2xl bg-slate-900 border border-slate-800 animate-fadeIn space-y-3">
                              <div className="flex items-center justify-between">
                                <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  <span>{isCorrect ? '🎉' : '⚠️'}</span>
                                  <span>{isCorrect ? 'Analisis: Jawaban Anda Tepat!' : 'Analisis: Jawaban Belum Tepat'}</span>
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">
                                  Kunci: Pilihan {['A', 'B', 'C', 'D'][q.correct]}
                                </span>
                              </div>

                              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                                <span className="font-bold text-amber-400 block mb-1">💡 Pembahasan & Definisi Teknis:</span>
                                {q.explanation}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Bottom Question Matrix & Navigation */}
                        <div className="p-4 sm:px-8 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between">
                          <button
                            onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                            disabled={currentQuestionIdx === 0}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            ← Sebelumnya
                          </button>

                          {/* Dot Matrix Navigator */}
                          <div className="hidden sm:flex gap-1.5">
                            {activeQuestionPool.map((_, dotIdx) => {
                              const ans = userAnswers[dotIdx];
                              const isCurr = dotIdx === currentQuestionIdx;
                              let dotColor = 'bg-slate-800';

                              if (examMode === 'study') {
                                if (ans !== -1) {
                                  dotColor = ans === activeQuestionPool[dotIdx].correct ? 'bg-emerald-500' : 'bg-rose-500';
                                }
                              } else {
                                if (ans !== -1) dotColor = 'bg-slate-500';
                              }

                              return (
                                <button
                                  key={dotIdx}
                                  onClick={() => setCurrentQuestionIdx(dotIdx)}
                                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                                    isCurr ? 'ring-2 ring-amber-400 scale-125 ' + dotColor : dotColor
                                  }`}
                                />
                              );
                            })}
                          </div>

                          {currentQuestionIdx < activeQuestionPool.length - 1 ? (
                            <button
                              onClick={() => setCurrentQuestionIdx((p) => Math.min(activeQuestionPool.length - 1, p + 1))}
                              className="px-4 py-2 rounded-xl text-xs font-black bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all"
                            >
                              Selanjutnya →
                            </button>
                          ) : (
                            <button
                              onClick={submitExam}
                              className="px-5 py-2 rounded-xl text-xs font-black bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                            >
                              Selesai & Evaluasi ✓
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ============================================================ */}
              {/* REQUIREMENT 2: EXAM RESULT VIEW & MISTAKE RETAKE TRIGGER */}
              {/* ============================================================ */}
              {examSubmitted && examResults && (
                <div className="space-y-8 animate-fadeIn">
                  <div
                    className={`rounded-2xl border p-6 sm:p-8 text-center shadow-2xl ${
                      examResults.passed
                        ? 'bg-gradient-to-b from-emerald-950/40 to-slate-950 border-emerald-500/40'
                        : 'bg-gradient-to-b from-rose-950/40 to-slate-950 border-rose-500/40'
                    }`}
                  >
                    <div className="inline-block p-6 rounded-full bg-slate-900 border-4 border-amber-500/40 mb-4 shadow-xl">
                      <div className="text-4xl sm:text-5xl font-black text-white font-mono">
                        {examResults.percent}%
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                        Skor Akhir
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                      {examResults.passed ? '🎉 Selamat, Anda Dinyatakan LULUS!' : '📚 Belum Lulus Standar 70%'}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
                      {examResults.passed
                        ? `Skor Anda ${examResults.percent}%, melampaui batas standar 70%. Pertahankan performa ini untuk seleksi resmi BP2MI!`
                        : `Skor Anda ${examResults.percent}%, masih di bawah standar 70%. Review kembali pembahasan di bawah dan gunakan fitur remedial soal salah.`}
                    </p>

                    {/* Result Counts */}
                    <div className="grid grid-cols-3 max-w-xs mx-auto bg-slate-900/90 rounded-xl p-3 border border-slate-800 mb-6">
                      <div>
                        <div className="text-xl font-bold text-emerald-400">{examResults.correct}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Benar</div>
                      </div>
                      <div className="border-x border-slate-800">
                        <div className="text-xl font-bold text-rose-400">{examResults.wrong}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Salah</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-slate-400">{examResults.unanswered}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Kosong</div>
                      </div>
                    </div>

                    {/* Action Buttons: Full Retake vs Mistake Retake */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={retakeFullExam}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-5 py-3 rounded-xl transition-all text-xs sm:text-sm"
                      >
                        🔄 Ulangi Semua Soal
                      </button>

                      {/* REQUIREMENT 2: BUTTON ULANGI SOAL SALAH SAJA */}
                      {wrongQuestionIds.length > 0 && (
                        <button
                          onClick={retakeMistakesOnly}
                          className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-black px-6 py-3 rounded-xl transition-all shadow-lg shadow-rose-500/20 text-xs sm:text-sm flex items-center gap-2"
                        >
                          <span>🎯</span>
                          <span>Ulangi Soal yang Salah Saja ({wrongQuestionIds.length} Soal)</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Detailed Review of All Questions */}
                  <div className="space-y-4">
                    <h4 className="text-base font-black text-white flex items-center gap-2">
                      <span>📋</span> Pembahasan Lengkap Tiap Soal
                    </h4>

                    {activeQuestionPool.map((q, idx) => {
                      const userAns = userAnswers[idx];
                      const isCorrect = userAns === q.correct;
                      const isUnanswered = userAns === -1;
                      const letters = ['A', 'B', 'C', 'D'];

                      return (
                        <div
                          key={q.id}
                          className={`bg-slate-950 rounded-2xl border p-5 sm:p-6 mb-4 ${
                            isCorrect
                              ? 'border-emerald-500/30 bg-emerald-950/10'
                              : isUnanswered
                              ? 'border-slate-800'
                              : 'border-rose-500/30 bg-rose-950/10'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                                #{idx + 1}
                              </span>
                              <span className="text-xs text-slate-400 font-bold">{q.category}</span>
                            </div>
                            <span
                              className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                                isCorrect
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : isUnanswered
                                  ? 'bg-slate-800 text-slate-400'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {isCorrect ? '✓ Benar' : isUnanswered ? '— Kosong' : '✗ Salah'}
                            </span>
                          </div>

                          <p className="text-sm sm:text-base font-bold text-slate-100 mb-4 leading-relaxed">{q.question}</p>

                          <div className="space-y-2 mb-4">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rincian Evaluasi Seluruh Opsi Jawaban (A - D):</div>
                            {q.options.map((opt, oIdx) => {
                              const isThisCorrect = oIdx === q.correct;
                              const isChoice = oIdx === userAns;
                              
                              let optCardBg = isThisCorrect 
                                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
                                : isChoice 
                                ? 'bg-rose-950/30 border-rose-500/40 text-rose-200' 
                                : 'bg-slate-900/40 border-slate-800 text-slate-300';
                                
                              return (
                                <div key={oIdx} className={`p-3.5 rounded-xl border ${optCardBg}`}>
                                  <div className="flex items-start justify-between gap-2 mb-1.5">
                                    <div className="flex items-start gap-2 min-w-0">
                                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                                        isThisCorrect ? 'bg-emerald-500 text-slate-950' : isChoice ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                                      }`}>{letters[oIdx]}</span>
                                      <span className="text-xs sm:text-sm font-semibold">{opt}</span>
                                    </div>
                                    {isThisCorrect && (
                                      <span className="text-[9px] sm:text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40 flex-shrink-0">
                                        ✓ Kunci Benar
                                      </span>
                                    )}
                                    {isChoice && !isThisCorrect && (
                                      <span className="text-[9px] sm:text-[10px] font-black uppercase text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/40 flex-shrink-0">
                                        ✗ Pilihan Anda (Salah)
                                      </span>
                                    )}
                                  </div>
                                  <div className="mt-1.5 text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                                    {isThisCorrect ? (
                                      <span className="text-emerald-400 font-medium"><strong>✓ Mengapa Benar:</strong> Opsi ini merupakan jawaban yang tepat sesuai standar industri.</span>
                                    ) : (
                                      <span className="text-rose-300/90"><strong>✗ Mengapa Salah:</strong> Opsi "{opt}" bukan jawaban yang tepat karena tidak sesuai dengan parameter teknis atau regulasi yang ditanyakan.</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-blue-200 leading-relaxed flex items-start gap-2.5">
                            <span className="text-base flex-shrink-0">💡</span>
                            <div>
                              <span className="font-bold text-blue-400 block mb-0.5">Ringkasan Konsep & Standar:</span>
                              {q.explanation}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================ */}
          {/* REQUIREMENT 3: PAGE: QUICK CHEAT-SHEET (4 INTEGRATED TABS) */}
          {/* ================================================================ */}
          {currentPage === 'cheatsheet' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Hero */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
                <span className="bg-orange-500/20 text-orange-400 text-xs font-black px-3 py-1 rounded-full border border-orange-500/30 uppercase tracking-widest">
                  QUICK REFERENCE CHEAT-SHEET
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                  Panduan Cepat Pengelasan & Workshop English
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Ringkasan teknis terstruktur meliputi komparasi proses las (SMAW/GTAW/GMAW/FCAW), posisi 1G s/d 6G, identifikasi cacat las (welding defects) beserta perbaikannya, dan 20 kosakata kerja industri.
                </p>
              </div>

              {/* 4 Tab Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-800 pb-3">
                {[
                  { id: 'processes', label: '⚙️ Proses Las', desc: 'SMAW vs GTAW vs GMAW' },
                  { id: 'positions', label: '📐 Posisi 1G-6G', desc: 'Plate & Pipe Groove' },
                  { id: 'defects', label: '⚠️ Cacat Las', desc: 'Defects & Prevention' },
                  { id: 'vocab', label: '🗣️ Top 20 English', desc: 'Workshop Terms' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCheatTab(tab.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      activeCheatTab === tab.id
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black">{tab.label}</div>
                    <div className="text-[10px] text-slate-500 hidden sm:block mt-0.5">{tab.desc}</div>
                  </button>
                ))}
              </div>

              {/* TAB 1: PROCESSES ACCORDION CARDS */}
              {activeCheatTab === 'processes' && (
                <div className="space-y-4 animate-fadeIn">
                  {CHEAT_SHEET_PROCESSES.map((proc) => {
                    const isOpen = openCheatAccordions[proc.id] !== false; // Default open
                    return (
                      <div key={proc.id} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-md">
                        <div
                          onClick={() => toggleCheatAccordion(proc.id)}
                          className="p-5 bg-slate-900/80 flex items-center justify-between cursor-pointer hover:bg-slate-900 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-xs border border-amber-500/40">
                              {proc.code.split('/')[0]}
                            </span>
                            <div>
                              <h4 className="text-sm sm:text-base font-black text-white">{proc.name}</h4>
                              <p className="text-xs text-slate-400 font-mono">{proc.code}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-amber-400">{isOpen ? '▲ Tutup' : '▼ Rincian'}</span>
                        </div>

                        {isOpen && (
                          <div className="p-5 space-y-4 text-xs sm:text-sm border-t border-slate-800 animate-fadeIn">
                            <div className="grid sm:grid-cols-3 gap-3">
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                                <span className="text-[10px] font-black uppercase text-blue-400 block mb-1">Elektroda:</span>
                                <p className="text-slate-200">{proc.electrode}</p>
                              </div>
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                                <span className="text-[10px] font-black uppercase text-emerald-400 block mb-1">Gas Pelindung:</span>
                                <p className="text-slate-200">{proc.shielding}</p>
                              </div>
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                                <span className="text-[10px] font-black uppercase text-purple-400 block mb-1">Tipe Arus Listrik:</span>
                                <p className="text-slate-200">{proc.current}</p>
                              </div>
                            </div>

                            <div className="p-3.5 bg-slate-900/40 rounded-xl border border-slate-800 space-y-2">
                              <div>
                                <span className="font-bold text-amber-400">Aplikasi Terbaik: </span>
                                <span className="text-slate-300">{proc.bestFor}</span>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                                <div className="flex-1 text-emerald-300">
                                  <span className="font-bold">Keunggulan (+): </span>{proc.pros}
                                </div>
                                <div className="flex-1 text-rose-300">
                                  <span className="font-bold">Kelemahan (-): </span>{proc.cons}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 2: POSITIONS 1G - 6G */}
              {activeCheatTab === 'positions' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
                  {CHEAT_SHEET_POSITIONS.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            {p.pos}
                          </span>
                          <span className="text-xs font-mono text-amber-400">{p.stars}</span>
                        </div>
                        <h5 className="text-sm font-bold text-white mb-1">{p.name}</h5>
                        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-2">
                          {p.type}
                        </span>
                        <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                        Tingkat Kesulitan: Level {p.difficulty} dari 5
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: WELDING DEFECTS ACCORDION */}
              {activeCheatTab === 'defects' && (
                <div className="space-y-4 animate-fadeIn">
                  {CHEAT_SHEET_DEFECTS.map((defect, idx) => {
                    const isOpen = openCheatAccordions[`defect_${idx}`];
                    return (
                      <div key={idx} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-md">
                        <div
                          onClick={() => toggleCheatAccordion(`defect_${idx}`)}
                          className="p-4 sm:p-5 bg-slate-900/60 flex items-center justify-between cursor-pointer hover:bg-slate-900 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-black flex items-center justify-center text-xs border border-rose-500/30">
                              #{idx + 1}
                            </span>
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-white">{defect.name}</h4>
                              <p className="text-xs text-rose-400/90 font-mono">{defect.enTerm}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-400">{isOpen ? '▲' : '▼'}</span>
                        </div>

                        {isOpen && (
                          <div className="p-5 space-y-3 text-xs sm:text-sm border-t border-slate-800 animate-fadeIn">
                            <p className="text-slate-300 italic">{defect.description}</p>
                            <div className="grid sm:grid-cols-2 gap-3 pt-2">
                              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30">
                                <span className="text-[10px] font-black uppercase text-rose-400 block mb-1">
                                  Penyebab Utama (Root Causes):
                                </span>
                                <p className="text-slate-200 text-xs">{defect.causes}</p>
                              </div>
                              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                                <span className="text-[10px] font-black uppercase text-emerald-400 block mb-1">
                                  Solusi & Pencegahan WPS:
                                </span>
                                <p className="text-slate-200 text-xs">{defect.remedy}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 4: TOP 20 WORKSHOP ENGLISH */}
              {activeCheatTab === 'vocab' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex flex-wrap gap-2">
                    {['all', 'Dimension', 'Preparation', 'Fit-up', 'Parameter', 'Technique', 'Equipment', 'Tool', 'Gas', 'Defect', 'PPE', 'Safety'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveVocabCat(cat)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                          activeVocabCat === cat
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        {cat === 'all' ? 'Semua Istilah (20)' : cat}
                      </button>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    {CHEAT_SHEET_VOCAB.filter((v) => activeVocabCat === 'all' || v.category === activeVocabCat).map((v, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h5 className="text-sm sm:text-base font-black text-white">{v.en}</h5>
                            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-800">
                              {v.category}
                            </span>
                          </div>
                          <p className="text-xs text-blue-300 font-medium mb-2.5">{v.id}</p>
                          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-300 italic">
                            {v.example}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================ */}
          {/* 3. PAGE: MATERI BP2MI (5 SESI KUNCI) */}
          {/* ================================================================ */}
          {currentPage === 'materi-bp2mi' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <span className="bg-blue-500/20 text-blue-400 text-xs font-black px-3 py-1 rounded-full border border-blue-500/30 uppercase tracking-widest">
                  PANDUAN KHUSUS WAWANCARA
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                  Materi Wawancara BP2MI / BP3MI
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Panduan taktis menjawab 5 pertanyaan kunci pewawancara seleksi pelatihan SMK Go Global untuk penempatan Welder internasional melalui jalur resmi negara.
                </p>
              </div>

              {/* Sesi Pembuka Box */}
              <div className="p-5 rounded-2xl bg-blue-950/30 border-2 border-blue-500/40 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-lg shadow-lg">
                  🎙️
                </div>
                <div>
                  <h4 className="text-xs font-black text-blue-300 uppercase tracking-wider mb-1">
                    Sesi Pembuka (Interviewer Prompt)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "Selamat pagi/siang. Terima kasih sudah mendaftar di Program Pelatihan SMK Go Global untuk posisi Welder - Bahasa Inggris. Berkas administrasi dan Kartu AK-1 Anda sudah kami verifikasi dan sinkronisasi lewat QR-code. Sebelum kita masuk ke ruang praktik, ada beberapa hal penting yang ingin kami konfirmasi dari Anda. Tolong dijawab dengan jelas:"
                  </p>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {['all', 'Motivasi & Komitmen', 'Kompetensi Teknis', 'Kesehatan & K3', 'Disiplin & Asrama', 'Adaptasi Global'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveMaterialCat(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        activeMaterialCat === cat
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/20'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {cat === 'all' ? 'Semua (5 Sesi)' : cat}
                    </button>
                  )
                )}
              </div>

              {/* Materials Cards */}
              <div className="space-y-4">
                {BP2MI_MATERIALS.filter(
                  (m) => activeMaterialCat === 'all' || m.category === activeMaterialCat
                ).map((mat) => {
                  const isOpen = openMaterialAccordions[mat.id];
                  return (
                    <div key={mat.id} className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 font-black flex items-center justify-center text-sm flex-shrink-0">
                          #{mat.id}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                              {mat.category}
                            </span>
                            <span className="text-xs text-slate-500 font-mono font-bold">{mat.sessionNumber}</span>
                          </div>
                          <h4 className="text-base font-bold text-white mb-2">{mat.title}</h4>
                          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                            <span className="font-bold text-blue-400">Q: </span>
                            "{mat.interviewerQuestion}"
                          </div>
                        </div>
                      </div>

                      {/* Accordion Toggle */}
                      <div className="mt-4 pt-4 border-t border-slate-800/80">
                        <button
                          onClick={() =>
                            setOpenMaterialAccordions((prev) => ({ ...prev, [mat.id]: !prev[mat.id] }))
                          }
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-blue-300 border border-slate-800 transition-all"
                        >
                          <span className="flex items-center gap-2">
                            <span>💡</span> Buka Rekomendasi Jawaban & Poin Taktis
                          </span>
                          <span className="text-sm">{isOpen ? '▲' : '▼'}</span>
                        </button>

                        {isOpen && (
                          <div className="mt-4 space-y-4 animate-fadeIn text-xs sm:text-sm">
                            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider">
                                  Rekomendasi Jawaban Terbaik:
                                </span>
                                <button
                                  onClick={() => copyToClipboard(mat.recommendedAnswer, `Jawaban ${mat.title}`)}
                                  className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1"
                                >
                                  <span>📋</span> Salin Teks
                                </button>
                              </div>
                              <p className="text-slate-200 leading-relaxed italic">"{mat.recommendedAnswer}"</p>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                              <h5 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-2">
                                Poin Kunci & Strategi Respon:
                              </h5>
                              <ul className="space-y-1.5 text-slate-300 text-xs">
                                {mat.keyPoints.map((pt, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-2">
                                    <span className="text-amber-400 font-bold">•</span>
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 4. PAGE: ENGLISH INTERVIEW PRACTICE */}
          {/* ================================================================ */}
          {currentPage === 'interview' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-black px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-widest">
                  GLOBAL RECRUITMENT SIMULATOR
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                  English Interview Simulator
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Latihan menjawab 8 pertanyaan wawancara rekrutmen juru las global. Dilengkapi panduan jawaban profesional dalam Bahasa Inggris teknis dan terjemahan Bahasa Indonesia.
                </p>
              </div>

              <div className="space-y-4">
                {ENGLISH_INTERVIEW_QUESTIONS.map((item, idx) => {
                  const isOpen = openInterviewAccordions[idx];
                  return (
                    <div key={idx} className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-md">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 font-black flex items-center justify-center text-xs flex-shrink-0">
                          Q{idx + 1}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">"{item.question}"</h4>
                          <p className="text-xs text-amber-400/90 mt-1 font-medium">💡 Tip: {item.tip}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setOpenInterviewAccordions((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-emerald-300 border border-slate-800 transition-all mt-2"
                      >
                        <span>Lihat Panduan Jawaban (English & Indo)</span>
                        <span>{isOpen ? '▲' : '▼'}</span>
                      </button>

                      {isOpen && (
                        <div className="mt-4 space-y-3 text-xs sm:text-sm animate-fadeIn">
                          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block mb-1">
                              Best Answer (English):
                            </span>
                            <p className="text-emerald-200 italic leading-relaxed">{item.answer}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 block mb-1">
                              Terjemahan (Bahasa Indonesia):
                            </span>
                            <p className="text-slate-300 leading-relaxed">{item.translation}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 5. PAGE: CHECKLIST KESIAPAN */}
          {/* ================================================================ */}
          {currentPage === 'checklist' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
                <span className="bg-purple-500/20 text-purple-400 text-xs font-black px-3 py-1 rounded-full border border-purple-500/30 uppercase tracking-widest">
                  TRACKER KESIAPAN DOKUMEN & ASRAMA
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                  Checklist Kesiapan Pekerja Migran
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Pantau kelengkapan berkas dokumen, kesehatan fisik medical check-up, keterampilan las, dan persiapan mental asrama.
                </p>
              </div>

              {/* Progress Bar Summary */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-300">Total Progres Kelengkapan</span>
                  <span className="text-lg font-mono font-black text-amber-400">{checklistStats.percent}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${checklistStats.percent}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {checklistStats.checkedItems} dari {checklistStats.totalItems} item telah terpenuhi
                </p>
              </div>

              {/* Checklist Sections */}
              <div className="space-y-6">
                {CHECKLIST_SECTIONS.map((section, sIdx) => {
                  const sectionChecked = section.items.filter((i) => checklist[i.id]).length;
                  return (
                    <div key={sIdx} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{section.title}</h4>
                        <span className="text-xs font-mono text-slate-400 font-bold">
                          {sectionChecked}/{section.items.length}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        {section.items.map((item) => {
                          const isChecked = !!checklist[item.id];
                          return (
                            <label
                              key={item.id}
                              className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-900/60 cursor-pointer transition-all border border-transparent hover:border-slate-800"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleChecklistItem(item.id)}
                                className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-400"
                              />
                              <span
                                className={`text-xs sm:text-sm font-medium transition-all ${
                                  isChecked ? 'text-slate-500 line-through' : 'text-slate-200'
                                }`}
                              >
                                {item.text}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
