import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-[#032d22] to-charcoal flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[120px] font-bold text-white/10 leading-none select-none">
            404
          </p>
          <h1 className="font-amiri text-3xl text-white -mt-6 mb-4">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Halaman yang Anda cari tidak tersedia. Silakan kembali ke beranda
            atau hubungi kami jika membutuhkan bantuan.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-gold-500 to-gold-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-base no-underline hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  );
}
