"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  WHATSAPP_NUMBER,
  KOTA_LIST,
  LAYANAN_LIST,
} from "@/lib/constants";

type FormData = {
  nama: string;
  telepon: string;
  email: string;
  alamat: string;
  kota: string;
  jenisLayanan: string;
  kategori: string;
  jumlahOrang: string;
  jadwalPilihan: string;
  waktuPilihan: string;
  keluhan: string;
  riwayat: string;
  sumberInfo: string;
};

const initialForm: FormData = {
  nama: "",
  telepon: "",
  email: "",
  alamat: "",
  kota: "",
  jenisLayanan: "",
  kategori: "",
  jumlahOrang: "",
  jadwalPilihan: "",
  waktuPilihan: "",
  keluhan: "",
  riwayat: "",
  sumberInfo: "",
};

export default function FormulirPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Phone validation
  const isValidPhone = (phone: string) => {
    const cleaned = phone.replace(/[\s\-()]/g, "");
    return /^(\+?62|0)8\d{7,12}$/.test(cleaned);
  };

  const handleSubmit = async () => {
    if (!form.nama || !form.telepon || !form.jenisLayanan) {
      setError("Mohon isi nama, nomor telepon, dan jenis layanan.");
      return;
    }
    if (!isValidPhone(form.telepon)) {
      setError("Format nomor telepon tidak valid. Gunakan format 08xxxxxxxxxx.");
      return;
    }
    if (!consent) {
      setError("Mohon setujui kebijakan privasi untuk melanjutkan.");
      return;
    }

    setSubmitting(true);
    setError("");

    // 1) Save to Firebase via API
    try {
      const res = await fetch("/api/pendaftaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.nama,
          telepon: form.telepon,
          email: form.email || null,
          alamat: form.alamat || null,
          kota: form.kota || null,
          jenis_layanan: form.jenisLayanan,
          kategori: form.kategori || null,
          jumlah_orang: form.jumlahOrang || null,
          jadwal_pilihan: form.jadwalPilihan || null,
          waktu_pilihan: form.waktuPilihan || null,
          keluhan: form.keluhan || null,
          riwayat: form.riwayat || null,
          sumber_info: form.sumberInfo || null,
        }),
      });

      if (!res.ok) {
        console.error("API save failed:", await res.text());
        // Continue anyway — WhatsApp is the fallback
      }
    } catch (err) {
      console.error("Failed to save to DB:", err);
      // Continue to WhatsApp
    }

    // 2) Open WhatsApp with formatted message
    const lines = [
      `*PENDAFTARAN RUQYAHSYARI.COM*`,
      ``,
      `👤 *Data Diri*`,
      `Nama: ${form.nama}`,
      `Telepon: ${form.telepon}`,
      form.email ? `Email: ${form.email}` : null,
      form.alamat ? `Alamat: ${form.alamat}` : null,
      form.kota ? `Kota: ${form.kota}` : null,
      ``,
      `📋 *Detail Layanan*`,
      `Jenis: ${form.jenisLayanan}`,
      form.kategori ? `Kategori: ${form.kategori}` : null,
      form.jumlahOrang ? `Jumlah Orang: ${form.jumlahOrang}` : null,
      form.jadwalPilihan ? `Jadwal: ${form.jadwalPilihan}` : null,
      form.waktuPilihan ? `Waktu: ${form.waktuPilihan}` : null,
      ``,
      `📝 *Keterangan*`,
      form.keluhan ? `Keluhan: ${form.keluhan}` : null,
      form.riwayat ? `Riwayat: ${form.riwayat}` : null,
      form.sumberInfo ? `Tahu dari: ${form.sumberInfo}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines
    )}`;
    window.open(waUrl, "_blank");

    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-[10px] text-[15px] font-jakarta text-slate-800 bg-white transition-all focus:outline-none focus:border-emerald-600 focus:ring-[3px] focus:ring-emerald-600/10 placeholder:text-slate-400";

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-900 from-0% via-emerald-800 via-[300px] to-cream to-[300px] pt-24">
        <Navbar />
        <div className="text-center text-white px-6 pb-16">
          <h1 className="font-amiri text-[40px] mb-3">Formulir Pendaftaran</h1>
        </div>
        <div className="max-w-[680px] mx-auto px-6 pb-20">
          <div className="bg-white rounded-[20px] shadow-2xl p-12 -mt-8 text-center">
            <div className="w-20 h-20 mx-auto mb-5 bg-emerald-50 rounded-full flex items-center justify-center text-[40px]">
              ✅
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-3">
              Pendaftaran Berhasil Dikirim!
            </h3>
            <p className="text-[15px] text-slate-500 leading-relaxed mb-6">
              Alhamdulillah, data Anda telah tersimpan dan dikirim melalui
              WhatsApp. Tim kami akan segera menghubungi Anda untuk konfirmasi
              jadwal dan konsultasi awal. JazakAllahu khairan.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-700 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all no-underline"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 from-0% via-emerald-800 via-[300px] to-cream to-[300px] pt-24">
      <Navbar />

      {/* Header */}
      <div className="text-center text-white px-6 pb-16 relative z-10">
        <h1 className="font-amiri text-[40px] mb-3">Formulir Pendaftaran</h1>
        <p className="text-base text-white/70 max-w-[500px] mx-auto">
          Isi formulir di bawah ini untuk mendaftar konsultasi atau layanan.
          Gratis, tanpa komitmen.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-[680px] mx-auto px-6 pb-20 relative z-10">
        <div className="bg-white rounded-[20px] shadow-2xl p-8 md:p-12 -mt-8">
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {/* ── Data Diri ── */}
          <div className="flex items-center gap-2 text-base font-bold text-emerald-800 mb-5 pb-2.5 border-b-2 border-emerald-100">
            👤 Data Diri
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              className={inputClass}
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                No. WhatsApp / Telepon <span className="text-red-500">*</span>
              </label>
              <input
                className={inputClass}
                name="telepon"
                value={form.telepon}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Email
              </label>
              <input
                className={inputClass}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@contoh.com"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Alamat Lengkap
            </label>
            <input
              className={inputClass}
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Kota / Kabupaten
            </label>
            <select
              className={inputClass}
              name="kota"
              value={form.kota}
              onChange={handleChange}
            >
              <option value="">— Pilih Kota —</option>
              {KOTA_LIST.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </div>

          {/* ── Detail Layanan ── */}
          <div className="flex items-center gap-2 text-base font-bold text-emerald-800 mb-5 pb-2.5 border-b-2 border-emerald-100 mt-9">
            📋 Detail Layanan
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Jenis Layanan <span className="text-red-500">*</span>
            </label>
            <select
              className={inputClass}
              name="jenisLayanan"
              value={form.jenisLayanan}
              onChange={handleChange}
            >
              <option value="">— Pilih Layanan —</option>
              {LAYANAN_LIST.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Kategori
              </label>
              <select
                className={inputClass}
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
              >
                <option value="">— Pilih —</option>
                <option>Residensial (Rumah / Keluarga)</option>
                <option>Korporat (Kantor / Pabrik)</option>
                <option>Khusus (Intensif / Darurat)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Jumlah Orang (jika ruqyah)
              </label>
              <select
                className={inputClass}
                name="jumlahOrang"
                value={form.jumlahOrang}
                onChange={handleChange}
              >
                <option value="">— Pilih —</option>
                <option>1 orang</option>
                <option>2 orang</option>
                <option>3 orang</option>
                <option>4 orang</option>
                <option>5 orang</option>
                <option>Tidak berlaku</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Jadwal yang Diinginkan
              </label>
              <input
                className={inputClass}
                name="jadwalPilihan"
                type="date"
                value={form.jadwalPilihan}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Waktu Pilihan
              </label>
              <select
                className={inputClass}
                name="waktuPilihan"
                value={form.waktuPilihan}
                onChange={handleChange}
              >
                <option value="">— Pilih Waktu —</option>
                <option>Pagi (08:00 - 11:00)</option>
                <option>Siang (11:00 - 14:00)</option>
                <option>Sore (14:00 - 17:00)</option>
                <option>Malam (19:00 - 21:00)</option>
                <option>Fleksibel</option>
              </select>
            </div>
          </div>

          {/* ── Keterangan Tambahan ── */}
          <div className="flex items-center gap-2 text-base font-bold text-emerald-800 mb-5 pb-2.5 border-b-2 border-emerald-100 mt-9">
            📝 Keterangan Tambahan
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Keluhan / Kondisi yang Dialami
            </label>
            <textarea
              className={`${inputClass} resize-y min-h-[100px]`}
              name="keluhan"
              value={form.keluhan}
              onChange={handleChange}
              placeholder="Ceritakan secara singkat apa yang Anda alami atau rasakan..."
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Riwayat Penanganan Sebelumnya
            </label>
            <textarea
              className={`${inputClass} resize-y min-h-[70px]`}
              name="riwayat"
              value={form.riwayat}
              onChange={handleChange}
              placeholder="Apakah pernah berobat ke dokter / ruqyah sebelumnya? (opsional)"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Tahu RuqyahSyari.com dari Mana?
            </label>
            <select
              className={inputClass}
              name="sumberInfo"
              value={form.sumberInfo}
              onChange={handleChange}
            >
              <option value="">— Pilih —</option>
              <option>Rekomendasi Teman / Keluarga</option>
              <option>Google / Mesin Pencari</option>
              <option>Media Sosial (Instagram, Facebook, TikTok)</option>
              <option>Komunitas / Pengajian</option>
              <option>Lainnya</option>
            </select>
          </div>

          {/* Privacy Consent */}
          <label className="flex items-start gap-3 mt-6 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => { setConsent(e.target.checked); setError(""); }}
              className="mt-1 w-4 h-4 accent-emerald-600 cursor-pointer shrink-0"
            />
            <span className="text-[13px] text-slate-500 leading-relaxed">
              Saya menyetujui{" "}
              <a
                href="/kebijakan-privasi"
                target="_blank"
                className="text-emerald-700 underline"
              >
                Kebijakan Privasi
              </a>{" "}
              dan memahami bahwa data saya akan digunakan untuk keperluan layanan
              ruqyah syar&apos;iyyah sesuai syariat Islam.
            </span>
          </label>

          {/* Submit */}
          <button
            className="w-full py-4 bg-gradient-to-br from-emerald-700 to-emerald-600 text-white border-none rounded-xl text-base font-bold font-jakarta cursor-pointer mt-5 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
            onClick={handleSubmit}
            disabled={
              submitting ||
              !form.nama ||
              !form.telepon ||
              !form.jenisLayanan ||
              !consent
            }
          >
            {submitting ? "Mengirim..." : "Kirim via WhatsApp →"}
          </button>

          <p className="text-center text-[13px] text-slate-400 mt-5 leading-relaxed">
            Data Anda aman, terenkripsi, dan hanya digunakan untuk keperluan
            layanan.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
