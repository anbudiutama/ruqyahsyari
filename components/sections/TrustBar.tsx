export default function TrustBar() {
  const items = [
    { icon: "🕌", title: "100% Syar'i", sub: "Berdasarkan Qur'an & Hadits" },
    { icon: "👥", title: "500+ Klien", sub: "Sudah merasakan manfaat" },
    { icon: "📍", title: "DIY & Jateng", sub: "17 kota/kabupaten terlayani" },
    { icon: "🕐", title: "24 Jam Siaga", sub: "Layanan darurat tersedia" },
  ];

  return (
    <div className="bg-white border-b border-black/[.06] py-7 px-6">
      <div className="max-w-[1000px] mx-auto flex justify-center gap-12 flex-wrap">
        {items.map((t) => (
          <div key={t.title} className="flex items-center gap-3">
            <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center text-xl">
              {t.icon}
            </div>
            <div className="text-sm">
              <strong className="block text-emerald-800 font-bold">
                {t.title}
              </strong>
              <span className="text-slate-400 text-xs">{t.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
