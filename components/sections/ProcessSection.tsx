import RevealSection from "@/components/RevealSection";

const steps = [
  {
    num: "1",
    title: "Hubungi Kami",
    desc: "Konsultasi gratis via WhatsApp atau formulir pendaftaran. Ceritakan kebutuhan Anda.",
  },
  {
    num: "2",
    title: "Asesmen Awal",
    desc: "Tim kami melakukan analisis kebutuhan untuk menentukan jenis layanan yang paling tepat.",
  },
  {
    num: "3",
    title: "Pelaksanaan",
    desc: "Praktisi berpengalaman datang ke lokasi Anda dan melakukan ruqyah sesuai syariat Islam.",
  },
  {
    num: "4",
    title: "Follow Up",
    desc: "Panduan pasca-ruqyah dan pendampingan untuk menjaga keberlanjutan hasil.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <RevealSection>
          <div className="text-center">
            <p className="text-xs font-bold tracking-[2px] uppercase text-gold-500 mb-3">
              Cara Kerja
            </p>
            <h2 className="font-amiri text-[40px] leading-[1.25] mb-4">
              4 Langkah Menuju Ketenangan
            </h2>
            <p className="text-[17px] text-slate-500 leading-relaxed max-w-[640px] mx-auto">
              Proses yang sederhana, transparan, dan penuh keikhlasan.
            </p>
          </div>
        </RevealSection>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-emerald-100" />

          {steps.map((s, i) => (
            <RevealSection key={i} delay={i * 0.15}>
              <div className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-emerald-700 to-emerald-600 rounded-full flex items-center justify-center text-2xl font-extrabold text-white relative z-10 border-4 border-cream">
                  {s.num}
                </div>
                <h4 className="text-base font-bold text-emerald-900 mb-2">
                  {s.title}
                </h4>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
