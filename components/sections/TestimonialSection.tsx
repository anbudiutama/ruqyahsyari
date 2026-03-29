import RevealSection from "@/components/RevealSection";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <RevealSection>
          <p className="text-xs font-bold tracking-[2px] uppercase text-gold-500 mb-3">
            Testimoni
          </p>
          <h2 className="font-amiri text-[40px] leading-[1.25] mb-4">
            Apa Kata Mereka yang Sudah Merasakan
          </h2>
          <p className="text-[17px] text-slate-500 leading-relaxed max-w-[640px]">
            Alhamdulillah, ratusan klien telah merasakan manfaat layanan kami.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {TESTIMONIALS.map((t, i) => (
            <RevealSection key={i} delay={i * 0.1}>
              <div className="bg-white border border-black/[.06] rounded-2xl p-8 relative h-full">
                <div className="absolute top-5 right-6 font-amiri text-[64px] text-emerald-100 leading-none select-none">
                  &ldquo;
                </div>
                <div className="text-gold-500 text-base tracking-[2px] mb-4">
                  {"★".repeat(t.rating)}
                </div>
                <p className="text-[15px] text-slate-500 leading-[1.8] mb-5 italic">
                  {t.text}
                </p>
                <div className="text-sm font-bold text-emerald-800">
                  {t.name}
                </div>
                <div className="text-xs text-slate-400">{t.loc}</div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
