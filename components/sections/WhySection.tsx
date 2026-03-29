import RevealSection from "@/components/RevealSection";

const items = [
  { icon: "📖", title: "Sesuai Syariat Islam", desc: "Setiap metode yang kami gunakan berlandaskan Al-Qur'an dan Hadits shahih. Tidak ada praktik klenik, jimat, atau ritual bid'ah." },
  { icon: "🎓", title: "Praktisi Berpengalaman", desc: "Tim kami terdiri dari ustadz dan praktisi yang telah terlatih dan berpengalaman menangani berbagai kasus gangguan non-medis." },
  { icon: "🤝", title: "Transparan & Amanah", desc: "Harga jelas di depan, tidak ada biaya tersembunyi. Seluruh transaksi dilakukan secara terbuka dan jujur." },
  { icon: "🏠", title: "Datang ke Lokasi Anda", desc: "Tidak perlu repot pergi ke mana-mana. Tim kami yang akan datang langsung ke rumah, kantor, atau pabrik Anda." },
  { icon: "💚", title: "Subsidi untuk Dhuafa", desc: "Kami menerapkan prinsip subsidi silang — yang mampu membantu yang tidak mampu. Tidak ada yang ditolak karena keterbatasan biaya." },
  { icon: "⚡", title: "Layanan Darurat 24 Jam", desc: "Situasi mendesak tidak mengenal waktu. Kami siap hadir kapanpun Anda membutuhkan, siang maupun malam." },
];

export default function WhySection() {
  return (
    <section className="py-24 px-6 bg-white" id="tentang">
      <div className="max-w-[1100px] mx-auto">
        <RevealSection>
          <p className="text-xs font-bold tracking-[2px] uppercase text-gold-500 mb-3">
            Mengapa Memilih Kami
          </p>
          <h2 className="font-amiri text-[40px] leading-[1.25] mb-4">
            Kepercayaan Dibangun dari Nilai,
            <br />
            Bukan Sekadar Janji
          </h2>
          <p className="text-[17px] text-slate-500 leading-relaxed max-w-[640px]">
            Kami bukan sekadar penyedia jasa — kami adalah bagian dari ekosistem
            dakwah yang mengutamakan kebenaran, keikhlasan, dan kebermanfaatan.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {items.map((item, i) => (
            <RevealSection key={i} delay={i * 0.1}>
              <div className="bg-white border border-black/[.06] rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-lg h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-[14px] flex items-center justify-center text-2xl mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-emerald-900 mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
