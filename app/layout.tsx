import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Amiri } from "next/font/google";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "RuqyahSyari.com — Layanan Ruqyah Syar'iyyah Profesional",
    template: "%s — RuqyahSyari.com",
  },
  description:
    "Layanan ruqyah syar'iyyah profesional sesuai Al-Qur'an & Hadits untuk pembersihan gangguan non-medis pada individu, rumah, kantor, hingga pabrik di DIY & sebagian Jawa Tengah.",
  keywords: [
    "ruqyah",
    "ruqyah syariah",
    "ruqyah jogja",
    "ruqyah yogyakarta",
    "ruqyah sleman",
    "ruqyah bantul",
    "ruqyah semarang",
    "ruqyah solo",
    "ruqyah magelang",
    "ruqyah klaten",
    "ruqyah salatiga",
    "ruqyah boyolali",
    "pembersihan rumah islami",
    "ruqyah kantor",
    "ruqyah pabrik",
    "ruqyah gudang",
    "gangguan jin",
    "pengobatan islami",
  ],
  metadataBase: new URL("https://ruqyahsyari.com"),
  openGraph: {
    title: "RuqyahSyari.com — Layanan Ruqyah Syar'iyyah Profesional",
    description:
      "Hadirkan ketenangan & barokah di rumah dan usaha Anda. Layanan ruqyah sesuai syariat Islam oleh praktisi berpengalaman.",
    url: "https://ruqyahsyari.com",
    siteName: "RuqyahSyari.com",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RuqyahSyari.com — Layanan Ruqyah Syar'iyyah Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RuqyahSyari.com — Layanan Ruqyah Syar'iyyah Profesional",
    description:
      "Hadirkan ketenangan & barokah di rumah dan usaha Anda.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://ruqyahsyari.com" },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
};

// JSON-LD Structured Data for LocalBusiness
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "RuqyahSyari.com",
  description:
    "Layanan ruqyah syar'iyyah profesional untuk pembersihan gangguan non-medis pada individu, rumah, kantor, hingga pabrik.",
  url: "https://ruqyahsyari.com",
  telephone: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281326320313"}`,
  email: "info@ruqyahsyari.com",
  areaServed: [
    { "@type": "State", name: "DI Yogyakarta" },
    { "@type": "City", name: "Kota Yogyakarta" },
    { "@type": "City", name: "Sleman" },
    { "@type": "City", name: "Bantul" },
    { "@type": "City", name: "Kulon Progo" },
    { "@type": "City", name: "Gunung Kidul" },
    { "@type": "City", name: "Magelang" },
    { "@type": "City", name: "Klaten" },
    { "@type": "City", name: "Boyolali" },
    { "@type": "City", name: "Purworejo" },
    { "@type": "City", name: "Salatiga" },
    { "@type": "City", name: "Semarang" },
    { "@type": "City", name: "Sukoharjo" },
    { "@type": "City", name: "Surakarta" },
    { "@type": "City", name: "Temanggung" },
    { "@type": "City", name: "Wonogiri" },
  ],
  priceRange: "Rp 350.000 - Rp 10.000.000",
  openingHours: "Mo-Su 00:00-23:59",
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan Ruqyah",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ruqyah Mandiri",
          description: "Penanganan individual untuk gangguan non-medis",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "IDR",
          minPrice: 350000,
          maxPrice: 500000,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pembersihan Bangunan",
          description: "Netralisir energi negatif rumah, kantor, gudang, pabrik",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "IDR",
          minPrice: 500000,
          maxPrice: 10000000,
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakarta.variable} ${amiri.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        {/* Google Ads (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-415170601"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-415170601');
            `,
          }}
        />
      </head>
      <body className="font-jakarta">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
