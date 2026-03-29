"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  formatRupiah,
  formatTanggal,
  terbilang,
  generateNomor,
  DEFAULT_COMPANY_INFO,
} from "@/lib/dokumen-types";
import Navbar from "@/components/Navbar";
import "./print.css";

type ClientData = {
  id: string;
  nama: string;
  telepon: string;
  email: string | null;
  alamat: string | null;
  kota: string | null;
  jenis_layanan: string;
  kategori: string | null;
  jumlah_orang: string | null;
  jadwal_pilihan: string | null;
  waktu_pilihan: string | null;
  keluhan: string | null;
  riwayat: string | null;
  status: string;
  created_at: string;
};

const TABS = [
  { key: "pks", label: "PKS", icon: "📜" },
  { key: "lampiran", label: "Lampiran PKS", icon: "📎" },
  { key: "invoice", label: "Invoice", icon: "💰" },
  { key: "laporan", label: "Laporan", icon: "📋" },
];

function DokumenContent() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("id");

  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pks");
  const printRef = useRef<HTMLDivElement>(null);

  // Editable fields
  const [fields, setFields] = useState({
    namaPerusahaan: "",
    jabatan: "Direktur",
    alamatPerusahaan: "",
    jenisAset: "Kantor",
    luasArea: "",
    lokasiAset: "",
    titikFokus: "Area Utama, Ruang Direksi",
    jumlahPraktisi: "3",
    jamMulai: "08:00",
    followUpHari: "14",

    hargaJasa: 5000000,
    hargaEdukasi: 1000000,
    biayaTransport: 500000,
    ppnPersen: 11,

    ...DEFAULT_COMPANY_INFO,

    temuanArea: "Area gudang belakang yang sering terasa berat/tidak nyaman",
    indikasiMasalah: "Sering terjadi miskomunikasi antar karyawan di area tertentu",
    temuanFisik: "Tidak ditemukan benda/simbol yang tidak sesuai syariat",
    fieldSupervisor: "",
  });

  const updateField = (key: string, value: string | number) =>
    setFields((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    if (!clientId) return;
    (async () => {
      const adminKey = sessionStorage.getItem("admin_key") || "";
      const res = await fetch(`/api/admin?id=${clientId}`, {
        headers: { "x-admin-key": adminKey },
      });
      if (res.ok) {
        const data = await res.json();
        setClient(data);
        setFields((f) => ({
          ...f,
          namaPerusahaan: data.nama,
          alamatPerusahaan: data.alamat || "",
          lokasiAset: data.alamat || "",
          jenisAset: data.kategori?.includes("Korporat") ? "Pabrik/Gudang" : "Kantor/Ruko",
        }));
      }
      setLoading(false);
    })();
  }, [clientId]);

  const handlePrint = () => {
    const el = printRef.current;
    if (!el) return;
    el.classList.add("print-target");
    window.print();
    el.classList.remove("print-target");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
        <p className="text-slate-400">Memuat data...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Data klien tidak ditemukan.</p>
          <Link href="/admin" className="text-emerald-700 underline">
            Kembali ke Admin
          </Link>
        </div>
      </div>
    );
  }

  // Computed values
  const nomorPKS = generateNomor("PKS", client.id);
  const nomorINV = generateNomor("INV", client.id);
  const nomorREP = generateNomor("REP", client.id);
  const subtotal = fields.hargaJasa + fields.hargaEdukasi + fields.biayaTransport;
  const ppn = Math.round(subtotal * fields.ppnPersen / 100);
  const grandTotal = subtotal + ppn;
  const tanggalSekarang = formatTanggal(new Date().toISOString());
  const tanggalPelaksanaan = client.jadwal_pilihan
    ? formatTanggal(client.jadwal_pilihan)
    : "[Tanggal Pelaksanaan]";

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-[1300px] mx-auto">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 no-print">
          <div>
            <Link href="/admin" className="text-sm text-emerald-700 hover:underline no-underline mb-1 block">
              ← Kembali ke Admin
            </Link>
            <h1 className="font-amiri text-2xl text-emerald-900">
              Dokumen: {client.nama}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {client.jenis_layanan} · {client.kota || "–"} · Daftar {new Date(client.created_at).toLocaleDateString("id-ID")}
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-700 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            🖨️ Cetak / Simpan PDF
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ─── Sidebar: Input Fields ─── */}
          <div className="w-full lg:w-[340px] shrink-0 no-print">
            <div className="bg-white rounded-2xl border border-black/[.06] p-6 sticky top-24">
              <h3 className="font-bold text-emerald-900 text-sm mb-4 pb-2 border-b border-emerald-100">
                ⚙️ Data Dokumen
              </h3>

              <div className="space-y-3 text-sm max-h-[70vh] overflow-y-auto pr-1">
                <FieldGroup label="Info Klien">
                  <Input label="Nama Perusahaan" value={fields.namaPerusahaan} onChange={(v) => updateField("namaPerusahaan", v)} />
                  <Input label="Jabatan Perwakilan" value={fields.jabatan} onChange={(v) => updateField("jabatan", v)} />
                  <Input label="Alamat Perusahaan" value={fields.alamatPerusahaan} onChange={(v) => updateField("alamatPerusahaan", v)} />
                </FieldGroup>

                <FieldGroup label="Detail Aset">
                  <Input label="Jenis Aset" value={fields.jenisAset} onChange={(v) => updateField("jenisAset", v)} />
                  <Input label="Luas Area (m²)" value={fields.luasArea} onChange={(v) => updateField("luasArea", v)} />
                  <Input label="Lokasi Aset" value={fields.lokasiAset} onChange={(v) => updateField("lokasiAset", v)} />
                  <Input label="Titik Fokus" value={fields.titikFokus} onChange={(v) => updateField("titikFokus", v)} />
                </FieldGroup>

                <FieldGroup label="Operasional">
                  <Input label="Jumlah Praktisi" value={fields.jumlahPraktisi} onChange={(v) => updateField("jumlahPraktisi", v)} />
                  <Input label="Jam Mulai (WIB)" value={fields.jamMulai} onChange={(v) => updateField("jamMulai", v)} />
                  <Input label="Follow-up (hari)" value={fields.followUpHari} onChange={(v) => updateField("followUpHari", v)} />
                </FieldGroup>

                <FieldGroup label="Keuangan">
                  <NumInput label="Harga Jasa Utama" value={fields.hargaJasa} onChange={(v) => updateField("hargaJasa", v)} />
                  <NumInput label="Edukasi Karyawan" value={fields.hargaEdukasi} onChange={(v) => updateField("hargaEdukasi", v)} />
                  <NumInput label="Transport & Operasional" value={fields.biayaTransport} onChange={(v) => updateField("biayaTransport", v)} />
                  <NumInput label="PPN (%)" value={fields.ppnPersen} onChange={(v) => updateField("ppnPersen", v)} />
                  <div className="bg-emerald-50 p-3 rounded-lg mt-2">
                    <div className="flex justify-between text-xs"><span>Subtotal</span><span>{formatRupiah(subtotal)}</span></div>
                    <div className="flex justify-between text-xs"><span>PPN {fields.ppnPersen}%</span><span>{formatRupiah(ppn)}</span></div>
                    <div className="flex justify-between font-bold text-sm mt-1 pt-1 border-t border-emerald-200">
                      <span>Total</span><span>{formatRupiah(grandTotal)}</span>
                    </div>
                  </div>
                </FieldGroup>

                <FieldGroup label="Info RuqyahSyari.com">
                  <Input label="Nama Wakil" value={fields.namaWakil} onChange={(v) => updateField("namaWakil", v)} />
                  <Input label="Alamat Kantor" value={fields.alamatKantor} onChange={(v) => updateField("alamatKantor", v)} />
                  <Input label="NPWP" value={fields.npwp} onChange={(v) => updateField("npwp", v)} />
                  <Input label="Nama Bank" value={fields.namaBank} onChange={(v) => updateField("namaBank", v)} />
                  <Input label="Cabang" value={fields.cabangBank} onChange={(v) => updateField("cabangBank", v)} />
                  <Input label="No. Rekening" value={fields.nomorRekening} onChange={(v) => updateField("nomorRekening", v)} />
                  <Input label="Atas Nama" value={fields.atasNama} onChange={(v) => updateField("atasNama", v)} />
                </FieldGroup>

                <FieldGroup label="Laporan">
                  <Input label="Field Supervisor" value={fields.fieldSupervisor} onChange={(v) => updateField("fieldSupervisor", v)} />
                  <TextArea label="Temuan Area" value={fields.temuanArea} onChange={(v) => updateField("temuanArea", v)} />
                  <TextArea label="Indikasi Masalah" value={fields.indikasiMasalah} onChange={(v) => updateField("indikasiMasalah", v)} />
                  <TextArea label="Temuan Fisik" value={fields.temuanFisik} onChange={(v) => updateField("temuanFisik", v)} />
                </FieldGroup>
              </div>
            </div>
          </div>

          {/* ─── Main: Document Preview ─── */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex gap-2 mb-4 no-print flex-wrap">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    tab === t.key
                      ? "bg-emerald-700 text-white shadow-md"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            {/* Document render */}
            <div ref={printRef}>
              {tab === "pks" && (
                <div className="doc-page">
                  <h1>PERJANJIAN KERJASAMA<br />JASA LAYANAN SPIRITUAL PROFESIONAL</h1>
                  <p className="doc-number">Nomor: {nomorPKS}</p>

                  <p>
                    Pada hari ini, {tanggalSekarang}, yang bertanda tangan di bawah ini:
                  </p>

                  <table className="no-border">
                    <tbody>
                      <tr>
                        <td style={{width:20}}>1.</td>
                        <td>
                          <strong>{fields.namaWakil || "[Nama Wakil]"}</strong>, bertindak untuk dan atas nama <strong>RuqyahSyari.com</strong>, berkedudukan di {fields.alamatKantor || "[Alamat Kantor]"}, selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.
                        </td>
                      </tr>
                      <tr><td colSpan={2} style={{height:8}}></td></tr>
                      <tr>
                        <td>2.</td>
                        <td>
                          <strong>{client.nama}</strong>, bertindak selaku {fields.jabatan} untuk dan atas nama <strong>{fields.namaPerusahaan}</strong>, berkedudukan di {fields.alamatPerusahaan || client.alamat || "[Alamat Klien]"}, selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p>
                    Para Pihak sepakat untuk mengadakan kerjasama jasa pembersihan spiritual (Ruqyah Syar&apos;iyyah) dengan ketentuan sebagai berikut:
                  </p>

                  <h2>PASAL 1: RUANG LINGKUP PEKERJAAN</h2>
                  <p>PIHAK PERTAMA bersedia memberikan jasa profesional kepada PIHAK KEDUA berupa:</p>
                  <ol>
                    <li><strong>Asesmen Spiritual:</strong> Identifikasi gangguan ghaib atau energi negatif di area {fields.jenisAset}.</li>
                    <li><strong>Implementasi Ruqyah Syar&apos;iyyah:</strong> Tindakan netralisir sesuai syariat Islam (tanpa syirik, tanpa khurafat).</li>
                    <li><strong>Edukasi Karyawan:</strong> Memberikan pembekalan singkat mengenai benteng spiritual mandiri di lingkungan kerja.</li>
                    <li><strong>Follow-up:</strong> Pemantauan kondisi pasca-tindakan selama {fields.followUpHari} hari.</li>
                  </ol>

                  <h2>PASAL 2: NILAI PEKERJAAN DAN PEMBAYARAN</h2>
                  <ol>
                    <li>Total nilai investasi jasa ini adalah sebesar <strong>{formatRupiah(grandTotal)}</strong> (Terbilang: <em>{terbilang(grandTotal)}</em>).</li>
                    <li>Harga di atas <strong>sudah termasuk PPN</strong> (sesuai komitmen PIHAK PERTAMA terhadap kepatuhan pajak negara).</li>
                    <li>Pembayaran dilakukan melalui transfer ke rekening resmi perusahaan PIHAK PERTAMA:
                      <ul>
                        <li><strong>Bank:</strong> {fields.namaBank || "[Nama Bank]"}</li>
                        <li><strong>Nomor Rekening:</strong> {fields.nomorRekening || "[Nomor Rekening]"}</li>
                        <li><strong>Atas Nama:</strong> {fields.atasNama || "[Atas Nama]"}</li>
                      </ul>
                    </li>
                    <li>Sistem pembayaran: DP 50% sebelum pengerjaan, dan pelunasan 50% setelah pekerjaan selesai.</li>
                  </ol>

                  <h2>PASAL 3: KOMITMEN ETIKA & PROFESIONALISME</h2>
                  <p>Sesuai dengan Pilar Budaya PIHAK PERTAMA:</p>
                  <ol>
                    <li><strong>Prinsip Kerjasama:</strong> Kedua belah pihak menjunjung tinggi prinsip <strong>BENAR</strong> (sesuai aturan), <strong>KURUP</strong> (sesuai porsi), dan <strong>JANJI</strong> (tepat waktu & komitmen).</li>
                    <li><strong>Anti-Gratifikasi & Risywah:</strong> PIHAK PERTAMA dilarang memberikan, dan PIHAK KEDUA dilarang meminta imbalan tambahan dalam bentuk apa pun (Risywah) di luar nilai kontrak yang disepakati.</li>
                    <li><strong>Kerahasiaan:</strong> PIHAK PERTAMA wajib menjaga kerahasiaan data perusahaan dan privasi internal PIHAK KEDUA yang ditemukan selama proses pengerjaan.</li>
                  </ol>

                  <h2>PASAL 4: JADWAL DAN DURASI</h2>
                  <p>
                    Pekerjaan akan dilaksanakan pada {tanggalPelaksanaan} mulai pukul {fields.jamMulai} WIB hingga selesai, berlokasi di aset milik PIHAK KEDUA di {fields.lokasiAset || "[Alamat Lokasi]"}.
                  </p>

                  <h2>PASAL 5: PENYELESAIAN PERSELISIHAN</h2>
                  <p>
                    Apabila terjadi perbedaan pendapat, Para Pihak sepakat mengedepankan musyawarah mufakat dengan semangat <strong>Rukun, Kompak, dan Kerjasama yang Baik</strong>. Jika tidak tercapai, maka akan diselesaikan sesuai hukum yang berlaku di Indonesia.
                  </p>

                  <div className="signature-row">
                    <div className="signature-box">
                      <p className="bold">PIHAK PERTAMA,</p>
                      <p><em>(RuqyahSyari.com)</em></p>
                      <div className="signature-line"></div>
                      <p className="bold">{fields.namaWakil || "(___________________)"}</p>
                      <p className="stamp-area">[Materai 10.000]</p>
                    </div>
                    <div className="signature-box">
                      <p className="bold">PIHAK KEDUA,</p>
                      <p><em>({fields.namaPerusahaan})</em></p>
                      <div className="signature-line"></div>
                      <p className="bold">{client.nama}</p>
                    </div>
                  </div>
                </div>
              )}

              {tab === "lampiran" && (
                <div className="doc-page">
                  <p className="italic center" style={{marginBottom:16}}>
                    Lampiran ini menjadi bagian tak terpisahkan dari Perjanjian Kerjasama (PKS).
                  </p>

                  <h1>LAMPIRAN I: RUANG LINGKUP & SPESIFIKASI TEKNIS</h1>
                  <p className="doc-number">Nomor Dokumen: {nomorPKS}/Lamp-01/2026</p>

                  <h2>A. Objek Pekerjaan</h2>
                  <table className="no-border">
                    <tbody>
                      <tr><td style={{width:140}}><strong>Jenis Aset:</strong></td><td>{fields.jenisAset}</td></tr>
                      <tr><td><strong>Luas Area:</strong></td><td>± {fields.luasArea || "[Jumlah]"} m²</td></tr>
                      <tr><td><strong>Lokasi:</strong></td><td>{fields.lokasiAset || "[Alamat Lengkap]"}</td></tr>
                      <tr><td><strong>Titik Fokus:</strong></td><td>{fields.titikFokus}</td></tr>
                    </tbody>
                  </table>

                  <h2>B. Metode Pelaksanaan (Sesuai Syariat)</h2>
                  <ul>
                    <li><strong>Tahap Pra-Kondisi:</strong> Pembersihan area dari benda-benda yang dilarang syariat (patung, jimat, dsb).</li>
                    <li><strong>Tahap Inti:</strong> Pembacaan ayat-ayat Ruqyah (Al-Qur&apos;an & Hadits Shahih) secara langsung di lokasi.</li>
                    <li><strong>Tahap Sterilisasi:</strong> Penyemprotan air ruqyah (Sider/Bidara) pada titik-titik yang terindikasi gangguan.</li>
                    <li><strong>Tahap Edukasi:</strong> Memberikan panduan zikir pagi-petang kepada perwakilan karyawan untuk menjaga benteng spiritual perusahaan.</li>
                  </ul>

                  <h2>C. Tenaga Ahli (Team Task Force)</h2>
                  <ul>
                    <li>Jumlah Praktisi: {fields.jumlahPraktisi} Orang.</li>
                    <li>Kualifikasi: Hafal juz amma, memahami fiqih sihir, dan berakhlak mulia.</li>
                  </ul>

                  <h2>D. Peralatan & Media</h2>
                  <ul>
                    <li>Speaker/Sound System (jika diperlukan untuk area luas).</li>
                    <li>Media Ruqyah: Air mineral, daun bidara, dan minyak zaitun (bersertifikat Halal).</li>
                  </ul>
                </div>
              )}

              {tab === "invoice" && (
                <div className="doc-page">
                  <div className="header-logo">
                    <p className="brand">☪ RUQYAHSYARI.COM</p>
                    <p className="tagline">Jasa Solusi Spiritual Profesional</p>
                    <p style={{fontSize:"10pt",color:"#777",marginTop:4}}>
                      {fields.alamatKantor} | NPWP: {fields.npwp || "[NPWP]"} | WA: {client.telepon}
                    </p>
                  </div>

                  <h1 style={{fontSize:"20pt",letterSpacing:2}}>INVOICE</h1>
                  <p className="doc-number">Nomor: {nomorINV}</p>

                  <table className="no-border" style={{marginBottom:16}}>
                    <tbody>
                      <tr><td style={{width:120}}><strong>Tanggal:</strong></td><td>{tanggalSekarang}</td></tr>
                      <tr><td><strong>Ditujukan:</strong></td><td><strong>{fields.namaPerusahaan}</strong></td></tr>
                      <tr><td></td><td>{fields.alamatPerusahaan || "[Alamat Klien]"}</td></tr>
                      <tr><td></td><td>Attn: Bagian Keuangan / HRD</td></tr>
                    </tbody>
                  </table>

                  <table>
                    <thead>
                      <tr>
                        <th>Deskripsi Layanan</th>
                        <th style={{width:70,textAlign:"center"}}>Qty</th>
                        <th style={{width:120,textAlign:"right"}}>Harga Satuan</th>
                        <th style={{width:120,textAlign:"right"}}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jasa Netralisir & Pembersihan {fields.jenisAset} (Area {fields.luasArea || "—"} m²)</td>
                        <td style={{textAlign:"center"}}>1 Paket</td>
                        <td style={{textAlign:"right"}}>{formatRupiah(fields.hargaJasa)}</td>
                        <td style={{textAlign:"right"}}>{formatRupiah(fields.hargaJasa)}</td>
                      </tr>
                      <tr>
                        <td>Paket Edukasi Spiritual Karyawan (Sesi Kolektif)</td>
                        <td style={{textAlign:"center"}}>1 Sesi</td>
                        <td style={{textAlign:"right"}}>{formatRupiah(fields.hargaEdukasi)}</td>
                        <td style={{textAlign:"right"}}>{formatRupiah(fields.hargaEdukasi)}</td>
                      </tr>
                      <tr>
                        <td>Biaya Operasional & Transportasi</td>
                        <td style={{textAlign:"center"}}>—</td>
                        <td style={{textAlign:"right"}}>{formatRupiah(fields.biayaTransport)}</td>
                        <td style={{textAlign:"right"}}>{formatRupiah(fields.biayaTransport)}</td>
                      </tr>
                      <tr className="total-row">
                        <td colSpan={3} style={{textAlign:"right"}}>Subtotal</td>
                        <td style={{textAlign:"right"}}>{formatRupiah(subtotal)}</td>
                      </tr>
                      <tr className="total-row">
                        <td colSpan={3} style={{textAlign:"right"}}>PPN ({fields.ppnPersen}%)</td>
                        <td style={{textAlign:"right"}}>{formatRupiah(ppn)}</td>
                      </tr>
                      <tr className="total-row" style={{fontSize:"13pt"}}>
                        <td colSpan={3} style={{textAlign:"right"}}><strong>TOTAL TAGIHAN</strong></td>
                        <td style={{textAlign:"right"}}><strong>{formatRupiah(grandTotal)}</strong></td>
                      </tr>
                    </tbody>
                  </table>

                  <p style={{marginTop:12}}><strong>Terbilang:</strong> <em># {terbilang(grandTotal)} #</em></p>

                  <h3>Informasi Pembayaran:</h3>
                  <table className="no-border">
                    <tbody>
                      <tr><td style={{width:120}}>Bank:</td><td>{fields.namaBank || "[Nama Bank]"}</td></tr>
                      <tr><td>Cabang:</td><td>{fields.cabangBank || "[Cabang]"}</td></tr>
                      <tr><td>No. Rekening:</td><td>{fields.nomorRekening || "[No. Rekening]"}</td></tr>
                      <tr><td>Atas Nama:</td><td>{fields.atasNama || "[Atas Nama]"}</td></tr>
                    </tbody>
                  </table>

                  <p style={{fontSize:"10pt",color:"#777",marginTop:12}}>
                    <strong>Catatan:</strong><br />
                    • Pembayaran dianggap sah jika sudah masuk ke rekening di atas.<br />
                    • Mohon kirimkan bukti transfer melalui WhatsApp atau Email.
                  </p>

                  <p className="closing-doa">
                    &ldquo;Semoga kerjasama ini membawa keberkahan dan kelancaran bagi usaha Bapak/Ibu. Jazakumullah Khairan.&rdquo;
                  </p>
                </div>
              )}

              {tab === "laporan" && (
                <div className="doc-page">
                  <div className="header-logo">
                    <p className="brand">☪ RUQYAHSYARI.COM</p>
                    <p className="tagline">Jasa Solusi Spiritual Profesional</p>
                  </div>

                  <h1>LAPORAN HASIL PEKERJAAN<br />(FINAL REPORT)</h1>
                  <p className="center italic" style={{marginBottom:16}}>Layanan Netralisir & Pembersihan Spiritual RuqyahSyari.com</p>

                  <table className="no-border" style={{marginBottom:16}}>
                    <tbody>
                      <tr><td style={{width:160}}><strong>Nomor Laporan:</strong></td><td>{nomorREP}</td></tr>
                      <tr><td><strong>Tanggal Pelaksanaan:</strong></td><td>{tanggalPelaksanaan}</td></tr>
                      <tr><td><strong>Lokasi Aset:</strong></td><td>{fields.namaPerusahaan} — {fields.lokasiAset || "[Alamat]"}</td></tr>
                    </tbody>
                  </table>

                  <h2>1. RINGKASAN EKSEKUTIF</h2>
                  <p>
                    Laporan ini disusun sebagai bukti penyelesaian pekerjaan pembersihan spiritual (Ruqyah Syar&apos;iyyah) pada aset PIHAK KEDUA. Pekerjaan dilakukan oleh tim profesional <strong>RuqyahSyari.com</strong> dengan metode yang sepenuhnya bersumber dari Al-Qur&apos;an dan As-Sunnah, bebas dari praktik syirik, dan mengedepankan efektivitas operasional lingkungan kerja.
                  </p>

                  <h2>2. TEMUAN AWAL (ASSESSMENT)</h2>
                  <p>Sebelum melakukan tindakan, tim kami melakukan pemetaan area dan menemukan beberapa poin catatan:</p>
                  <ul>
                    <li><strong>Titik Gangguan:</strong> {fields.temuanArea}</li>
                    <li><strong>Indikasi Masalah:</strong> {fields.indikasiMasalah}</li>
                    <li><strong>Temuan Fisik:</strong> {fields.temuanFisik}</li>
                  </ul>
                  {client.keluhan && (
                    <p style={{fontSize:"10pt",color:"#555"}}><em>Catatan dari klien: {client.keluhan}</em></p>
                  )}

                  <h2>3. TINDAKAN YANG TELAH DILAKUKAN</h2>
                  <p>Sesuai dengan lampiran spesifikasi pada PKS, tim telah melaksanakan:</p>
                  <ol>
                    <li><strong>Pembersihan Lokasi:</strong> Pembacaan Ayat-ayat Ruqyah di seluruh area inti {fields.jenisAset.toLowerCase()}.</li>
                    <li><strong>Netralisir Media:</strong> Pemusnahan benda/simbol yang tidak sesuai syariat (jika ditemukan) dengan cara yang benar.</li>
                    <li><strong>Treatment Area:</strong> Penyemprotan media air Ruqyah dan Sidr (Bidara) pada titik-titik fokus gangguan.</li>
                    <li><strong>Edukasi Kolektif:</strong> Sesi singkat bersama manajemen/karyawan mengenai adab masuk kantor dan doa perlindungan tempat kerja.</li>
                  </ol>

                  <h2>4. HASIL & REKOMENDASI PASCA-TINDAKAN</h2>
                  <p>Untuk menjaga suasana <strong>Barokah</strong> dan produktivitas yang berkelanjutan, kami merekomendasikan:</p>
                  <ul>
                    <li><strong>Harian:</strong> Memutar murottal Al-Qur&apos;an (Surah Al-Baqarah) secara berkala di area kantor/pabrik.</li>
                    <li><strong>Budaya Kerja:</strong> Menerapkan kejujuran dan amanah (sesuai pilar budaya) untuk mencegah &quot;energi negatif&quot; dari perilaku buruk manusia.</li>
                    <li><strong>Pemeliharaan:</strong> Melakukan Self-Ruqyah secara mandiri oleh karyawan dengan zikir pagi dan petang.</li>
                  </ul>

                  <h2>5. DOKUMENTASI KEGIATAN</h2>
                  <p style={{color:"#999",fontStyle:"italic"}}>(Lampirkan foto-foto tim saat melakukan prosesi di lapangan, foto penyerahan edukasi kepada manajemen, atau foto area yang telah dibersihkan).</p>

                  <h2>6. PERNYATAAN PENUTUP</h2>
                  <p>
                    Dengan diserahkannya laporan ini, maka seluruh kewajiban PIHAK PERTAMA dalam Perjanjian Kerjasama Nomor {nomorPKS} dinyatakan telah selesai dilakukan dengan sebaik-baiknya (<strong>BENAR</strong>).
                  </p>
                  <p>
                    Semoga Allah SWT senantiasa melimpahkan keberkahan, kemakmuran, dan perlindungan pada seluruh aset dan keluarga besar <strong>{fields.namaPerusahaan}</strong>.
                  </p>

                  <div style={{marginTop:40,textAlign:"left",maxWidth:"45%"}}>
                    <p className="bold">Hormat Kami,</p>
                    <p><em>(RuqyahSyari.com)</em></p>
                    <div className="signature-line"></div>
                    <p className="bold">{fields.fieldSupervisor || "(___________________)"}</p>
                    <p style={{fontSize:"10pt",color:"#555"}}>Field Supervisor / Team Leader</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────
function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-slate-100 pb-3">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[11px] text-slate-500 mb-0.5">{label}</label>
      <input
        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function NumInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-[11px] text-slate-500 mb-0.5">{label}</label>
      <input
        type="number"
        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[11px] text-slate-500 mb-0.5">{label}</label>
      <textarea
        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm resize-y min-h-[50px] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// ─── Main export with Suspense ──────────────────
export default function DokumenPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-cream pt-24 flex items-center justify-center"><p className="text-slate-400">Memuat...</p></div>}>
        <DokumenContent />
      </Suspense>
    </>
  );
}
