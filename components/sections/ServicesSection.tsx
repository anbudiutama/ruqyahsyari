import Link from "next/link";
import RevealSection from "@/components/RevealSection";
import { SERVICES } from "@/lib/constants";

export default function ServicesSection() {
  return (
    <section className="py-24 px-6" id="layanan">
      <div className="max-w-[1100px] mx-auto">
        <RevealSection>
          <p className="text-xs font-bold tracking-[2px] uppercase text-gold-500 mb-3">
            Layanan Kami
          </p>
          <h2 className="font-amiri text-[40px] leading-[1.25] mb-4">
            Solusi Lengkap untuk Ketenangan Anda
          </h2>
          <p className="text-[17px] text-slate-500 leading-relaxed max-w-[640px]">
            Dari individu hingga korporat, kami menyediakan layanan pembersihan
            spiritual yang komprehensif dan profesional.
          </p>
        </RevealSection>

        {SERVICES.map((cat, ci) => (
          <RevealSection key={ci} delay={0.1}>
            <div className={ci === 0 ? "mt-12" : "mt-10"}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center text-[22px]">
                  {cat.icon}
                </div>
                <span className="text-[22px] font-bold text-emerald-900">
                  {cat.cat}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.items.map((s, si) => (
                  <div
                    key={si}
                    className="bg-white border border-black/[.06] rounded-2xl p-7 flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h4 className="text-[17px] font-bold text-emerald-900 mb-2">
                      {s.name}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed flex-1">
                      {s.desc}
                    </p>
                    <div className="mt-4 pt-4 border-t border-black/[.06] text-[15px] font-bold text-gold-500">
                      {s.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        ))}

        <RevealSection delay={0.2}>
          <div className="text-center mt-10">
            <p className="text-sm text-slate-400 mb-5">
              * Harga berlaku untuk wilayah DIY & sebagian Jawa Tengah. Untuk wilayah
              lain, silakan hubungi kami.
            </p>
            <Link
              href="/formulir"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-700 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all no-underline"
            >
              📋 Daftarkan Diri Anda Sekarang
            </Link>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
