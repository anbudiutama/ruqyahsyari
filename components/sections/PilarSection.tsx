import RevealSection from "@/components/RevealSection";
import { PILAR } from "@/lib/constants";

export default function PilarSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-emerald-900 to-[#032d22] text-white relative overflow-hidden">
      <div className="geo-pattern" />
      <div className="max-w-[1100px] mx-auto relative z-10">
        <RevealSection>
          <p className="text-xs font-bold tracking-[2px] uppercase text-gold-300 mb-3">
            Pilar Budaya & Etika Kerja
          </p>
          <h2 className="font-amiri text-[40px] leading-[1.25] text-white mb-4">
            6 Pilar yang Menjadi Fondasi Kami
          </h2>
          <p className="text-[17px] text-white/70 leading-relaxed max-w-[640px]">
            Bukan hanya layanan, tetapi amanah. Setiap tindakan kami dilandasi
            oleh prinsip-prinsip Islam yang kokoh.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {PILAR.map((p, i) => (
            <RevealSection key={i} delay={i * 0.1}>
              <div className="bg-white/[.06] border border-white/10 rounded-2xl p-7 transition-colors hover:bg-white/10 h-full">
                <div className="text-[28px] mb-4">{p.icon}</div>
                <h4 className="text-base font-bold text-gold-300 mb-2">
                  {p.name}
                </h4>
                <p className="text-[13px] text-white/65 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
