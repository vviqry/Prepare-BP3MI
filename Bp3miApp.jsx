import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ==========================================
// 1. DATA MASTER: 20 SOAL INTERAKTIF DENGAN HINT
// ==========================================
const INITIAL_QUESTIONS = [
  // --- TECHNICAL WELDING (1 - 6) ---
  {
    id: 1,
    category: 'Technical Welding',
    catColor: 'bg-blue-100 text-blue-700 border-blue-200',
    question: 'What does SMAW stand for in industrial welding terminology?',
    options: [
      'Submerged Metal Arc Welding',
      'Shielded Metal Arc Welding',
      'Standard Manual Arc Welding',
      'Semi-Manual Alloy Welding'
    ],
    correct: 1,
    hint: 'Proses ini sering disebut "Stick Welding" karena menggunakan elektroda stik terbungkus fluks pelindung (shielding flux).',
    explanation: 'SMAW = Shielded Metal Arc Welding (Las Busur Listrik Terlindung / Las Stik). Fluks pada elektroda terbakar menghasilkan gas pelindung dan terak (slag) untuk melindungi kubangan las dari oksigen udara.'
  },
  {
    id: 2,
    category: 'Technical Welding',
    catColor: 'bg-blue-100 text-blue-700 border-blue-200',
    question: 'Dalam standardisasi pengelasan pelat (plate), kode posisi pengelasan "3G" merujuk pada posisi apa?',
    options: [
      'Posisi Datar / Flat (bawah tangan)',
      'Posisi Horizontal (mendatar)',
      'Posisi Vertikal / Tegak (naik/turun)',
      'Posisi Overhead (di atas kepala)'
    ],
    correct: 2,
    hint: 'Angka 1 = Flat, 2 = Horizontal, 3 = Vertikal, 4 = Overhead. Huruf "G" merujuk pada sambungan alur (Groove).',
    explanation: 'Posisi 3G adalah posisi pengelasan vertikal (Vertical Position) untuk sambungan alur pelat (Groove). Pengelasan dapat dilakukan dengan teknik vertical-up atau vertical-down.'
  },
  {
    id: 3,
    category: 'Technical Welding',
    catColor: 'bg-blue-100 text-blue-700 border-blue-200',
    question: 'Which welding process utilizes a non-consumable tungsten electrode and a shielding gas such as 100% Argon?',
    options: [
      'SMAW (Stick Welding)',
      'GMAW (MIG Welding)',
      'GTAW (TIG Welding)',
      'FCAW (Flux-Cored Arc Welding)'
    ],
    correct: 2,
    hint: 'Huruf "T" pada singkatannya merujuk pada unsur logam tahan panas tinggi berikatan "Tungsten".',
    explanation: 'GTAW (Gas Tungsten Arc Welding) atau TIG (Tungsten Inert Gas) menggunakan elektroda tungsten yang tidak ikut mencair (non-consumable) dan gas argon murni sebagai pelindung.'
  },
  {
    id: 4,
    category: 'Technical Welding',
    catColor: 'bg-blue-100 text-blue-700 border-blue-200',
    question: 'Cacat las (welding defect) berupa lubang-lubang kecil atau rongga gas yang terperangkap di dalam deposit logam las disebut:',
    options: [
      'Undercut',
      'Porosity (Porositas)',
      'Slag Inclusion',
      'Lack of Fusion'
    ],
    correct: 1,
    hint: 'Cacat ini menyerupai rongga spons/busa berpori yang disebabkan oleh kelembaban fluks atau aliran gas pelindung yang terganggu angin.',
    explanation: 'Porosity (porositas) terbentuk akibat gas yang terperangkap saat logam las membeku cepat. Penyebab utamanya adalah elektroda lembab, kontaminasi minyak/karat, atau hembusan angin pada gas pelindung.'
  },
  {
    id: 5,
    category: 'Technical Welding',
    catColor: 'bg-blue-100 text-blue-700 border-blue-200',
    question: 'In GMAW (MIG/MAG welding), what is the primary function of the shielding gas cylinder mixture (e.g., Ar + CO2)?',
    options: [
      'To increase electrical resistance and melt the wire faster',
      'To isolate and protect the molten weld pool from oxygen and nitrogen atmospheric contamination',
      'To cool down the welding gun handle continuously',
      'To add alloy elements to the steel base metal'
    ],
    correct: 1,
    hint: 'Udara luar mengandung oksigen dan nitrogen yang dapat merusak kualitas ikatan logam cair jika tidak diselimuti (shielded).',
    explanation: 'Fungsi utama gas pelindung pada GMAW adalah menyelimuti dan mengisolasi cairan logam las (molten weld pool) agar tidak teroksidasi oleh oksigen atau terkontaminasi nitrogen dari atmosfer bebas.'
  },
  {
    id: 6,
    category: 'Technical Welding',
    catColor: 'bg-blue-100 text-blue-700 border-blue-200',
    question: 'Posisi pengelasan pipa tetap dengan sumbu kemiringan 45 derajat tanpa boleh diputar (fixed position) diklasifikasikan sebagai:',
    options: [
      'Posisi 1G Pipe',
      'Posisi 2G Pipe',
      'Posisi 5G Pipe',
      'Posisi 6G Pipe'
    ],
    correct: 3,
    hint: 'Ini adalah kualifikasi tingkat tertinggi untuk sertifikasi juru las pipa dengan sudut kemiringan 45°.',
    explanation: 'Posisi 6G adalah posisi pengujian pipa paling komprehensif di mana pipa dipasang pada sudut kemiringan 45° dan tidak boleh diputar. Welder yang lulus 6G umumnya terkualifikasi untuk semua posisi lainnya.'
  },

  // --- WORKSHOP ENGLISH (7 - 11) ---
  {
    id: 7,
    category: 'Workshop English',
    catColor: 'bg-green-100 text-green-700 border-green-200',
    question: 'What is the correct English term for "palu terak" used to chip away solidified flux slag after completing a weld bead?',
    options: [
      'Ball-peen hammer',
      'Chipping hammer',
      'Sledge hammer',
      'Claw hammer'
    ],
    correct: 1,
    hint: 'Kata dasarnya adalah "chip" (mengelupas/memecah kerak kecil).',
    explanation: 'Chipping hammer (palu ketok terak) memiliki ujung runcing dan ujung pipih pahat untuk membersihkan terak sisa pembakaran fluks pada las SMAW atau FCAW.'
  },
  {
    id: 8,
    category: 'Workshop English',
    catColor: 'bg-green-100 text-green-700 border-green-200',
    question: 'On an engineering blueprint and welding drawing, what does the technical abbreviation "WPS" stand for?',
    options: [
      'Welding Procedure Specification',
      'Weld Position Standard',
      'Workshop Production Schedule',
      'Wire Processing System'
    ],
    correct: 0,
    hint: 'Dokumen panduan parameter resmi yang mengatur voltase, amper, kawat las, dan suhu kerja.',
    explanation: 'WPS (Welding Procedure Specification) adalah dokumen acuan tertulis yang merinci seluruh parameter teknis pengelasan yang telah diuji dan disetujui (PQR) untuk memastikan kualitas hasil sambungan.'
  },
  {
    id: 9,
    category: 'Workshop English',
    catColor: 'bg-green-100 text-green-700 border-green-200',
    question: '"Adjust the wire feed speed and ensure proper gas flow rate before striking the arc." — Kalimat instruksi tersebut paling sering digunakan pada proses:',
    options: [
      'Manual Oxy-Acetylene Cutting (OAW)',
      'Gas Metal Arc Welding (GMAW / MIG)',
      'Shielded Metal Arc Welding (SMAW)',
      'Submerged Arc Welding (SAW)'
    ],
    correct: 1,
    hint: 'Kata kunci: "wire feed speed" (kecepatan pengumpanan kawat gulung otomatis) dan "gas flow rate".',
    explanation: 'Instruksi "wire feed speed" dan "gas flow rate" sangat spesifik untuk mesin las semi-otomatis GMAW (MIG/MAG) atau FCAW yang menggunakan feeder kawat roll.'
  },
  {
    id: 10,
    category: 'Workshop English',
    catColor: 'bg-green-100 text-green-700 border-green-200',
    question: 'What is the Indonesian equivalent for the industrial safety instruction: "Inspect the ground clamp connection to prevent stray current"?',
    options: [
      'Periksa regulator gas untuk mencegah kebocoran selang',
      'Periksa koneksi klem massa (ground clamp) untuk mencegah arus liar',
      'Ganti stang las elektroda agar tidak terjadi sengatan listrik',
      'Matikan sakelar utama ketika kabel las mulai memanas'
    ],
    correct: 1,
    hint: '"Ground clamp" = klem massa (arde/penjepit ke benda kerja), "stray current" = arus bocor/arus liar.',
    explanation: 'Ground clamp adalah penjepit massa ke logam kerja. Sambungan yang longgar dapat memicu percikan berbahaya, panas berlebih, dan arus liar (stray current) yang merusak mesin las.'
  },
  {
    id: 11,
    category: 'Workshop English',
    catColor: 'bg-green-100 text-green-700 border-green-200',
    question: 'Which English phrase correctly describes the defect where the weld metal fails to penetrate completely through the root of the joint?',
    options: [
      'Excessive Spatter',
      'Incomplete Root Penetration',
      'Root Concavity',
      'Overfill Crown'
    ],
    correct: 1,
    hint: 'Perhatikan kata "penetrate" dan bagian akar sambungan "root".',
    explanation: 'Incomplete Root Penetration (kurang penembusan akar) terjadi ketika logam las tidak menembus hingga bagian dasar/akar celah sambungan.'
  },

  // --- K3 SAFETY STANDARDS (12 - 16) ---
  {
    id: 12,
    category: 'K3 Safety Standards',
    catColor: 'bg-amber-100 text-amber-700 border-amber-200',
    question: 'Tingkat kegelapan kaca filter (Shade Number) berapakah yang direkomendasikan standar ANSI Z87.1 untuk proses SMAW dengan arus kerja 100 – 150 Ampere?',
    options: [
      'Shade #5 - #6',
      'Shade #8',
      'Shade #10',
      'Shade #14'
    ],
    correct: 2,
    hint: 'Shade 5 untuk pemotongan oksi-asetilen, shade 8 untuk arus rendah < 75A, dan shade 10 adalah standar umum 100-150A.',
    explanation: 'Standar ANSI / OSHA menetapkan filter shade #10 untuk pengelasan busur listrik elektroda terbungkus (SMAW) pada rentang arus 75 hingga 150 Ampere guna melindungi retina dari sinar ultraviolet dan inframerah.'
  },
  {
    id: 13,
    category: 'K3 Safety Standards',
    catColor: 'bg-amber-100 text-amber-700 border-amber-200',
    question: 'Manakah tindakan keselamatan yang BENAR saat memindahkan dan menyimpan tabung gas bertekanan tinggi (Argon, CO2, Oksigen) di area workshop?',
    options: [
      'Menggelindingkan tabung secara horizontal di atas lantai agar lebih cepat dipindahkan',
      'Menyimpan tabung dalam posisi berdiri tegak dan diikat/dirantai kuat pada rak atau dinding pengaman',
      'Membuka tutup pelindung katup (safety valve cap) saat tabung diangkat dengan forklift',
      'Menempatkan tabung gas berdampingan tepat di sebelah sumber percikan api las agar selang tidak terlalu panjang'
    ],
    correct: 1,
    hint: 'Tabung bertekanan tidak boleh roboh atau terkena benturan katupnya karena dapat melesat seperti roket.',
    explanation: 'Tabung gas bertekanan wajib disimpan dalam posisi tegak vertikal, diikat rantai pengaman, tutup pelindung terpasang saat tidak digunakan, dan dijauhkan minimal 6 meter dari sumber panas atau percikan api terbuka.'
  },
  {
    id: 14,
    category: 'K3 Safety Standards',
    catColor: 'bg-amber-100 text-amber-700 border-amber-200',
    question: 'Kondisi iritasi mata akibat paparan langsung radiasi sinar ultraviolet (UV) busur las tanpa kacamata pelindung disebut secara medis:',
    options: [
      'Astigmatisme Akut',
      'Photokeratitis / Arc Eye (Flash Burn)',
      'Katarak Traumatik',
      'Presbiopia'
    ],
    correct: 1,
    hint: 'Dikenal di kalangan welder dengan istilah "Welder\'s Flash" atau rasa berpasir terbakar pada kornea mata.',
    explanation: 'Arc Eye atau Welder\'s Flash (Photokeratitis) adalah luka bakar radiasi UV pada kornea mata. Gejalanya mata merah, berair, sangat perih dan terasa seperti ada pasir di mata beberapa jam setelah terpapar.'
  },
  {
    id: 15,
    category: 'K3 Safety Standards',
    catColor: 'bg-amber-100 text-amber-700 border-amber-200',
    question: 'When welding inside a "Confined Space" (tangki tertutup, ruang sempit kapal), what critical safety measure is mandatory?',
    options: [
      'Use only 100% pure oxygen ventilation to keep workers alert',
      'Continuous atmospheric gas testing, proper exhaust ventilation, and a designated standby safety observer outside',
      'Working alone in silence to avoid disturbing other personnel',
      'Switching off all lighting to prevent short circuits'
    ],
    correct: 1,
    hint: 'Ruang terbatas rentan penumpukan gas beracun dan kekurangan oksigen, sehingga perlu pemantauan udara dan pengawas di pintu masuk.',
    explanation: 'Pekerjaan di confined space mewajibkan tes udara berkala (kadar O2, LEL, H2S/CO), ventilasi blower keluar masuk udara, izin kerja ruang terbatas, dan petugas standby (safety watcher) di luar.'
  },
  {
    id: 16,
    category: 'K3 Safety Standards',
    catColor: 'bg-amber-100 text-amber-700 border-amber-200',
    question: 'Bahan APD sarung tangan dan apron juru las yang paling aman terhadap percikan logam cair dan konduksi panas adalah terbuat dari:',
    options: [
      'Kulit split sapi asli tahan panas (Heavy Duty Split Cowhide Leather)',
      'Kain nilon sintetis elastis',
      'Karet sintetis PVC tahan air',
      'Kain poliester rajut tebal'
    ],
    correct: 0,
    hint: 'Bahan sintetis (nilon/poliester) akan meleleh saat terkena percikan panas dan menempel pada kulit, sehingga bahan alami kulit hewan adalah standar utama.',
    explanation: 'Bahan kulit asli (cowhide leather) tidak mudah meleleh atau terbakar, memberikan isolasi termal yang baik dan melindungi kulit tangan dari tetesan terak serta spatter bersuhu tinggi.'
  },

  // --- REGULASI MIGRAN & LOGIKA SPASIAL (17 - 20) ---
  {
    id: 17,
    category: 'Regulasi & Logika',
    catColor: 'bg-purple-100 text-purple-700 border-purple-200',
    question: 'Berdasarkan UU No. 18 Tahun 2017 tentang Pelindungan Pekerja Migran Indonesia, platform resmi satu pintu milik BP2MI untuk pendataan dan verifikasi dokumen calon PMI adalah:',
    options: [
      'SIAPkerja Kemnaker',
      'SISKOP2MI (Sistem Komputerisasi Pelayanan Penempatan dan Pelindungan PMI)',
      'SIMDA Migran',
      'Portal Paspor Ditjen Imigrasi'
    ],
    correct: 1,
    hint: 'Singkatan dari Sistem Komputerisasi Pelayanan Penempatan dan Pelindungan Pekerja Migran Indonesia.',
    explanation: 'SISKOP2MI adalah basis data terpadu resmi BP2MI yang mencatat seluruh tahapan seleksi, verifikasi dokumen, perjanjian kerja, e-PMI, hingga kepulangan PMI guna menjamin penempatan secara prosedural dan terlindungi.'
  },
  {
    id: 18,
    category: 'Regulasi & Logika',
    catColor: 'bg-purple-100 text-purple-700 border-purple-200',
    question: 'Tahapan wajib yang harus diikuti oleh calon Pekerja Migran Indonesia (PMI) setelah lulus medical check-up dan sebelum diberangkatkan ke negara tujuan penempatan adalah:',
    options: [
      'Uji Kompetensi Ulang di Bandara Internasional',
      'PAP (Pembekalan Akhir Pemberangkatan) / OPP',
      'Wawancara Langsung di Kedutaan Besar Tanpa Dokumen',
      'Pelatihan Bahasa Tambahan Mandiri Tanpa Pengawasan'
    ],
    correct: 1,
    hint: 'Program pembekalan resmi dari pemerintah mengenai regulasi, perlindungan hukum, dan hak-kewajiban sebelum terbang.',
    explanation: 'PAP (Pembekalan Akhir Pemberangkatan) adalah orientasi pra-keberangkatan resmi yang diselenggarakan oleh BP3MI/BP2MI untuk memberikan pemahaman mengenai hak kewajiban, kebiasaan lokal negara tujuan, dan mitigasi masalah hukum.'
  },
  {
    id: 19,
    category: 'Regulasi & Logika',
    catColor: 'bg-purple-100 text-purple-700 border-purple-200',
    question: 'Tes Logika Spasial: Sebuah pipa silinder dengan diameter 10 inci dipotong miring tepat bersudut 45 derajat. Bentuk penampang bidang potongan (cross-section surface) pipa tersebut adalah:',
    options: [
      'Lingkaran sempurna (Perfect Circle)',
      'Elips / Lonjong (Ellipse)',
      'Segitiga siku-siku (Right Triangle)',
      'Persegi panjang (Rectangle)'
    ],
    correct: 1,
    hint: 'Jika dipotong tegak lurus 90° menghasilkan lingkaran; jika dipotong miring miring menghasilkan bentuk oval/lonjong beraturan.',
    explanation: 'Irisan kerucut atau silinder lingkaran yang dipotong miring oleh bidang datar membentuk bangun geometri Elips (lonjong beraturan).'
  },
  {
    id: 20,
    category: 'Regulasi & Logika',
    catColor: 'bg-purple-100 text-purple-700 border-purple-200',
    question: 'Manakah kombinasi dokumen mutlak yang wajib dipegang oleh Pekerja Migran Indonesia saat bekerja di luar negeri secara resmi (non-unprocedural)?',
    options: [
      'Hanya KTP dan Paspor Turis (Visa Kunjungan)',
      'Paspor, Visa Kerja Resmi, Perjanjian Kerja (PK), dan Terdaftar di SISKOP2MI/e-PMI',
      'Surat Rekomendasi dari Kepala Desa dan Tiket Pesawat Pulang-Pergi',
      'Sertifikat Pelatihan Kursus Singkat tanpa Visa Kerja'
    ],
    correct: 1,
    hint: 'PMI wajib berangkat dengan visa kerja (bukan turis), perjanjian kerja resmi yang ditandatangani, dan perlindungan e-PMI.',
    explanation: 'Bekerja ke luar negeri secara prosedural mewajibkan visa kerja legal (bukan visa wisata/ziarah), kontrak Perjanjian Kerja berkekuatan hukum, kepemilikan e-PMI BP2MI, serta jaminan BPJS Ketenagakerjaan Migran.'
  }
];

// ==========================================
// 2. DATA MATERI WAWANCARA BP2MI (5 SESI)
// ==========================================
const BP2MI_MATERIALS = [
  {
    id: 1,
    sessionNumber: 'Sesi 1',
    title: '1. Komitmen Dasar & Motivasi',
    category: 'Motivasi & Komitmen',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    interviewerQuestion:
      'Dari data Anda, Anda adalah lulusan dari MAN 1 Payakumbuh, bukan dari SMK jurusan Teknik Pengelasan seperti mayoritas pendaftar lainnya. Kenapa Anda begitu yakin memilih posisi Welder? Apa motivasi terbesar Anda ingin bekerja ke luar negeri melalui program ini?',
    recommendedAnswer:
      'Meskipun dari MAN, MAN 1 Payakumbuh memiliki program keterampilan vokasi khusus. Setiap minggu kami praktik langsung di workshop pengelasan sekolah, jadi dasar-dasar memegang stang las, menyalakan busur, dan menyambung besi sudah sangat familiar bagi saya. Motivasi terbesar saya adalah ingin mandiri secara finansial di usia muda, membantu ekonomi keluarga, dan mengembangkan karier serta keahlian pengelasan saya di kancah internasional melalui jalur resmi negara BP2MI.',
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
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
    interviewerQuestion:
      'Anda tidak melampirkan sertifikat pengelasan resmi, namun menyebutkan memiliki pengalaman praktik vokasi selama di sekolah. Bisa Anda jelaskan secara mendetail: Apa saja jenis pengelasan (misal: SMAW, GMAW/MIG, GTAW/TIG) yang pernah Anda praktikkan? Jenis material apa yang biasa Anda las, dan posisi pengelasan apa saja (misal: 1G, 2G, 3G) yang sudah Anda kuasai?',
    recommendedAnswer:
      'Mohon maaf Pak, di sekolah kami lebih fokus pada praktik langsung di lapangan daripada teori kelas. Namun, saya sangat menguasai penggunaan Las Listrik Stik (SMAW). Saya sudah biasa menyambung material besi baja karbon ringan, membersihkan terak las (slag), dan melakukan penyambungan dasar posisi mendatar (flat/1G) maupun horizontal (2G) untuk membuat pagar atau tralis.',
    keyPoints: [
      'Jawab jujur dan spesifik mengenai kompetensi riil yang dikuasai: Las Listrik Stik (SMAW).',
      'Sebutkan material konkret yang sering dikerjakan: besi baja karbon ringan.',
      'Tunjukkan kebiasaan kerja baik: pembersihan terak (slag) dan kemampuan posisi 1G serta 2G.'
    ]
  },
  {
    id: 3,
    sessionNumber: 'Sesi 3',
    title: '3. Ketahanan Kerja & Kesehatan',
    category: 'Kesehatan & K3',
    badgeColor: 'bg-red-100 text-red-700 border-red-200',
    interviewerQuestion:
      'Pekerjaan sebagai Welder di luar negeri itu berat. Anda akan menghadapi panas, percikan api, asap, dan dituntut fokus berjam-jam dengan menggunakan APD lengkap. Bagaimana Anda meyakinkan kami bahwa fisik Anda sanggup menghadapi tekanan kerja tersebut? Apakah Anda memiliki riwayat penyakit pernapasan atau mata (seperti silindris/buta warna)?',
    recommendedAnswer:
      'Alhamdulillah, saya memiliki gaya hidup sehat dan tidak merokok, sehingga kondisi fisik dan pernapasan saya prima untuk menghadapi lingkungan kerja Welder. Mengenai mata, saya memiliki sedikit silindris ringan, namun selama ini tidak mengganggu fokus saya saat mengelas di workshop sekolah. Jika nanti dari hasil medical check-up resmi diharuskan menggunakan kacamata koreksi atau lensa khusus di dalam kedok las, saya siap menyediakannya demi keselamatan dan akurasi kerja.',
    keyPoints: [
      'Tegaskan pola hidup sehat & bebas rokok sebagai modal utama daya tahan pernapasan.',
      'Transparan mengenai mata silindris ringan tanpa membuat interviewer ragu atas fokus kerja.',
      'Berikan solusi proaktif: siap menggunakan lensa koreksi khusus di kedok las sesuai anjuran medis resmi.'
    ]
  },
  {
    id: 4,
    sessionNumber: 'Sesi 4',
    title: '4. Kesiapan Pelatihan Asrama & Bahasa',
    category: 'Disiplin & Asrama',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    interviewerQuestion:
      'Di brosur tertera bahwa posisi Welder ini mewajibkan Pelatihan Bahasa Inggris sebanyak 640 Jam Pelajaran (JPL), sedangkan pelatihan teknis lasnya hanya 180 JPL. Kelas bahasa ini akan sangat padat, melelahkan, dan berjalan berbulan-bulan di dalam asrama dengan disiplin tinggi. Bagaimana kesiapan Anda untuk belajar bahasa Inggris dari nol secara intensif di asrama? Apakah Anda tipe orang yang mudah jenuh atau rindu rumah (homesick) jika harus jauh dari keluarga di Payakumbuh?',
    recommendedAnswer:
      'Sistem kehidupan asrama sudah sangat familiar bagi saya, karena saya sudah berpengalaman selama 3 tahun asrama di Bukittinggi dan 3 tahun merantau di asrama Jogja. Jadi, masalah adaptasi lingkungan baru, kedisiplinan asrama, dan kemandirian sudah menjadi bagian dari keseharian saya. Bagi saya, rasa jenuh atau rindu rumah adalah hal yang manusiawi, namun tujuan utama saya menjadi seorang Welder profesional jauh lebih besar dari semua itu. Saya siap mendedikasikan fokus saya sepenuhnya untuk program ini.',
    keyPoints: [
      'Gunakan rekam jejak nyata: 3 tahun asrama di Bukittinggi & 3 tahun merantau di Jogja sebagai bukti kemandirian.',
      'Tunjukkan kedewasaan sikap dalam menyikapi rasa rindu keluarga (homesick).',
      'Tegaskan tekad bulat mendedikasikan fokus penuh pada 640 JPL Bahasa Inggris & pelatihan asrama.'
    ]
  },
  {
    id: 5,
    sessionNumber: 'Sesi 5',
    title: '5. Adaptasi Budaya & Komunikasi',
    category: 'Adaptasi Global',
    badgeColor: 'bg-green-100 text-green-700 border-green-200',
    interviewerQuestion:
      'Karena program ini menggunakan jalur Welder - Bahasa Inggris, penempatan kerja Anda nantinya bisa mengarah ke negara-negara Eropa, Timur Tengah, atau wilayah Asia pasifik. Apakah Anda siap jika nantinya ditempatkan di negara yang budayanya sangat berbeda jauh dengan Indonesia? Dan apa yang akan Anda lakukan jika di awal bekerja nanti, Anda mengalami kendala komunikasi dengan supervisor asing di tempat kerja?',
    recommendedAnswer:
      'Saya sangat siap untuk ditempatkan di negara mana pun dengan budaya yang berbeda, karena bagi saya perbedaan itu adalah ruang untuk belajar. Jika nanti di tempat kerja saya menghadapi kendala komunikasi atau situasi baru yang membingungkan, prinsip saya adalah tetap tenang dan tidak mengambil keputusan secara impulsif demi menghindari risiko kesalahan fatal. Saya akan mengedepankan komunikasi profesional dengan meminta kejelasan ulang kepada supervisor, atau meminta bimbingan dari kolega senior di atas saya agar pekerjaan tetap berjalan aman dan sesuai standar perusahaan.',
    keyPoints: [
      'Tunjukkan keterbukaan pola pikir terhadap keberagaman budaya di berbagai negara penempatan.',
      'Terapkan prinsip K3 & keselamatan: tidak gegabah/impulsif saat menghadapi instruksi yang ambigu.',
      'Utamakan etika profesional: aktif meminta klarifikasi ke supervisor atau bimbingan dari teknisi senior.'
    ]
  }
];

// ==========================================
// 3. DATA ENGLISH INTERVIEW (8 SOAL)
// ==========================================
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
    question: 'How do you handle a welding defect when you discover one?',
    tip: 'Jelaskan metode sistematis: Hentikan pengelasan -> Identifikasi jenis cacat -> Gerinda perbaikan -> Las ulang -> Inspeksi.',
    answer:
      '"When I discover a defect, I follow a systematic approach. First, I stop welding and identify the root cause—whether it is porosity, undercut, or lack of fusion. I grind out the defective area completely, adjust my welding parameters according to the WPS, re-weld the joint, and visually inspect the final repair."',
    translation:
      '"Ketika menemukan cacat, saya menghentikan las, mengidentifikasi akar masalahnya, menggerinda bagian cacat hingga bersih, mengatur ulang amper/voltase sesuai WPS, mengelas ulang sambungan, dan memeriksa hasil perbaikan."'
  },
  {
    question: 'How do you handle a high-stress or tight-deadline work environment?',
    tip: 'Tunjukkan ketenangan, prioritas keselamatan di atas segalanya, dan komunikasi tim yang jelas.',
    answer:
      '"In welding, rushing leads to severe defects and safety hazards. I manage pressure by staying focused, following the WPS strictly, and maintaining clear communication with my team and supervisor. Preparation and a positive mindset are key to working safely under pressure."',
    translation:
      '"Dalam pengelasan, terburu-buru memicu cacat fatal dan bahaya keselamatan. Saya mengelola tekanan dengan tetap fokus, mematuhi WPS, dan menjaga komunikasi yang jelas dengan tim serta supervisor."'
  },
  {
    question: 'Explain the main difference between SMAW and GTAW processes.',
    tip: 'Bandingkan tipe elektroda (consumable vs non-consumable) dan gas pelindungnya.',
    answer:
      '"SMAW uses a consumable electrode coated with flux that melts to create shielding gas and slag. GTAW uses a non-consumable tungsten electrode with separate shielding gas like pure Argon, producing high-precision, spatter-free welds for critical piping or thin materials."',
    translation:
      '"SMAW memakai elektroda terbungkus fluks yang ikut mencair. GTAW menggunakan elektroda tungsten yang tidak mencair dengan gas argon murni terpisah, menghasilkan las presisi tinggi tanpa spatter untuk pipa kritis atau pelat tipis."'
  },
  {
    question: 'What safety precautions do you always follow before striking an arc?',
    tip: 'Sebutkan APD lengkap, inspeksi kabel mesin las, ventilasi, dan pembersihan bahan mudah terbakar.',
    answer:
      '"Before welding, I perform a thorough safety check: inspect all PPE including proper shade helmet lens, check cable insulation and ground clamp connection, verify work area ventilation, ensure fire extinguishers are accessible, and clear away any flammable materials."',
    translation:
      '"Sebelum mengelas, saya memeriksa APD dan shade helm yang benar, memeriksa isolasi kabel dan klem massa, memastikan ventilasi ruangan memadai, memastikan APAR siap pakai, dan menyingkirkan bahan mudah terbakar."'
  },
  {
    question: 'Can you work effectively in a multicultural team with foreign supervisors?',
    tip: 'Tegaskan sikap toleransi, keterbukaan budaya, dan komitmen komunikasi aktif dalam bahasa Inggris.',
    answer:
      '"Yes, absolutely. I respect different cultural backgrounds and work ethics. I actively improve my English communication skills and always clarify instructions with supervisors before proceeding to ensure zero miscommunication on site."',
    translation:
      '"Ya, tentu saja. Saya menghormati latar belakang budaya yang beragam. Saya aktif meningkatkan komunikasi bahasa Inggris dan selalu mengonfirmasi ulang instruksi supervisor demi mencegah kesalahan di lapangan."'
  },
  {
    question: 'Where do you see yourself in 5 years in the welding industry?',
    tip: 'Sampaikan visi peningkatan sertifikasi (6G, CWI / Welding Inspector) dan kontribusi ke industri.',
    answer:
      '"In five years, I see myself as a certified international 6G welder with extensive project experience. My goal is to advance towards becoming a certified Welding Inspector or Supervisor, mentoring future Indonesian welders for global careers."',
    translation:
      '"Dalam lima tahun, saya melihat diri saya sebagai welder 6G internasional bersertifikasi. Target saya adalah berkembang menjadi Welding Inspector atau Supervisor serta membimbing generasi welder Indonesia berikutnya."'
  }
];

// ==========================================
// 4. DATA CHECKLIST KESIAPAN (28 ITEM)
// ==========================================
const CHECKLIST_SECTIONS = [
  {
    title: '📄 Kelengkapan Dokumen & Administrasi',
    items: [
      { id: 'doc-1', text: 'Cek email hasil seleksi dari BP3MI / P3MI secara berkala' },
      { id: 'doc-2', text: 'Paspor aktif (masa berlaku minimal 18 bulan ke depan)' },
      { id: 'doc-3', text: 'Fotokopi e-KTP dan Kartu Keluarga (legalisir cap basah)' },
      { id: 'doc-4', text: 'Ijazah terakhir & transkrip nilai asli beserta fotokopi legalisir' },
      { id: 'doc-5', text: 'Sertifikat kompetensi / bukti vokasi pengelasan' },
      { id: 'doc-6', text: 'Pas foto terbaru 4x6 latar belakang putih (10 lembar)' },
      { id: 'doc-7', text: 'SKCK dari Kepolisian Resor (Polres) untuk penempatan kerja' },
      { id: 'doc-8', text: 'Surat Izin Orang Tua / Wali / Pasangan bermaterai Rp 10.000' }
    ]
  },
  {
    title: '🏥 Medical Check-Up & Kesehatan Fisik',
    items: [
      { id: 'med-1', text: 'Bebas dari tato / rajah tubuh di seluruh area badan' },
      { id: 'med-2', text: 'Bebas dari tindik / piercing selain standar daun telinga wanita' },
      { id: 'med-3', text: 'Kesehatan mata normal / visus terkoreksi kacamata kedok las' },
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
      { id: 'phys-3', text: 'Mampu membaca simbol las dan simbol gambar teknik dasar' },
      { id: 'phys-4', text: 'Menguasai penggunaan alat potong gerinda & chipping hammer' },
      { id: 'phys-5', text: 'Mampu mengoperasikan alat ukur welding gauge & vernier caliper' }
    ]
  },
  {
    title: '🧠 Kesiapan Mental, Bahasa & Asrama',
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

// ==========================================
// 5. DATA QUICK CHEAT-SHEET
// ==========================================
const CHEAT_SHEET_DATA = {
  weldingSymbols: [
    { symbol: '╱', name: 'Fillet Weld', desc: 'Las sudut — untuk sambungan T (T-joint) atau sambungan tumpang (lap joint).', note: 'Simbol segitiga siku-siku pada garis referensi' },
    { symbol: '╲╱', name: 'V-Groove Weld', desc: 'Las kampuh V — pelat tebal yang membutuhkan penetrasi tembus penuh.', note: 'Simbol huruf V di bawah garis referensi' },
    { symbol: '▭', name: 'Square Groove', desc: 'Las kampuh persegi — pelat tipis tanpa bevel dengan celah akar sempit.', note: 'Dua garis vertikal paralel' },
    { symbol: '⌒', name: 'Bevel Groove', desc: 'Las kampuh bevel — hanya satu sisi tepi pelat yang dimiringkan.', note: 'Simbol setengah V' },
    { symbol: '◯', name: 'Plug / Slot Weld', desc: 'Las lubang pasak — menyatukan dua pelat bertumpuk lewat lubang bor.', note: 'Lingkaran pada garis referensi' },
    { symbol: '─○─', name: 'Field Weld', desc: 'Las lapangan — dikerjakan di lokasi proyek (site), bukan di bengkel.', note: 'Tanda bendera di persimpangan garis panah' },
    { symbol: '⟲', name: 'Weld All Around', desc: 'Las keliling — pengelasan dilakukan penuh mengitari keliling komponen.', note: 'Lingkaran di persimpangan garis panah' },
    { symbol: '───', name: 'Back / Backing Weld', desc: 'Las penahan belakang — lapisan akar las dari sisi berlawanan.', note: 'Setengah lingkaran pada sisi atas garis referensi' }
  ],
  weldingPositions: [
    { pos: '1G / 1F', name: 'Flat Position', desc: 'Posisi datar / bawah tangan — gravitasi membantu cairan las mengalir rata.', difficulty: 1 },
    { pos: '2G / 2F', name: 'Horizontal Position', desc: 'Posisi horizontal — cairan las cenderung melorot ke bawah.', difficulty: 2 },
    { pos: '3G / 3F', name: 'Vertical Position', desc: 'Posisi vertikal tegak — memerlukan teknik ayunan naik (vertical-up).', difficulty: 3 },
    { pos: '4G / 4F', name: 'Overhead Position', desc: 'Posisi di atas kepala — risiko spatter jatuh paling tinggi.', difficulty: 4 },
    { pos: '5G Pipe', name: 'Pipe Horizontal Fixed', desc: 'Pipa horizontal tetap — welder bergerak mengitari pipa dari bawah ke atas.', difficulty: 4 },
    { pos: '6G Pipe', name: 'Pipe 45° Fixed', desc: 'Pipa miring 45° tetap — posisi kualifikasi juru las tingkat tertinggi.', difficulty: 5 }
  ],
  englishVocab: [
    { en: 'Arc Length', id: 'Jarak Ujung Elektroda ke Logam', cat: 'Process' },
    { en: 'Bevel Angle', id: 'Sudut Kemiringan Kampuh Las', cat: 'Process' },
    { en: 'Chipping Hammer', id: 'Palu Pembersih Terak Las', cat: 'Equipment' },
    { en: 'Confined Space', id: 'Ruang Terbatas / Sempit Berbahaya', cat: 'Safety' },
    { en: 'Defect / Flaw', id: 'Cacat / Kerusakan Pengelasan', cat: 'Defect' },
    { en: 'Electrode Holder', id: 'Stang Las / Pemegang Elektroda', cat: 'Equipment' },
    { en: 'Filler Metal', id: 'Logam Pengisi / Kawat Las', cat: 'Material' },
    { en: 'Fire Extinguisher', id: 'APAR (Alat Pemadam Api Ringan)', cat: 'Safety' },
    { en: 'Flux Coating', id: 'Lapisan Fluks Pelindung Elektroda', cat: 'Material' },
    { en: 'Fume Extractor', id: 'Penyedot Asap & Gas Beracun Las', cat: 'Safety' },
    { en: 'Grinding Disc', id: 'Batu Gerinda Penghalus Las', cat: 'Equipment' },
    { en: 'Ground Clamp', id: 'Klem Penjepit Massa Arde', cat: 'Equipment' },
    { en: 'Heat Input', id: 'Masukan Panas ke Logam Dasar', cat: 'Process' },
    { en: 'Incomplete Fusion', id: 'Peleburan Tidak Sempurna', cat: 'Defect' },
    { en: 'Leather Apron', id: 'Celemek Pelindung Dada Kulit', cat: 'PPE' },
    { en: 'Porosity', id: 'Porositas / Rongga Gas Terperangkap', cat: 'Defect' },
    { en: 'Root Gap', id: 'Celah Akar Antar Pelat Sambungan', cat: 'Process' },
    { en: 'Safety Goggles', id: 'Kacamata Pengaman Gerinda', cat: 'PPE' },
    { en: 'Slag Inclusion', id: 'Terak Las Terjebak di Dalam Logam', cat: 'Defect' },
    { en: 'Spatter', id: 'Percikan Butiran Logam Las', cat: 'Defect' },
    { en: 'Tack Weld', id: 'Las Ikat Titik Sementara', cat: 'Process' },
    { en: 'Undercut', id: 'Cekungan Termakan di Tepi Jalur Las', cat: 'Defect' },
    { en: 'Welding Helmet', id: 'Kedok / Helm Pelindung Muka Las', cat: 'PPE' },
    { en: 'WPS (Specification)', id: 'Spesifikasi Prosedur Pengelasan', cat: 'Process' }
  ]
};

// ==========================================
// 6. KOMPONEN UTAMA REACT: Bp3miApp
// ==========================================
export default function Bp3miApp() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('exam');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exam States
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(20).fill(-1));
  const [revealedHints, setRevealedHints] = useState({}); // { [questionIdx]: boolean }
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 Menit = 5400 detik

  // Checklist State (localStorage)
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

  // Material & Cheat-Sheet Accordions / Filters
  const [activeMaterialCat, setActiveMaterialCat] = useState('all');
  const [openMaterialAccordions, setOpenMaterialAccordions] = useState({});
  const [openInterviewAccordions, setOpenInterviewAccordions] = useState({});
  const [activeCheatTab, setActiveCheatTab] = useState('symbols');
  const [activeVocabCat, setActiveVocabCat] = useState('all');

  // Toast System
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  // Timer Effect
  useEffect(() => {
    let timerInterval = null;
    if (examStarted && !examSubmitted) {
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [examStarted, examSubmitted]);

  const handleAutoSubmit = () => {
    setExamSubmitted(true);
    setExamStarted(false);
    addToast('⏰ Waktu Ujian Habis! Jawaban berhasil dikumpulkan.', 'info');
  };

  // Format MM:SS
  const formattedTime = useMemo(() => {
    const min = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const sec = (timeLeft % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }, [timeLeft]);

  // Exam Score Computation
  const examResults = useMemo(() => {
    if (!examSubmitted) return null;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    INITIAL_QUESTIONS.forEach((q, idx) => {
      const userAns = userAnswers[idx];
      if (userAns === -1) {
        unanswered++;
      } else if (userAns === q.correct) {
        correct++;
      } else {
        wrong++;
      }
    });

    const percent = Math.round((correct / INITIAL_QUESTIONS.length) * 100);
    const passed = percent >= 70;

    return { correct, wrong, unanswered, percent, passed };
  }, [examSubmitted, userAnswers]);

  // Handlers for Exam
  const startExam = () => {
    setExamStarted(true);
    setExamSubmitted(false);
    setCurrentQuestionIdx(0);
    setUserAnswers(Array(20).fill(-1));
    setRevealedHints({});
    setTimeLeft(90 * 60);
    addToast('Ujian Simulasi 100 Soal dimulai! Waktu Anda 90 Menit.', 'info');
  };

  const selectAnswer = (optionIdx) => {
    setUserAnswers((prev) => {
      const copy = [...prev];
      copy[currentQuestionIdx] = optionIdx;
      return copy;
    });
  };

  const toggleHint = (qIdx) => {
    setRevealedHints((prev) => ({
      ...prev,
      [qIdx]: !prev[qIdx]
    }));
  };

  const submitExam = () => {
    const answeredCount = userAnswers.filter((a) => a !== -1).length;
    if (answeredCount < INITIAL_QUESTIONS.length) {
      const unans = INITIAL_QUESTIONS.length - answeredCount;
      const confirmSubmit = window.confirm(
        `Anda masih memiliki ${unans} soal yang belum dijawab. Apakah Anda yakin ingin mengumpulkan jawaban sekarang?`
      );
      if (!confirmSubmit) return;
    }
    setExamSubmitted(true);
    setExamStarted(false);
    addToast('Jawaban ujian berhasil dikumpulkan!', 'success');
  };

  const retakeExam = () => {
    startExam();
  };

  // Checklist Handlers
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
  const copyToClipboard = (text, label = 'Teks jawaban') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        addToast(`✓ ${label} berhasil disalin ke clipboard!`, 'success');
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans antialiased selection:bg-amber-500 selection:text-black">
      {/* ======================================================== */}
      {/* TOAST NOTIFICATION CONTAINER */}
      {/* ======================================================== */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-semibold text-white animate-bounce duration-300 border ${
              t.type === 'success'
                ? 'bg-emerald-600 border-emerald-400'
                : t.type === 'info'
                ? 'bg-blue-600 border-blue-400'
                : 'bg-amber-600 border-amber-400'
            }`}
          >
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* MOBILE TOGGLE & OVERLAY */}
      {/* ======================================================== */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-800 text-amber-400 p-2.5 rounded-xl border border-slate-700 shadow-xl focus:outline-none"
        aria-label="Toggle Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ======================================================== */}
      {/* SIDEBAR NAVIGATION */}
      {/* ======================================================== */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-slate-950 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3.5 bg-slate-950/80">
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
          </button>
        </nav>

        {/* Footer Status */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60">
          <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 flex items-center gap-3">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                examStarted ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
              }`}
            />
            <div className="text-xs">
              <p className="font-bold text-slate-300">Status Anda</p>
              <p className="text-[11px] text-slate-500">
                {examStarted ? 'Sedang Ujian Aktif' : examSubmitted ? 'Ujian Selesai' : 'Siap Memulai'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN CONTENT AREA */}
      {/* ======================================================== */}
      <main className="flex-1 min-h-screen flex flex-col bg-slate-900">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 h-16 flex items-center justify-between px-4 sm:px-8">
          <div>
            <h2 className="text-base font-black text-white tracking-wide">
              {currentPage === 'exam' && 'Simulasi Ujian Tertulis'}
              {currentPage === 'materi-bp2mi' && 'Materi Wawancara BP2MI'}
              {currentPage === 'interview' && 'English Interview Practice'}
              {currentPage === 'checklist' && 'Checklist Kesiapan Pekerja Migran'}
              {currentPage === 'cheatsheet' && 'Quick Reference Cheat-Sheet'}
            </h2>
            <p className="text-xs text-slate-400">
              {currentPage === 'exam' && 'Tes Juru Las & Workshop English — Target 100 Soal'}
              {currentPage === 'materi-bp2mi' && 'Sesi Tanya-Jawab Khusus Seleksi Welder BP2MI / BP3MI'}
              {currentPage === 'interview' && '8 Pertanyaan Wawancara Global + Panduan Jawaban'}
              {currentPage === 'checklist' && 'Persiapan Berkas, Medical & Mental (BP3MI Sumbar)'}
              {currentPage === 'cheatsheet' && 'Simbol Las, Posisi Pengelasan & Kosakata Industri'}
            </p>
          </div>

          {/* Active Timer Pill on Exam */}
          {currentPage === 'exam' && examStarted && !examSubmitted && (
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-mono font-black ${
                timeLeft <= 300
                  ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse'
                  : 'bg-slate-800 text-amber-400 border-amber-500/30'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formattedTime}</span>
            </div>
          )}
        </header>

        {/* Dynamic Page Rendering */}
        <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full flex-1">
          {/* ======================================================== */}
          {/* PAGE: EXAM SIMULATION */}
          {/* ======================================================== */}
          {currentPage === 'exam' && (
            <div className="space-y-6">
              {/* Exam Intro View */}
              {!examStarted && !examSubmitted && (
                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                  <div className="p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800">
                    <span className="bg-amber-500/20 text-amber-400 text-xs font-black px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest">
                      SIMULASI RESMI
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                      Tes Tertulis Juru Las & Workshop English
                    </h3>
                    <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                      Dirancang khusus untuk menguji pemahaman teknis SMAW, GTAW, GMAW, K3 keselamatan industri,
                      terminologi bahasa Inggris teknis workshop, serta regulasi SISKOP2MI.
                    </p>
                  </div>

                  {/* Dashboard Metrics (Requirement: 100 Total Soal & 90:00 Menit) */}
                  <div className="p-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-white">100</div>
                        <div className="text-xs text-slate-400 font-bold mt-1">Total Soal</div>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">90:00</div>
                        <div className="text-xs text-slate-400 font-bold mt-1">Waktu (Menit)</div>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-blue-400">4</div>
                        <div className="text-xs text-slate-400 font-bold mt-1">Kategori Standar</div>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-emerald-400">70%</div>
                        <div className="text-xs text-slate-400 font-bold mt-1">Nilai Min. Lulus</div>
                      </div>
                    </div>

                    {/* Category Highlights */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 flex items-start gap-3">
                        <span className="text-blue-400 text-lg">⚙️</span>
                        <div>
                          <h4 className="text-xs font-bold text-blue-300">Technical Welding</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">SMAW, GTAW, GMAW, cacat las, dan posisi 1G-6G</p>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-green-950/30 border border-green-800/40 flex items-start gap-3">
                        <span className="text-green-400 text-lg">📘</span>
                        <div>
                          <h4 className="text-xs font-bold text-green-300">Workshop English</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">Welding blueprint vocab, WPS, & safety commands</p>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-3">
                        <span className="text-amber-400 text-lg">🛡️</span>
                        <div>
                          <h4 className="text-xs font-bold text-amber-300">K3 Safety Standards</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">APD lengkap, shade lens ANSI, dan penanganan gas</p>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 flex items-start gap-3">
                        <span className="text-purple-400 text-lg">🌐</span>
                        <div>
                          <h4 className="text-xs font-bold text-purple-300">Regulasi & Logika</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">Prosedur BP2MI/PAP & tes logika spasial</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={startExam}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-4 px-8 rounded-xl shadow-lg shadow-amber-500/20 text-base transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Mulai Ujian Sekarang (90 Menit)
                    </button>
                  </div>
                </div>
              )}

              {/* Active Exam Card */}
              {examStarted && !examSubmitted && (
                <div className="space-y-6">
                  {/* Progress Header */}
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-slate-400">Progres Pengerjaan</span>
                      <span className="font-mono text-amber-400">
                        {userAnswers.filter((a) => a !== -1).length} / {INITIAL_QUESTIONS.length} Soal
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                        style={{
                          width: `${
                            (userAnswers.filter((a) => a !== -1).length / INITIAL_QUESTIONS.length) * 100
                          }%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Question Card */}
                  {(() => {
                    const q = INITIAL_QUESTIONS[currentQuestionIdx];
                    const selected = userAnswers[currentQuestionIdx];
                    const isHintVisible = revealedHints[currentQuestionIdx];

                    return (
                      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                        <div className="p-6 sm:p-8">
                          {/* Question Meta */}
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">
                                {currentQuestionIdx + 1}
                              </span>
                              <span className="text-xs font-bold px-2.5 py-1 rounded-full border border-slate-700 bg-slate-900 text-slate-300">
                                {q.category}
                              </span>
                            </div>

                            {/* Requirement 3: Tombol Hint */}
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
                          </div>

                          {/* Question Text */}
                          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed mb-6">
                            {q.question}
                          </h3>

                          {/* Requirement 3: Hint Box Container */}
                          {isHintVisible && (
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

                          {/* Options */}
                          <div className="space-y-3">
                            {q.options.map((opt, optIdx) => {
                              const isChoice = selected === optIdx;
                              const letters = ['A', 'B', 'C', 'D'];
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => selectAnswer(optIdx)}
                                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 ${
                                    isChoice
                                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10'
                                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                                  }`}
                                >
                                  <span
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                                      isChoice
                                        ? 'bg-amber-500 text-slate-950'
                                        : 'bg-slate-800 text-slate-400'
                                    }`}
                                  >
                                    {letters[optIdx]}
                                  </span>
                                  <span className="text-sm font-medium pt-0.5 leading-relaxed">{opt}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Navigation Footer */}
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
                            {INITIAL_QUESTIONS.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                onClick={() => setCurrentQuestionIdx(dotIdx)}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${
                                  dotIdx === currentQuestionIdx
                                    ? 'bg-amber-400 scale-125'
                                    : userAnswers[dotIdx] !== -1
                                    ? 'bg-slate-500'
                                    : 'bg-slate-800'
                                }`}
                              />
                            ))}
                          </div>

                          {currentQuestionIdx < INITIAL_QUESTIONS.length - 1 ? (
                            <button
                              onClick={() => setCurrentQuestionIdx((p) => Math.min(INITIAL_QUESTIONS.length - 1, p + 1))}
                              className="px-4 py-2 rounded-xl text-xs font-black bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all"
                            >
                              Selanjutnya →
                            </button>
                          ) : (
                            <button
                              onClick={submitExam}
                              className="px-5 py-2 rounded-xl text-xs font-black bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                            >
                              Kumpulkan Jawaban ✓
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Exam Result View */}
              {examSubmitted && examResults && (
                <div className="space-y-8 animate-fadeIn">
                  <div
                    className={`rounded-2xl border p-8 text-center shadow-2xl ${
                      examResults.passed
                        ? 'bg-gradient-to-b from-emerald-950/40 to-slate-950 border-emerald-500/40'
                        : 'bg-gradient-to-b from-red-950/40 to-slate-950 border-red-500/40'
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

                    <h3 className="text-2xl font-black text-white mb-2">
                      {examResults.passed ? '🎉 Selamat, Anda Dinyatakan LULUS!' : '📚 Belum Lulus — Tingkatkan Latihan!'}
                    </h3>
                    <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                      {examResults.passed
                        ? `Skor Anda ${examResults.percent}%, melampaui batas standar 70%. Pertahankan performa untuk seleksi resmi BP2MI!`
                        : `Skor Anda ${examResults.percent}%, masih di bawah standar 70%. Review kembali pembahasan di bawah ini dan ulangi ujian.`}
                    </p>

                    {/* Result Counts */}
                    <div className="grid grid-cols-3 max-w-xs mx-auto bg-slate-900/90 rounded-xl p-3 border border-slate-800 mb-6">
                      <div>
                        <div className="text-xl font-bold text-emerald-400">{examResults.correct}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Benar</div>
                      </div>
                      <div className="border-x border-slate-800">
                        <div className="text-xl font-bold text-red-400">{examResults.wrong}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Salah</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-slate-400">{examResults.unanswered}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Kosong</div>
                      </div>
                    </div>

                    <button
                      onClick={retakeExam}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20"
                    >
                      🔄 Ulangi Ujian Simulasi
                    </button>
                  </div>

                  {/* Detailed Explanation Breakdown */}
                  <div className="space-y-4">
                    <h4 className="text-base font-black text-white flex items-center gap-2">
                      <span>📋</span> Pembahasan Lengkap Tiap Soal
                    </h4>

                    {INITIAL_QUESTIONS.map((q, idx) => {
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
                              : 'border-red-500/30 bg-red-950/10'
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
                                  : 'bg-red-500/20 text-red-400'
                              }`}
                            >
                              {isCorrect ? '✓ Benar' : isUnanswered ? '— Kosong' : '✗ Salah'}
                            </span>
                          </div>

                          <p className="text-sm font-bold text-slate-200 mb-3">{q.question}</p>

                          {/* Options Review */}
                          <div className="space-y-1 mb-3 text-xs">
                            {q.options.map((opt, oIdx) => (
                              <div
                                key={oIdx}
                                className={`p-2 rounded flex items-center justify-between ${
                                  oIdx === q.correct
                                    ? 'bg-emerald-950/40 text-emerald-300 font-bold border border-emerald-500/30'
                                    : oIdx === userAns && !isCorrect
                                    ? 'bg-red-950/40 text-red-300 font-bold line-through border border-red-500/30'
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
                                  <span className="text-[10px] text-red-400 font-bold">Pilihan Anda</span>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Explanation */}
                          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
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

          {/* ======================================================== */}
          {/* PAGE: MATERI BP2MI (5 SESI KUNCI) */}
          {/* ======================================================== */}
          {currentPage === 'materi-bp2mi' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Hero */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 shadow-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <span className="bg-blue-500/20 text-blue-400 text-xs font-black px-3 py-1 rounded-full border border-blue-500/30 uppercase tracking-widest">
                  PANDUAN KHUSUS WAWANCARA
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                  Materi & Jawaban Wawancara BP2MI
                </h3>
                <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                  Panduan taktis menjawab 5 pertanyaan kunci pewawancara seleksi pelatihan SMK Go Global untuk penempatan
                  Welder internasional melalui jalur resmi negara.
                </p>
              </div>

              {/* Sesi Pembuka Callout */}
              <div className="p-5 rounded-2xl bg-blue-950/30 border-2 border-blue-500/40 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-lg shadow-lg">
                  🎙️
                </div>
                <div>
                  <h4 className="text-xs font-black text-blue-300 uppercase tracking-wider mb-1">
                    Sesi Pembuka (Interviewer Prompt)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "Selamat pagi/siang. Terima kasih sudah mendaftar di Program Pelatihan SMK Go Global untuk posisi Welder -
                    Bahasa Inggris. Berkas administrasi dan Kartu AK-1 Anda sudah kami verifikasi dan sinkronisasi lewat
                    QR-code. Sebelum kita masuk ke ruang praktik, ada beberapa hal penting yang ingin kami konfirmasi dari
                    Anda. Tolong dijawab dengan jelas:"
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
                    <div
                      key={mat.id}
                      className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-lg transition-all"
                    >
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
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 text-xs font-bold text-blue-300 border border-slate-800 transition-all"
                        >
                          <span className="flex items-center gap-2">
                            <span>💡</span> Buka Rekomendasi Jawaban & Poin Taktis
                          </span>
                          <span className="text-sm">{isOpen ? '▲' : '▼'}</span>
                        </button>

                        {isOpen && (
                          <div className="mt-4 space-y-4 animate-fadeIn text-xs sm:text-sm">
                            {/* Answer Box */}
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

                            {/* Key Points */}
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

          {/* ======================================================== */}
          {/* PAGE: ENGLISH INTERVIEW (8 SOAL) */}
          {/* ======================================================== */}
          {currentPage === 'interview' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 shadow-xl">
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-black px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-widest">
                  GLOBAL RECRUITMENT
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                  English Interview Simulator
                </h3>
                <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                  Latihan menjawab 8 pertanyaan wawancara rekrutmen juru las global. Dilengkapi panduan jawaban profesional
                  dalam Bahasa Inggris teknis dan terjemahan Bahasa Indonesia.
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
                        <span>Show Best Answer Guide (English & Indo)</span>
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

          {/* ======================================================== */}
          {/* PAGE: CHECKLIST KESIAPAN */}
          {/* ======================================================== */}
          {currentPage === 'checklist' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 shadow-xl">
                <span className="bg-purple-500/20 text-purple-400 text-xs font-black px-3 py-1 rounded-full border border-purple-500/30 uppercase tracking-widest">
                  TRACKER KESIAPAN
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                  Checklist Kesiapan Pekerja Migran
                </h3>
                <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                  Pantau kesiapan berkas dokumen, kesehatan fisik, keterampilan las, dan persiapan mental asrama. Data
                  tersimpan otomatis di peramban Anda.
                </p>
              </div>

              {/* Progress Summary Card */}
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

          {/* ======================================================== */}
          {/* PAGE: QUICK CHEAT-SHEET */}
          {/* ======================================================== */}
          {currentPage === 'cheatsheet' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 shadow-xl">
                <span className="bg-orange-500/20 text-orange-400 text-xs font-black px-3 py-1 rounded-full border border-orange-500/30 uppercase tracking-widest">
                  QUICK REFERENCE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                  Quick Cheat-Sheet
                </h3>
                <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                  Ringkasan visual simbol las standar AWS/ISO, klasifikasi posisi pengelasan 1G s/d 6G, dan kamus istilah
                  Inggris industri berfrekuensi tinggi.
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 border-b border-slate-800 pb-3">
                {[
                  { id: 'symbols', label: '🔣 Simbol Las' },
                  { id: 'positions', label: '📐 Posisi Las (1G-6G)' },
                  { id: 'vocab', label: '📖 Kosakata Inggris' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCheatTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                      activeCheatTab === tab.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Symbols Tab */}
              {activeCheatTab === 'symbols' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
                  {CHEAT_SHEET_DATA.weldingSymbols.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center hover:border-amber-500/40 transition-all shadow-md group"
                    >
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900 border border-slate-700 text-2xl font-mono flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                        {s.symbol}
                      </div>
                      <h5 className="text-sm font-bold text-white mb-1">{s.name}</h5>
                      <p className="text-xs text-slate-400 mb-3 leading-relaxed">{s.desc}</p>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-amber-300/80">
                        {s.note}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Positions Tab */}
              {activeCheatTab === 'positions' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
                  {CHEAT_SHEET_DATA.weldingPositions.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {p.pos}
                        </span>
                        <div className="flex gap-1">
                          {Array(5)
                            .fill(0)
                            .map((_, dotIdx) => (
                              <div
                                key={dotIdx}
                                className={`w-1.5 h-4 rounded-full ${
                                  dotIdx < p.difficulty ? 'bg-amber-400' : 'bg-slate-800'
                                }`}
                              />
                            ))}
                        </div>
                      </div>
                      <h5 className="text-sm font-bold text-white mb-1">{p.name}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Vocab Tab */}
              {activeCheatTab === 'vocab' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {['all', 'Process', 'Equipment', 'Material', 'Defect', 'PPE', 'Safety'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveVocabCat(cat)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                          activeVocabCat === cat
                            ? 'bg-slate-800 text-amber-400 border-amber-500/40'
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        {cat === 'all' ? 'Semua Kategori' : cat}
                      </button>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {CHEAT_SHEET_DATA.englishVocab
                      .filter((v) => activeVocabCat === 'all' || v.cat === activeVocabCat)
                      .map((v, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h5 className="text-sm font-black text-white">{v.en}</h5>
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                                {v.cat}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">{v.id}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
