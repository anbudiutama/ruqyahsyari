"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/lib/blog-data";

export default function BlogListClient() {
  const [category, setCategory] = useState("semua");

  const filtered =
    category === "semua"
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((a) => a.category === category);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-emerald-900 from-0% via-emerald-800 via-[280px] to-cream to-[280px] pt-24">
        {/* Header */}
        <div className="text-center text-white px-6 pb-14 relative z-10">
          <p className="text-xs font-bold tracking-[2px] uppercase text-gold-300 mb-3">
            Blog Edukasi
          </p>
          <h1 className="font-amiri text-[36px] md:text-[44px] mb-3">
            Kenali Gangguan Jin & Makhluk Halus
          </h1>
          <p className="text-base text-white/70 max-w-[560px] mx-auto">
            Edukasi seputar tanda-tanda gangguan gaib pada diri sendiri,
            keluarga, rumah, dan usaha — berdasarkan Al-Qur&apos;an & Hadits.
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto px-6 pb-20 relative z-10">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap justify-center mb-8 -mt-2">
            {BLOG_CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  category === c.key
                    ? "bg-emerald-700 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-white rounded-2xl border border-black/[.06] p-7 hover:-translate-y-1 hover:shadow-lg transition-all no-underline group block"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-[11px] font-semibold px-3 py-1 rounded-full ${article.categoryColor}`}
                  >
                    {BLOG_CATEGORIES.find((c) => c.key === article.category)
                      ?.label || article.category}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {article.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mt-4 text-sm font-semibold text-emerald-700 flex items-center gap-1">
                  Baca Selengkapnya
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400">
                Belum ada artikel di kategori ini.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
