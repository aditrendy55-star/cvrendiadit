export type ExperienceCard = {
  org: string;
  image: string;
  role: string;
  period: string;
  category: string;
  bullets: string[];
};

export const EXPERIENCE_CARDS: ExperienceCard[] = [
  {
    org: "IAGARAGE Carwash & Cafe",
    image: "/placeholders/digital-01.svg",
    role: "E-Commerce & Digital Operations",
    period: "Jul – Sep 2026",
    category: "E-Commerce & Operations",
    bullets: [
      "Mengelola Shopee Shop & TikTok Shop dari listing hingga fulfillment.",
      "Menyusun pricing strategy dan program promosi marketplace.",
    ],
  },
  {
    org: "CepotTech",
    image: "/placeholders/tools-01.svg",
    role: "Project Tim",
    period: "Des 2025 – sekarang",
    category: "Web & Tim",
    bullets: [
      "Pengembangan website klien sesuai brief dan kebutuhan bisnis.",
      "Manajemen operasional tim: pembagian tugas dan progres proyek.",
    ],
  },
  {
    org: "LampungNEW",
    image: "/placeholders/drawing-01.svg",
    role: "Project Tim",
    period: "Jan 2026 – sekarang",
    category: "Konten & Web",
    bullets: [
      "Riset konten wisata sebagai dasar penyusunan artikel dan video.",
      "Frontend & backend dasar website.",
    ],
  },
  {
    org: "Usaha Roti Bakar WayHalim",
    image: "/placeholders/drawing-02.svg",
    role: "Business & Operations",
    period: "Jan – Agu 2026",
    category: "Bisnis & Operations",
    bullets: [
      "Pengelolaan operasional harian usaha.",
      "Pencatatan dan pengelolaan keuangan.",
    ],
  },
  {
    org: "Website IAGARAGE Carwash",
    image: "/placeholders/drawing-03.svg",
    role: "Project Tim",
    period: "Feb – Mar 2026",
    category: "Web Project",
    bullets: [
      "Pengembangan frontend website.",
      "Implementasi fitur produk, distributor, dan blog.",
    ],
  },
  {
    org: "Freelance Technical Drawing & AutoCAD",
    image: "/placeholders/digital-01.svg",
    role: "Technical Drafter",
    period: "2022 – 2025",
    category: "Teknik",
    bullets: [
      "Pembuatan gambar teknik 2D berdasarkan brief klien.",
      "Penyusunan DED (Dokumen Eksekusi Desain).",
    ],
  },
];

export const PROJECT_CARD_SLOTS: ExperienceCard[] = [
  ...EXPERIENCE_CARDS,
  {
    org: "Project Baru",
    image: "/placeholders/tools-01.svg",
    role: "Tambahkan project",
    period: "Segera",
    category: "Project",
    bullets: ["Deskripsi project dapat ditambahkan di sini."],
  },
  {
    org: "Project Baru",
    image: "/placeholders/tools-01.svg",
    role: "Tambahkan project",
    period: "Segera",
    category: "Project",
    bullets: ["Deskripsi project dapat ditambahkan di sini."],
  },
];
