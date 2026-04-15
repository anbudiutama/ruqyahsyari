import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/50 pt-16 pb-8 px-6">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <Image
            src="/logo.png"
            alt="RuqyahSyari.com"
            width={160}
            height={87}
            className="h-14 w-auto mb-4 brightness-0 invert opacity-90"
          />
          <p className="text-sm leading-7">
            Layanan ruqyah syar&apos;iyyah profesional untuk ketenangan jiwa,
            rumah, dan usaha Anda. Berdasarkan Al-Qur&apos;an & Hadits,
            dilakukan oleh praktisi berpengalaman.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
            Layanan
          </h4>
          <Link
            href="/#layanan"
            className="block text-white/50 text-sm mb-2.5 hover:text-gold-400 transition-colors no-underline"
          >
            Ruqyah Mandiri
          </Link>
          <Link
            href="/#layanan"
            className="block text-white/50 text-sm mb-2.5 hover:text-gold-400 transition-colors no-underline"
          >
            Ruqyah Keluarga
          </Link>
          <Link
            href="/#layanan"
            className="block text-white/50 text-sm mb-2.5 hover:text-gold-400 transition-colors no-underline"
          >
            Pembersihan Rumah
          </Link>
          <Link
            href="/#layanan"
            className="block text-white/50 text-sm mb-2.5 hover:text-gold-400 transition-colors no-underline"
          >
            Netralisir Kantor
          </Link>
          <Link
            href="/#layanan"
            className="block text-white/50 text-sm mb-2.5 hover:text-gold-400 transition-colors no-underline"
          >
            Layanan Darurat
          </Link>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
            Hubungi
          </h4>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/50 text-sm mb-2.5 hover:text-gold-400 transition-colors no-underline"
          >
            WhatsApp
          </a>
          <a
            href="mailto:info@ruqyahsyari.com"
            className="block text-white/50 text-sm mb-2.5 hover:text-gold-400 transition-colors no-underline"
          >
            info@ruqyahsyari.com
          </a>
          <span className="block text-white/50 text-sm mb-2.5">
            DIY & Sebagian Jawa Tengah
          </span>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto mt-10 pt-6 border-t border-white/[.08] text-center text-xs">
        <div className="mb-3">
          <Link
            href="/kebijakan-privasi"
            className="text-white/40 hover:text-gold-400 transition-colors no-underline mx-3"
          >
            Kebijakan Privasi
          </Link>
          <span className="text-white/20">|</span>
          <Link
            href="/formulir"
            className="text-white/40 hover:text-gold-400 transition-colors no-underline mx-3"
          >
            Daftar Layanan
          </Link>
        </div>
        © 2026 RuqyahSyari.com — Bagian dari ekosistem dakwah rahmatan lil
        alamin.
      </div>
    </footer>
  );
}
