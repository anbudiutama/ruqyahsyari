import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/constants";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-emerald-900 to-[#032d22] py-20 px-6 text-center relative overflow-hidden">
      <div className="geo-pattern" />
      <div className="pattern-overlay" />
      <div className="relative z-10 max-w-[700px] mx-auto">
        <h2 className="font-amiri text-[40px] text-white mb-4">
          Jangan Biarkan Gangguan Menghalangi Ketenangan Anda
        </h2>
        <p className="text-[17px] text-white/70 mb-9 leading-relaxed">
          Langkah pertama menuju kehidupan yang lebih tenang, barokah, dan
          produktif dimulai dari sini. Konsultasi gratis — tanpa komitmen.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/formulir"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-gold-500 to-gold-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all no-underline"
          >
            📋 Isi Formulir Pendaftaran
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white px-7 py-[14px] rounded-xl font-semibold text-base hover:border-gold-400 hover:bg-white/5 transition-all no-underline"
          >
            💬 Langsung Chat WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
