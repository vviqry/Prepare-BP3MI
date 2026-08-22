import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================================================
// 1. DATA MASTER: 20 SOAL INTERAKTIF (LENGKAP DENGAN HINT & PEMBAHASAN TEKNIS)
// ============================================================================
const INITIAL_QUESTIONS = [
  // --- TECHNICAL WELDING (1 - 6) ---
  {
    id: 1,
    category: 'Technical Welding',
    catColor: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
    question: 'What does SMAW stand for in industrial welding terminology?',
    options: [
      'Submerged Metal Arc Welding',
      'Shielded Metal Arc Welding',
      'Standard Manual Arc Welding',
      'Semi-Manual Alloy Welding'
    ],
    correct: 1,
    hint: 'Proses ini populer dengan sebutan "Stick Welding" karena memanfaatkan elektroda stik berbalut fluks pelindung (shielding flux).',
    explanation: 'SMAW = Shielded Metal Arc Welding (Las Busur Listrik Terlindung / Las Stik). Fluks kimiawi pada elektroda terbakar menghasilkan gas pelindung dan lapisan terak (slag) untuk mengisolasi kubangan las cair dari kontaminasi oksigen atmosfer.'
  },
  {
    id: 2,
    category: 'Technical Welding',
    catColor: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
    question: 'Dalam standardisasi posisi pengelasan pelat alur (plate groove), kode posisi "3G" merujuk pada pengelasan:',
    options: [
      'Posisi Datar / Flat (Bawah tangan)',
      'Posisi Horizontal (Mendatar sejajar sumbu)',
      'Posisi Vertikal / Tegak (Vertical-Up / Vertical-Down)',
      'Posisi Overhead (Di atas kepala)'
    ],
    correct: 2,
    hint: 'Kode standar AWS: 1 = Flat, 2 = Horizontal, 3 = Vertikal, 4 = Overhead. Huruf "G" menandakan alur sambungan (Groove).',
    explanation: 'Posisi 3G adalah posisi pengelasan alur (groove) vertikal tegak pada pelat. Pengelasan dapat diarahkan naik (vertical-up) untuk penetrasi maksimal pada pelat tebal, atau turun (vertical-down) untuk pelat tipis.'
  },
  {
    id: 3,
    category: 'Technical Welding',
    catColor: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
    question: 'Which welding process utilizes a non-consumable tungsten electrode and a shielding gas such as 100% pure Argon?',
    options: [
      'SMAW (Shielded Metal Arc Welding)',
      'GMAW (MIG/MAG Welding)',
      'GTAW (Gas Tungsten Arc Welding / TIG)',
      'FCAW (Flux-Cored Arc Welding)'
    ],
    correct: 2,
    hint: 'Huruf "T" mewakili unsur logam keras tahan panas "Tungsten" yang tidak ikut mencair saat pengelasan.',
    explanation: 'GTAW (Gas Tungsten Arc Welding) atau TIG menggunakan elektroda tungsten non-consumable (tidak habis mencair) dengan gas pelindung inert murni (Argon/Helium), menghasilkan sambungan presisi tinggi tanpa spatter.'
  },
  {
    id: 4,
    category: 'Technical Welding',
    catColor: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
    question: 'Cacat las (welding defect) berupa rongga gas berbentuk bulat atau silinder yang terperangkap di dalam deposit logam las disebut:',
    options: [
      'Undercut',
      'Porosity (Porositas)',
      'Slag Inclusion (Terak Terjebak)',
      'Incomplete Fusion'
    ],
    correct: 1,
    hint: 'Cacat berpori menyerupai busa/spons akibat kelembaban fluks atau hembusan angin yang merusak selimut gas pelindung.',
    explanation: 'Porosity (porositas) timbul akibat gas yang terperangkap saat cairan las membeku cepat. Penyebab utama: elektroda lembab, kontaminasi minyak/karat pada base metal, atau laju aliran gas pelindung tidak stabil.'
  },
  {
    id: 5,
    category: 'Technical Welding',
    catColor: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
    question: 'In GMAW (MIG/MAG welding), what is the primary purpose of using an active gas mixture (such as 80% Argon + 20% CO2)?',
    options: [
      'To increase electrical resistance across the ground cable',
      'To shield the molten weld pool and stabilize the electric arc penetration',
      'To continuously cool down the contact tip inside the torch handle',
      'To eliminate the requirement for personal protective equipment'
    ],
    correct: 1,
    hint: 'Gas pelindung berfungsi mengisolasi cairan logam las dari oksigen dan nitrogen atmosfer sekaligus menjaga busur las tetap stabil.',
    explanation: 'Campuran gas Ar + CO2 pada MAG berfungsi menyelimuti cairan las (shielding) dari oksidasi udara bebas serta menstabilkan busur transfer logam dan meningkatkan kedalaman penetrasi pada baja karbon.'
  },
  {
    id: 6,
    category: 'Technical Welding',
    catColor: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
    question: 'Posisi pengujian juru las pipa tetap dengan sumbu kemiringan 45 derajat tanpa boleh diputar (fixed pipe) diklasifikasikan sebagai:',
    options: [
      'Posisi 1G Pipe',
      'Posisi 2G Pipe',
      'Posisi 5G Pipe',
      'Posisi 6G Pipe'
    ],
    correct: 3,
    hint: 'Ini adalah kualifikasi tertinggi dalam sertifikasi juru las pipa (pipe welder) dengan tingkat kesulitan seluruh posisi gabungan.',
    explanation: 'Posisi 6G adalah standar kualifikasi tertinggi di mana pipa dipasang miring 45° dan tidak dapat diputar. Welder wajib menguasai kombinasi posisi flat, vertical, horizontal, dan overhead secara terpadu.'
  },

  // --- WORKSHOP ENGLISH (7 - 11) ---
  {
    id: 7,
    category: 'Workshop English',
    catColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
    question: 'What is the correct English term for "palu terak" used to chip away solidified flux slag after completing a weld bead?',
    options: [
      'Ball-peen hammer',
      'Chipping hammer',
      'Sledge hammer',
      'Claw hammer'
    ],
    correct: 1,
    hint: 'Kata dasarnya adalah "chip" yang berarti memecah atau mengelupas kerak terak kecil.',
    explanation: 'Chipping hammer (palu ketok terak) memiliki dua ujung (runcing dan pipih) khusus untuk merontokkan kerak terak (slag) pada proses las SMAW atau FCAW.'
  },
  {
    id: 8,
    category: 'Workshop English',
    catColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
    question: 'On an engineering blueprint and welding drawing, what does the technical abbreviation "WPS" stand for?',
    options: [
      'Welding Procedure Specification',
      'Weld Position Standard',
      'Workshop Production Schedule',
      'Wire Processing System'
    ],
    correct: 0,
    hint: 'Dokumen panduan parameter pengelasan resmi yang menguraikan voltase, ampere, jenis kawat las, dan suhu kerja.',
    explanation: 'WPS (Welding Procedure Specification) adalah dokumen formal yang menyediakan panduan instruksi teknis kepada juru las mengenai variabel pengelasan yang telah terkualifikasi melalui uji PQR (Procedure Qualification Record).'
  },
  {
    id: 9,
    category: 'Workshop English',
    catColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
    question: '"Adjust the wire feed speed and ensure proper shielding gas flow rate before striking the arc." — Instruksi ini digunakan pada proses:',
    options: [
      'Manual Oxy-Acetylene Cutting (OAW)',
      'Gas Metal Arc Welding (GMAW / MIG)',
      'Shielded Metal Arc Welding (SMAW)',
      'Submerged Arc Welding (SAW)'
    ],
    correct: 1,
    hint: 'Perhatikan kata kunci: "wire feed speed" (kecepatan gulungan kawat) dan "shielding gas flow rate".',
    explanation: 'Instruksi "wire feed speed" dan "gas flow rate" merupakan pengaturan khas pada mesin las semi-otomatis GMAW (MIG/MAG) atau FCAW yang menggunakan kawat gulungan continue roll.'
  },
  {
    id: 10,
    category: 'Workshop English',
    catColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
    question: 'What is the Indonesian equivalent for the industrial safety instruction: "Inspect the ground clamp connection to prevent stray current"?',
    options: [
      'Periksa regulator gas untuk mencegah kebocoran selang',
      'Periksa koneksi klem massa (ground clamp) untuk mencegah arus liar',
      'Ganti stang las elektroda agar tidak terjadi sengatan listrik',
      'Matikan sakelar utama ketika kabel las mulai memanas'
    ],
    correct: 1,
    hint: '"Ground clamp" = klem penjepit massa arde benda kerja, "stray current" = arus bocor atau arus liar.',
    explanation: 'Ground clamp adalah klem massa yang dijepitkan ke benda kerja. Sambungan yang longgar atau kotor dapat memicu timbulnya arus liar (stray current), percikan busur tak terkontrol, dan kerusakan peralatan listrik.'
  },
  {
    id: 11,
    category: 'Workshop English',
    catColor: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
    question: 'Which English phrase correctly describes the defect where the weld metal fails to penetrate completely through the root of the joint?',
    options: [
      'Excessive Spatter',
      'Incomplete Root Penetration (Lack of Penetration)',
      'Root Concavity',
      'Overfill Crown'
    ],
    correct: 1,
    hint: 'Perhatikan istilah dasar kata "penetrate" (penembusan) dan "root" (akar celah sambungan).',
    explanation: 'Incomplete Root Penetration (kurang penembusan akar) terjadi apabila logam las cair gagal mengisi dan melebur penuh hingga ke dasar akar sambungan (root gap).'
  },

  // --- K3 SAFETY STANDARDS (12 - 16) ---
  {
    id: 12,
    category: 'K3 Safety Standards',
    catColor: 'bg-amber-900/40 text-amber-300 border-amber-700/50',
    question: 'Tingkat kegelapan kaca filter (Shade Number) berapakah yang direkomendasikan standar ANSI Z87.1 untuk proses SMAW dengan arus kerja 100 – 150 Ampere?',
    options: [
      'Shade #5 - #6',
      'Shade #8',
      'Shade #10',
      'Shade #14'
    ],
    correct: 2,
    hint: 'Shade 5 untuk pemotongan oksi-asetilen, shade 8 untuk arus di bawah 75A, dan shade 10 adalah standar wajib untuk 100-150A.',
    explanation: 'Standar ANSI Z87.1 menetapkan filter shade #10 untuk las busur SMAW berarus 75–150A guna memblokir radiasi sinar ultraviolet (UV) dan inframerah (IR) berbahaya.'
  },
  {
    id: 13,
    category: 'K3 Safety Standards',
    catColor: 'bg-amber-900/40 text-amber-300 border-amber-700/50',
    question: 'Manakah prosedur K3 yang BENAR saat memindahkan dan menyimpan tabung gas bertekanan tinggi (Argon, CO2, Oksigen) di workshop?',
    options: [
      'Menggelindingkan tabung secara horizontal di atas lantai agar lebih cepat',
      'Menyimpan tabung dalam posisi berdiri tegak dan diikat/dirantai kuat pada dinding pengaman',
      'Membuka safety valve cap saat tabung diangkat menggunakan crane/forklift',
      'Menempatkan tabung berdampingan tepat di sebelah sumber percikan api las'
    ],
    correct: 1,
    hint: 'Tabung bertekanan tinggi berpotensi menjadi proyektil mematikan apabila roboh atau katup kepalanya patah terkena benturan.',
    explanation: 'Tabung gas bertekanan tinggi wajib disimpan dalam posisi tegak (vertikal), diikat rantai pengaman, tutup pelindung katup (safety cap) terpasang, dan dijauhkan minimal 6 meter dari sumber panas/api.'
  },
  {
    id: 14,
    category: 'K3 Safety Standards',
    catColor: 'bg-amber-900/40 text-amber-300 border-amber-700/50',
    question: 'Kondisi iritasi kornea mata akibat paparan langsung radiasi sinar UV busur las tanpa kacamata pelindung disebut secara medis:',
    options: [
      'Astigmatisme Akut',
      'Photokeratitis / Arc Eye (Welder’s Flash)',
      'Katarak Traumatik',
      'Presbiopia'
    ],
    correct: 1,
    hint: 'Dikenal di kalangan welder dengan sebutan "Welder\'s Flash" dengan gejala rasa berpasir dan terbakar pada mata.',
    explanation: 'Arc Eye atau Welder\'s Flash (Photokeratitis) adalah luka bakar radiasi UV pada kornea mata. Gejalanya mata merah, berair parah, silau, dan terasa ada butiran pasir beberapa jam pasca paparan.'
  },
  {
    id: 15,
    category: 'K3 Safety Standards',
    catColor: 'bg-amber-900/40 text-amber-300 border-amber-700/50',
    question: 'When welding inside a "Confined Space" (tangki tertutup, ruang sempit kapal), what critical safety measure is mandatory?',
    options: [
      'Using only 100% pure oxygen ventilation to keep workers awake',
      'Continuous atmospheric gas testing, proper exhaust ventilation, and a designated standby safety observer outside',
      'Working alone in silence to avoid disturbing colleagues',
      'Switching off all ventilation blowers to save electricity'
    ],
    correct: 1,
    hint: 'Ruang terbatas rentan penumpukan gas beracun dan defisiensi oksigen, sehingga mutlak membutuhkan pemantauan udara dan pengawas standby.',
    explanation: 'Pekerjaan di confined space mewajibkan uji kualitas udara (O2, LEL, H2S/CO), ventilasi forced air/exhaust blower, izin kerja (hot work permit), dan seorang safety watcher standby di pintu masuk.'
  },
  {
    id: 16,
    category: 'K3 Safety Standards',
    catColor: 'bg-amber-900/40 text-amber-300 border-amber-700/50',
    question: 'Bahan APD sarung tangan dan apron juru las yang paling aman terhadap percikan logam cair (spatter) dan konduksi panas adalah terbuat dari:',
    options: [
      'Kulit split sapi asli tahan panas (Heavy Duty Split Cowhide Leather)',
      'Kain nilon sintetis elastis',
      'Karet sintetis PVC tahan air',
      'Kain poliester rajut tebal'
    ],
    correct: 0,
    hint: 'Bahan sintetis sintetis akan meleleh saat terkena panas membakar kulit, sehingga kulit sapi alami adalah standar mutlak.',
    explanation: 'Bahan kulit split sapi asli (cowhide leather) memiliki ketahanan abrasi dan panas yang sangat tinggi, tidak meleleh saat terkena percikan spatter, serta memberikan isolasi termal yang kokoh.'
  },

  // --- REGULASI MIGRAN & LOGIKA SPASIAL (17 - 20) ---
  {
    id: 17,
    category: 'Regulasi & Logika',
    catColor: 'bg-purple-900/40 text-purple-300 border-purple-700/50',
    question: 'Berdasarkan UU No. 18 Tahun 2017 tentang Pelindungan Pekerja Migran Indonesia, platform resmi satu pintu milik BP2MI untuk pendataan dan verifikasi dokumen calon PMI adalah:',
    options: [
      'SIAPkerja Kemnaker',
      'SISKOP2MI (Sistem Komputerisasi Pelayanan Penempatan dan Pelindungan PMI)',
      'SIMDA Migran',
      'Portal Paspor Ditjen Imigrasi'
    ],
    correct: 1,
    hint: 'Singkatan resmi dari Sistem Komputerisasi Pelayanan Penempatan dan Pelindungan Pekerja Migran Indonesia.',
    explanation: 'SISKOP2MI adalah sistem database terintegrasi milik BP2MI yang merekam seluruh tahapan registrasi, rekam medis, verifikasi perjanjian kerja, e-PMI, hingga monitoring kepulangan PMI secara legal dan terlindungi.'
  },
  {
    id: 18,
    category: 'Regulasi & Logika',
    catColor: 'bg-purple-900/40 text-purple-300 border-purple-700/50',
    question: 'Tahapan wajib yang harus diikuti oleh calon Pekerja Migran Indonesia (PMI) setelah lulus medical check-up dan sebelum diberangkatkan ke negara tujuan penempatan adalah:',
    options: [
      'Uji Kompetensi Ulang di Bandara Internasional',
      'PAP (Pembekalan Akhir Pemberangkatan) / Orientasi Pra-Pemberangkatan',
      'Wawancara Langsung di Kedutaan Besar Tanpa Dokumen',
      'Pelatihan Bahasa Tambahan Mandiri Tanpa Pengawasan'
    ],
    correct: 1,
    hint: 'Program orientasi resmi dari pemerintah mengenai regulasi, hak-kewajiban, hukum lokal, dan pencegahan masalah sebelum terbang.',
    explanation: 'PAP (Pembekalan Akhir Pemberangkatan) diselenggarakan oleh BP3MI/BP2MI untuk memberikan pemahaman mengenai hak dan kewajiban ketenagakerjaan, adat istiadat negara penempatan, dan akses bantuan darurat KBRI.'
  },
  {
    id: 19,
    category: 'Regulasi & Logika',
    catColor: 'bg-purple-900/40 text-purple-300 border-purple-700/50',
    question: 'Tes Logika Spasial: Sebuah pipa silinder baja dipotong miring tepat bersudut 45 derajat. Bentuk penampang bidang potongan (cross-section surface) pipa tersebut adalah:',
    options: [
      'Lingkaran sempurna (Perfect Circle)',
      'Elips / Lonjong (Ellipse)',
      'Segitiga siku-siku (Right Triangle)',
      'Persegi panjang (Rectangle)'
    ],
    correct: 1,
    hint: 'Potongan tegak lurus 90° menghasilkan lingkaran bulat; potongan bersudut miring menghasilkan bentuk oval lonjong simetris.',
    explanation: 'Secara geometri kerucut dan silinder, bidang potong yang memotong silinder lingkaran secara miring (non-tegak lurus) menghasilkan penampang berbentuk Elips (lonjong simetris).'
  },
  {
    id: 20,
    category: 'Regulasi & Logika',
    catColor: 'bg-purple-900/40 text-purple-300 border-purple-700/50',
    question: 'Manakah kombinasi dokumen mutlak yang wajib dimiliki oleh Pekerja Migran Indonesia saat bekerja di luar negeri secara prosedural (resmi)?',
    options: [
      'Hanya KTP dan Paspor Turis (Visa Kunjungan Singkat)',
      'Paspor, Visa Kerja Resmi, Perjanjian Kerja (PK), dan Terdaftar di SISKOP2MI (e-PMI)',
      'Surat Rekomendasi Kepala Desa dan Tiket Pesawat Pulang-Pergi',
      'Sertifikat Kursus Singkat tanpa Visa Kerja Legal'
    ],
    correct: 1,
    hint: 'Bekerja secara legal mewajibkan visa kerja (bukan visa wisata), kontrak kerja resmi, dan perlindungan e-PMI BP2MI.',
    explanation: 'Penempatan kerja luar negeri prosedural mewajibkan: Paspor, Visa Kerja (Employment Visa), Kontrak Perjanjian Kerja (PK) yang disahkan KBRI, kepesertaan BPJS Ketenagakerjaan PMI, dan e-PMI resmi SISKOP2MI.'
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
                          className={`bg-slate-950 rounded-xl border p-5 ${
                            isCorrect
                              ? 'border-emerald-500/30 bg-emerald-950/10'
                              : isUnanswered
                              ? 'border-slate-800'
                              : 'border-rose-500/30 bg-rose-950/10'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                                #{idx + 1}
                              </span>
                              <span className="text-xs text-slate-400">{q.category}</span>
                            </div>
                            <span
                              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                isCorrect
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : isUnanswered
                                  ? 'bg-slate-800 text-slate-400'
                                  : 'bg-rose-500/20 text-rose-400'
                              }`}
                            >
                              {isCorrect ? '✓ Benar' : isUnanswered ? '— Kosong' : '✗ Salah'}
                            </span>
                          </div>

                          <p className="text-sm font-bold text-slate-200 mb-3">{q.question}</p>

                          <div className="space-y-1 mb-3 text-xs">
                            {q.options.map((opt, oIdx) => (
                              <div
                                key={oIdx}
                                className={`p-2 rounded flex items-center justify-between ${
                                  oIdx === q.correct
                                    ? 'bg-emerald-950/40 text-emerald-300 font-bold border border-emerald-500/30'
                                    : oIdx === userAns && !isCorrect
                                    ? 'bg-rose-950/40 text-rose-300 font-bold line-through border border-rose-500/30'
                                    : 'text-slate-400'
                                }`}
                              >
                                <span>
                                  {letters[oIdx]}. {opt}
                                </span>
                                {oIdx === q.correct && (
                                  <span className="text-[10px] text-emerald-400 font-bold">Kunci Jawaban</span>
                                )}
                                {oIdx === userAns && !isCorrect && (
                                  <span className="text-[10px] text-rose-400 font-bold">Pilihan Anda</span>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                            <span className="font-bold text-amber-400">💡 Penjelasan: </span>
                            {q.explanation}
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
