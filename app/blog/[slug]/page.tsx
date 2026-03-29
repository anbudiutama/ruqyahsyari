import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BLOG_ARTICLES,
  BLOG_CATEGORIES,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/blog-data";
import { WHATSAPP_URL } from "@/lib/constants";

type Props = { params: { slug: string } };

// Generate static paths for all articles
export async function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

// Dynamic metadata per article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://ruqyahsyari.com/blog/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      siteName: "RuqyahSyari.com",
      locale: "id_ID",
    },
    alternates: {
      canonical: `https://ruqyahsyari.com/blog/${article.slug}`,
    },
  };
}

// Markdown-like content renderer (handles ##, ###, bold, italic)
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={key++} className="h-3" />);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          key={key++}
          className="text-lg font-bold text-emerald-900 mt-8 mb-3"
        >
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="text-xl font-bold text-emerald-900 mt-10 mb-4 pb-2 border-b border-emerald-100"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else {
      // Process inline bold and italic
      const html = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-900">$1</strong>')
        .replace(/\*(.*?)\*/g, "<em>$1</em>");

      elements.push(
        <p
          key={key++}
          className="text-[15px] text-slate-600 leading-[1.85] mb-3"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
  }

  return elements;
}

export default function BlogArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(params.slug, 3);
  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.key === article.category)?.label ||
    article.category;

  // Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: "RuqyahSyari.com",
      url: "https://ruqyahsyari.com",
    },
    publisher: {
      "@type": "Organization",
      name: "RuqyahSyari.com",
      url: "https://ruqyahsyari.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ruqyahsyari.com/blog/${article.slug}`,
    },
    keywords: article.keywords.join(", "),
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-emerald-900 from-0% via-emerald-800 via-[260px] to-cream to-[260px] pt-24">
        {/* Header */}
        <div className="text-center text-white px-6 pb-14 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Link
              href="/blog"
              className="text-white/60 text-sm hover:text-white no-underline"
            >
              ← Blog
            </Link>
            <span className="text-white/30">|</span>
            <span
              className={`text-[11px] font-semibold px-3 py-1 rounded-full ${article.categoryColor}`}
            >
              {categoryLabel}
            </span>
            <span className="text-white/40 text-xs">{article.readTime}</span>
          </div>
          <h1 className="font-amiri text-[28px] md:text-[38px] leading-[1.3] max-w-[720px] mx-auto">
            {article.title}
          </h1>
          <p className="text-sm text-white/50 mt-3">
            {new Date(article.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {article.updatedAt !== article.publishedAt &&
              ` · Diperbarui ${new Date(article.updatedAt).toLocaleDateString(
                "id-ID",
                { day: "numeric", month: "long", year: "numeric" }
              )}`}
          </p>
        </div>

        {/* Article Content */}
        <div className="max-w-[720px] mx-auto px-6 pb-12 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg border border-black/[.06] p-8 md:p-12 -mt-4">
            {/* Excerpt */}
            <p className="text-[17px] text-slate-700 leading-[1.8] font-medium mb-6 pb-6 border-b border-slate-100">
              {article.excerpt}
            </p>

            {/* Content */}
            <article>{renderContent(article.content)}</article>

            {/* CTA Box */}
            <div className="mt-12 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 rounded-2xl p-8 text-center">
              <h3 className="font-amiri text-2xl text-emerald-900 mb-3">
                Mengalami Tanda-Tanda di Atas?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-md mx-auto">
                Jangan biarkan gangguan ini semakin berat. Konsultasikan kondisi
                Anda dengan praktisi ruqyah syar&apos;iyyah berpengalaman — gratis,
                tanpa komitmen.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-700 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:-translate-y-0.5 hover:shadow-xl transition-all no-underline"
                >
                  💬 Konsultasi via WhatsApp
                </a>
                <Link
                  href="/formulir"
                  className="inline-flex items-center gap-2 bg-white border-2 border-emerald-200 text-emerald-800 px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-all no-underline"
                >
                  📋 Isi Formulir Pendaftaran
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="max-w-[1000px] mx-auto px-6 pb-20">
            <h3 className="font-amiri text-2xl text-emerald-900 mb-6">
              Artikel Terkait
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="bg-white rounded-2xl border border-black/[.06] p-6 hover:-translate-y-1 hover:shadow-lg transition-all no-underline group block"
                >
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${r.categoryColor}`}
                  >
                    {BLOG_CATEGORIES.find((c) => c.key === r.category)?.label}
                  </span>
                  <h4 className="text-sm font-bold text-emerald-900 mt-3 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                    {r.title}
                  </h4>
                  <p className="text-xs text-slate-400">{r.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
