// Types for document generation
export type DokumenData = {
  // From pendaftaran record
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
  status: string;
  created_at: string;

  // Editable fields for document generation
  nomorDokumen: string;
  namaPerusahaan: string;
  jabatanPerwakilan: string;
  alamatPerusahaan: string;
  jenisAset: string;
  luasArea: string;
  lokasiAset: string;
  titikFokus: string;
  jumlahPraktisi: string;
  tanggalPelaksanaan: string;
  jamMulai: string;
  followUpHari: string;

  // Keuangan
  hargaJasa: number;
  hargaEdukasi: number;
  biayaTransport: number;
  ppnPersen: number;

  // Info perusahaan sendiri (RuqyahSyari)
  namaWakil: string;
  alamatKantor: string;
  npwp: string;
  namaBank: string;
  cabangBank: string;
  nomorRekening: string;
  atasNama: string;

  // Laporan
  temuanArea: string;
  indikasiMasalah: string;
  temuanFisik: string;
  tindakanDilakukan: string;
  fieldSupervisor: string;
};

export const DEFAULT_COMPANY_INFO = {
  namaWakil: "",
  alamatKantor: "Yogyakarta, DI Yogyakarta",
  npwp: "",
  namaBank: "",
  cabangBank: "",
  nomorRekening: "",
  atasNama: "",
};

export function formatRupiah(n: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatTanggal(d: string): string {
  if (!d) return "[Tanggal]";
  return new Date(d).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function terbilang(n: number): string {
  if (n === 0) return "nol";
  const satuan = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas",
  ];

  function convert(num: number): string {
    if (num < 12) return satuan[num];
    if (num < 20) return satuan[num - 10] + " belas";
    if (num < 100)
      return satuan[Math.floor(num / 10)] + " puluh" + (num % 10 ? " " + satuan[num % 10] : "");
    if (num < 200) return "seratus" + (num - 100 ? " " + convert(num - 100) : "");
    if (num < 1000)
      return satuan[Math.floor(num / 100)] + " ratus" + (num % 100 ? " " + convert(num % 100) : "");
    if (num < 2000) return "seribu" + (num - 1000 ? " " + convert(num - 1000) : "");
    if (num < 1_000_000)
      return convert(Math.floor(num / 1000)) + " ribu" + (num % 1000 ? " " + convert(num % 1000) : "");
    if (num < 1_000_000_000)
      return (
        convert(Math.floor(num / 1_000_000)) +
        " juta" +
        (num % 1_000_000 ? " " + convert(num % 1_000_000) : "")
      );
    return (
      convert(Math.floor(num / 1_000_000_000)) +
      " miliar" +
      (num % 1_000_000_000 ? " " + convert(num % 1_000_000_000) : "")
    );
  }

  return convert(n) + " rupiah";
}

export function generateNomor(prefix: string, id: string): string {
  const now = new Date();
  const bulan = String(now.getMonth() + 1).padStart(2, "0");
  const tahun = now.getFullYear();
  const urut = id.slice(0, 4).toUpperCase();
  return `${prefix}/${tahun}/${bulan}/${urut}`;
}
