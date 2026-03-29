import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-[#032d22] to-charcoal flex items-center overflow-hidden">
      <div className="geo-pattern" />
      {/* Floating orbs */}
      <div
        className="absolute w-[400px] h-[400px] -top-24 -right-12 rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #d4a843, transparent 70%)",
          animation: "float1 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] -bottom-20 left-[10%] rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #10b981, transparent 70%)",
          animation: "float2 10s ease-in-out infinite",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="text-center lg:text-left">
          <h1 className="font-amiri text-4xl md:text-[56px] leading-[1.15] text-white mb-2">
            Hadirkan{" "}
            <span className="text-gold-400">Ketenangan</span> &{" "}
            <span className="text-gold-400">Barokah</span> di Rumah dan
            Usaha Anda
          </h1>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-9 max-w-[540px] mx-auto lg:mx-0">
            Layanan ruqyah syar&apos;iyyah profesional — sesuai Al-Qur&apos;an
            & Hadits — untuk pembersihan gangguan non-medis pada individu,
            rumah, kantor, hingga pabrik di DIY & sebagian Jawa Tengah.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-9 justify-center lg:justify-start">
            {[
              "Sesuai Syariat Islam",
              "Praktisi Berpengalaman",
              "Transparan & Amanah",
              "Darurat 24 Jam",
            ].map((b) => (
              <span
                key={b}
                className="flex items-center gap-1.5 bg-white/[.08] border border-white/[.12] px-4 py-2 rounded-full text-white/90 text-[13px] font-medium"
              >
                <span className="text-emerald-500">✓</span> {b}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/formulir"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-gold-500 to-gold-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all no-underline"
            >
              📋 Daftar Konsultasi Gratis
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white/25 text-white px-7 py-[14px] rounded-xl font-semibold text-base hover:border-gold-400 hover:bg-white/5 transition-all no-underline"
            >
              💬 Chat WhatsApp
            </a>
          </div>
        </div>

        {/* Ayat Card */}
        <div className="flex justify-center items-center">
          <div className="bg-white/[.04] border border-white/[.08] rounded-3xl p-10 backdrop-blur-xl max-w-[420px] w-full">
            <p
              className="font-amiri text-[28px] text-gold-300 text-center leading-[1.8] mb-5"
              dir="rtl"
            >
              وَنُنَزِّلُ مِنَ ٱلْقُرْءَانِ مَا هُوَ شِفَآءٌ وَرَحْمَةٌ
              لِّلْمُؤْمِنِينَ
            </p>
            <p className="text-sm text-white/60 text-center leading-7 italic">
              &ldquo;Dan Kami turunkan dari Al-Qur&apos;an (sesuatu) yang
              menjadi penawar dan rahmat bagi orang yang beriman.&rdquo;
            </p>
            <p className="text-center mt-4 text-xs text-gold-500 font-semibold tracking-widest uppercase">
              QS. Al-Isra&apos; : 82
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
