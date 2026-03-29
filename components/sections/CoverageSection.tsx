import RevealSection from "@/components/RevealSection";

const DIY = [
  "Kota Yogyakarta",
  "Kabupaten Sleman",
  "Kabupaten Bantul",
  "Kabupaten Kulon Progo",
  "Kabupaten Gunung Kidul",
];

const JATENG = [
  "Kabupaten Magelang",
  "Kota Magelang",
  "Kabupaten Klaten",
  "Kabupaten Boyolali",
  "Kabupaten Purworejo",
  "Kota Salatiga",
  "Kabupaten Semarang",
  "Kota Semarang",
  "Kabupaten Sukoharjo",
  "Kota Surakarta (Solo)",
  "Kabupaten Temanggung",
  "Kabupaten Wonogiri",
];

export default function CoverageSection() {
  return (
    <section className="py-24 px-6 bg-white" id="wilayah">
      <div className="max-w-[1100px] mx-auto">
        <RevealSection>
          <div className="text-center">
            <p className="text-xs font-bold tracking-[2px] uppercase text-gold-500 mb-3">
              Wilayah Layanan
            </p>
            <h2 className="font-amiri text-[40px] leading-[1.25] mb-4">
              Kami Melayani 17 Kota & Kabupaten
            </h2>
            <p className="text-[17px] text-slate-500 leading-relaxed max-w-[640px] mx-auto">
              Tim kami datang langsung ke lokasi Anda — rumah, kantor, atau
              pabrik. Tidak perlu repot bepergian.
            </p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* DIY */}
          <RevealSection delay={0.1}>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  DI
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-900">
                    DI Yogyakarta
                  </h3>
                  <p className="text-xs text-emerald-600 font-medium">
                    5 kota/kabupaten — seluruh wilayah
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {DIY.map((k) => (
                  <div
                    key={k}
                    className="flex items-center gap-2.5 bg-white/70 rounded-xl px-4 py-2.5"
                  >
                    <span className="text-emerald-500 text-sm">✓</span>
                    <span className="text-sm text-slate-700 font-medium">
                      {k}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Jateng */}
          <RevealSection delay={0.2}>
            <div className="bg-gradient-to-br from-gold-200/20 to-gold-200/40 border border-gold-300/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center text-emerald-900 text-xl font-bold">
                  JT
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-900">
                    Sebagian Jawa Tengah
                  </h3>
                  <p className="text-xs text-gold-500 font-medium">
                    12 kota/kabupaten
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {JATENG.map((k) => (
                  <div
                    key={k}
                    className="flex items-center gap-2.5 bg-white/70 rounded-xl px-4 py-2.5"
                  >
                    <span className="text-gold-500 text-sm">✓</span>
                    <span className="text-sm text-slate-700 font-medium">
                      {k}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>

        <RevealSection delay={0.3}>
          <p className="text-center text-sm text-slate-400 mt-8">
            Wilayah di luar daftar di atas? Hubungi kami — kami akan berusaha
            mengakomodasi kebutuhan Anda.
          </p>
        </RevealSection>
      </div>
    </section>
  );
}
