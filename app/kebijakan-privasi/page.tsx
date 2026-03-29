import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — RuqyahSyari.com",
};

export default function KebijakanPrivasi() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-emerald-900 from-0% via-emerald-800 via-[200px] to-cream to-[200px] pt-24">
        <div className="text-center text-white px-6 pb-12">
          <h1 className="font-amiri text-[36px] mb-2">Kebijakan Privasi</h1>
          <p className="text-sm text-white/60">Terakhir diperbarui: Maret 2026</p>
        </div>
        <div className="max-w-[720px] mx-auto px-6 pb-20">
          <div className="bg-white rounded-[20px] shadow-xl p-8 md:p-12 -mt-4 text-[15px] text-slate-600 leading-[1.8] space-y-6">
            <section>
              <h2 className="text-lg font-bold text-emerald-900 mb-3">
                1. Data yang Kami Kumpulkan
              </h2>
              <p>
                Melalui formulir pendaftaran, kami mengumpulkan: nama lengkap,
                nomor telepon/WhatsApp, email (opsional), alamat, kota, jenis
                layanan yang diinginkan, jadwal pilihan, keluhan yang dialami,
                dan riwayat penanganan sebelumnya.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-emerald-900 mb-3">
                2. Tujuan Penggunaan Data
              </h2>
              <p>
                Data Anda digunakan semata-mata untuk: menghubungi Anda terkait
                layanan yang diminta, menjadwalkan sesi ruqyah, memberikan
                layanan sesuai kebutuhan, dan melakukan follow-up pasca layanan.
                Kami tidak menggunakan data Anda untuk tujuan pemasaran pihak
                ketiga.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-emerald-900 mb-3">
                3. Penyimpanan & Keamanan Data
              </h2>
              <p>
                Data disimpan secara aman menggunakan layanan cloud yang
                terenkripsi (Google Firebase/Firestore). Akses ke data dibatasi
                hanya untuk tim operasional yang berwenang. Kami menerapkan
                Firestore Security Rules untuk mencegah akses tidak sah.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-emerald-900 mb-3">
                4. Hak Anda (sesuai UU PDP)
              </h2>
              <p>
                Sesuai Undang-Undang Pelindungan Data Pribadi (UU No. 27 Tahun
                2022), Anda berhak untuk: meminta akses terhadap data pribadi
                Anda, meminta perbaikan data yang tidak akurat, meminta
                penghapusan data Anda, dan menarik persetujuan atas pemrosesan
                data. Untuk menggunakan hak-hak ini, silakan hubungi kami
                melalui email atau WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-emerald-900 mb-3">
                5. Berbagi Data dengan Pihak Ketiga
              </h2>
              <p>
                Kami tidak menjual, menyewakan, atau membagikan data pribadi
                Anda kepada pihak ketiga mana pun, kecuali diwajibkan oleh
                hukum yang berlaku.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-emerald-900 mb-3">
                6. Retensi Data
              </h2>
              <p>
                Data Anda disimpan selama diperlukan untuk memberikan layanan dan
                menjalankan kewajiban hukum. Anda dapat meminta penghapusan data
                kapan saja.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-emerald-900 mb-3">
                7. Kontak
              </h2>
              <p>
                Untuk pertanyaan terkait privasi data, hubungi kami di{" "}
                <a
                  href="mailto:info@ruqyahsyari.com"
                  className="text-emerald-700 underline"
                >
                  info@ruqyahsyari.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
