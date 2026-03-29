import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog Edukasi — Gangguan Jin & Makhluk Halus",
  description:
    "Kenali tanda-tanda gangguan jin, sihir, santet, pelet, dan makhluk halus pada diri sendiri, keluarga, rumah, kantor, dan usaha. Edukasi berdasarkan Al-Qur'an & Hadits.",
  keywords: [
    "gangguan jin",
    "tanda sihir",
    "ciri santet",
    "pelet",
    "rumah berhantu",
    "ruqyah",
    "makhluk halus",
    "gangguan gaib",
  ],
  openGraph: {
    title: "Blog Edukasi — RuqyahSyari.com",
    description:
      "Artikel edukasi seputar gangguan jin, sihir, santet, dan cara mengenalinya sesuai Al-Qur'an & Hadits.",
    url: "https://ruqyahsyari.com/blog",
  },
  alternates: { canonical: "https://ruqyahsyari.com/blog" },
};

export default function BlogPage() {
  return <BlogListClient />;
}
