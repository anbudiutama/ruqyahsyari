export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281326320313";

const WA_GREETING = `Assalamu'alaikum RuqyahSyari.com,

Saya ingin berkonsultasi mengenai gangguan yang saya/keluarga/tempat usaha saya alami.

Mohon bantuannya. JazakAllahu khairan.`;

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_GREETING)}`;

export const SERVICES = [
  {
    cat: "Residensial",
    icon: "🏠",
    items: [
      {
        name: "Ruqyah Mandiri",
        desc: "Penanganan individual untuk gangguan non-medis, kegelisahan, atau gangguan tidur.",
        price: "Rp 350.000 – 500.000 / sesi",
      },
      {
        name: "Ruqyah Keluarga",
        desc: "Sesi bersama hingga 5 anggota keluarga untuk keharmonisan & ketenangan rumah tangga.",
        price: "Rp 750.000 – 1.000.000 / sesi",
      },
      {
        name: "Pembersihan Rumah",
        desc: "Netralisir energi negatif, gangguan gaib, dan hadirkan suasana barokah di hunian Anda.",
        price: "Rp 500.000 – 750.000 / sesi",
      },
    ],
  },
  {
    cat: "Korporat",
    icon: "🏢",
    items: [
      {
        name: "Netralisir Ruko / Kantor",
        desc: "Bersihkan tempat usaha dari gangguan gaib agar bisnis berjalan lancar & produktif.",
        price: "Rp 1.500.000 – 2.500.000 / sesi",
      },
      {
        name: "Netralisir Gudang / Pabrik",
        desc: "Pembersihan area besar untuk keamanan, kenyamanan, dan kelancaran operasional.",
        price: "Rp 5.000.000 – 10.000.000 / sesi",
      },
    ],
  },
  {
    cat: "Layanan Khusus",
    icon: "⭐",
    items: [
      {
        name: "Paket Pemulihan Intensif",
        desc: "Program 3–5 sesi berkelanjutan untuk kasus yang memerlukan penanganan bertahap.",
        price: "Rp 1.250.000 – 2.000.000",
      },
      {
        name: "Layanan Darurat 24 Jam",
        desc: "Siap hadir kapanpun Anda membutuhkan pertolongan mendesak.",
        price: "Biaya Dasar + Rp 200.000 / sesi",
      },
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "Ibu Ratna S.",
    loc: "Semarang",
    text: "Alhamdulillah, setelah ruqyah keluarga, anak saya yang sering menangis tanpa sebab di malam hari kini tidur nyenyak. Kami merasakan ketenangan luar biasa.",
    rating: 5,
  },
  {
    name: "Bpk. Hendra W.",
    loc: "Yogyakarta",
    text: "Kantor kami yang selama bertahun-tahun terasa 'berat' kini terasa adem dan nyaman setelah dinetralisir. Karyawan jadi lebih betah dan produktif.",
    rating: 5,
  },
  {
    name: "Ibu Fatimah",
    loc: "Solo",
    text: "Saya sudah mencoba berbagai pengobatan untuk keluhan saya yang tidak terdeteksi medis. Setelah menjalani paket intensif 5 sesi, Alhamdulillah ada perubahan besar.",
    rating: 5,
  },
  {
    name: "Bpk. Ahmad R.",
    loc: "Magelang",
    text: "Gudang pabrik kami sering terjadi kejadian aneh yang membuat karyawan takut. Setelah pembersihan, suasana berubah total. Sangat profesional dan sesuai syariat.",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "Apakah ruqyah itu sesuai syariat Islam?",
    a: "Ruqyah syar'iyyah adalah metode penyembuhan yang diajarkan oleh Rasulullah ﷺ menggunakan ayat-ayat Al-Qur'an dan doa-doa yang shahih. Kami hanya menggunakan metode yang sesuai dengan Al-Qur'an dan Hadits.",
  },
  {
    q: "Berapa lama satu sesi ruqyah berlangsung?",
    a: "Satu sesi ruqyah umumnya berlangsung 1–2 jam, tergantung kondisi dan kebutuhan klien. Untuk pembersihan bangunan, durasi menyesuaikan luas area.",
  },
  {
    q: "Apakah harus datang ke tempat Anda?",
    a: "Tidak. Tim kami yang akan datang ke lokasi Anda — baik rumah, kantor, gudang, maupun pabrik. Kami melayani seluruh wilayah DI Yogyakarta dan sebagian Jawa Tengah (Magelang, Klaten, Boyolali, Purworejo, Salatiga, Semarang, Sukoharjo, Solo, Temanggung, Wonogiri).",
  },
  {
    q: "Apakah ada jaminan hasilnya?",
    a: 'Semua hasil adalah kehendak Allah ﷻ. Yang kami jamin adalah metode kami 100% sesuai syariat Islam, dilakukan oleh praktisi berpengalaman, dan kami memberikan panduan follow-up agar manfaatnya berkelanjutan.',
  },
  {
    q: "Bagaimana jika saya tidak mampu membayar penuh?",
    a: "Kami menerapkan prinsip subsidi silang. Silakan hubungi kami untuk konsultasi — kami akan mencari solusi terbaik insyaAllah.",
  },
  {
    q: "Apakah tersedia layanan darurat?",
    a: "Ya, kami menyediakan layanan darurat 24 jam untuk situasi mendesak dengan biaya tambahan Rp 200.000 per sesi di atas biaya dasar layanan.",
  },
];

export const PILAR = [
  {
    icon: "⚖️",
    name: "3 Prinsip Kerjasama",
    desc: "Benar, Kurup, Janji — setiap transaksi kami dibangun di atas kejujuran dan komitmen.",
  },
  {
    icon: "🤝",
    name: "6 Akhlak Luhur",
    desc: "Rukun, Kompak, Kerjasama Baik, Jujur, Amanah, Mujhid Muzhid — akhlak yang kami jaga dalam setiap interaksi.",
  },
  {
    icon: "🛡️",
    name: "Terhindar 7 Transaksi Haram",
    desc: "Riba, Gharar, Dharar, Maysir, Maksiat, Suht, Risywah — 7 hal haram yang kami hindari sepenuhnya.",
  },
  {
    icon: "🔄",
    name: "4 Roda Berputar",
    desc: "Yang kuat membantu yang lemah, yang bisa mengajari yang belum bisa, saling mengingatkan, dan bertaubat jika salah.",
  },
  {
    icon: "🤲",
    name: "4 Tali Keimanan",
    desc: "Bersyukur, mengagungkan Allah & Rasul, bersungguh-sungguh dalam Qur'an Hadits & kerja, dan senantiasa berdoa.",
  },
  {
    icon: "💎",
    name: "Menghadapi 4 Maqodirullah",
    desc: "Nikmat disyukuri, cobaan disabari, musibah diistirja'i, kesalahan ditaubati.",
  },
];

export const KOTA_LIST = [
  // DI Yogyakarta
  "Kota Yogyakarta",
  "Kabupaten Sleman",
  "Kabupaten Bantul",
  "Kabupaten Kulon Progo",
  "Kabupaten Gunung Kidul",
  // Sebagian Jawa Tengah
  "Kabupaten Magelang",
  "Kota Magelang",
  "Kabupaten Klaten",
  "Kabupaten Boyolali",
  "Kabupaten Purworejo",
  "Kota Salatiga",
  "Kabupaten Semarang",
  "Kota Semarang",
  "Kabupaten Sukoharjo",
  "Kota Surakarta (Solo)",
  "Kabupaten Temanggung",
  "Kabupaten Wonogiri",
  "Lainnya (sebutkan di keterangan)",
];

export const LAYANAN_LIST = [
  "Ruqyah Mandiri (Individu)",
  "Ruqyah Keluarga (Maks 5 Orang)",
  "Pembersihan Bangunan Rumah",
  "Netralisir Ruko / Kantor",
  "Netralisir Gudang / Pabrik",
  "Paket Pemulihan Intensif (3-5 Sesi)",
  "Layanan Darurat 24 Jam",
  "Konsultasi Dulu (Belum Yakin)",
];
