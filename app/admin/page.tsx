"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type Pendaftaran = {
  id: string;
  created_at: string;
  nama: string;
  telepon: string;
  email: string | null;
  kota: string | null;
  alamat: string | null;
  jenis_layanan: string;
  kategori: string | null;
  jumlah_orang: string | null;
  jadwal_pilihan: string | null;
  waktu_pilihan: string | null;
  keluhan: string | null;
  riwayat: string | null;
  sumber_info: string | null;
  status: string;
};

const STATUS_COLORS: Record<string, string> = {
  baru: "bg-blue-100 text-blue-800 border-blue-200",
  dikonfirmasi: "bg-amber-100 text-amber-800 border-amber-200",
  dijadwalkan: "bg-purple-100 text-purple-800 border-purple-200",
  selesai: "bg-emerald-100 text-emerald-800 border-emerald-200",
  batal: "bg-red-100 text-red-800 border-red-200",
};

const STATUS_ICONS: Record<string, string> = {
  baru: "🔵", dikonfirmasi: "🟡", dijadwalkan: "🟣", selesai: "🟢", batal: "🔴",
};

const STATUS_OPTIONS = ["baru", "dikonfirmasi", "dijadwalkan", "selesai", "batal"];

const WA_TEMPLATES: Record<string, { label: string; msg: (name: string) => string }> = {
  konfirmasi: {
    label: "Konfirmasi Jadwal",
    msg: (n) => `Assalamu'alaikum ${n},\n\nTerima kasih telah mendaftar di RuqyahSyari.com. Kami ingin mengonfirmasi jadwal layanan Anda.\n\nMohon kabari kami waktu yang sesuai untuk Anda. JazakAllahu khairan.`,
  },
  pengingat: {
    label: "Pengingat H-1",
    msg: (n) => `Assalamu'alaikum ${n},\n\nMengingatkan bahwa jadwal ruqyah Anda adalah *besok*. Tim kami akan hadir di lokasi sesuai kesepakatan.\n\nMohon pastikan lokasi sudah siap. JazakAllahu khairan.`,
  },
  selesai: {
    label: "Follow-up Selesai",
    msg: (n) => `Assalamu'alaikum ${n},\n\nAlhamdulillah, layanan ruqyah telah selesai dilaksanakan. Semoga membawa ketenangan dan barokah.\n\nJika ada keluhan atau pertanyaan, jangan ragu menghubungi kami. JazakAllahu khairan.`,
  },
  invoice: {
    label: "Kirim Invoice",
    msg: (n) => `Assalamu'alaikum ${n},\n\nBerikut kami sampaikan invoice untuk layanan yang telah disepakati. Mohon dapat diproses sesuai ketentuan.\n\nJazakAllahu khairan.`,
  },
};

export default function AdminPage() {
  const [allData, setAllData] = useState<Pendaftaran[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("semua");
  const [search, setSearch] = useState("");
  const [loginKey, setLoginKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<Pendaftaran | null>(null);

  const handleLogin = () => {
    if (loginKey.length >= 8) {
      setAuthenticated(true);
      setAdminKey(loginKey);
      sessionStorage.setItem("admin_auth", "1");
      sessionStorage.setItem("admin_key", loginKey);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setAdminKey("");
    sessionStorage.removeItem("admin_auth");
    sessionStorage.removeItem("admin_key");
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "1") {
      setAuthenticated(true);
      setAdminKey(sessionStorage.getItem("admin_key") || "");
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetchData();
  }, [authenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin", { headers: { "x-admin-key": adminKey } });
      if (res.ok) setAllData(await res.json());
    } catch (e) { console.error("Fetch error:", e); }
    setLoading(false);
  }

  async function updateStatus(id: string, newStatus: string) {
    await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ id, status: newStatus }),
    });
    setAllData((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    if (detailData?.id === id) setDetailData((d) => d ? { ...d, status: newStatus } : null);
  }

  function fetchDetail(id: string) {
    setSelectedId(id);
    const found = allData.find((r) => r.id === id) || null;
    setDetailData(found);
  }

  const filteredData = useMemo(() => {
    let d = allData;
    if (filter !== "semua") d = d.filter((r) => r.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter((r) => r.nama.toLowerCase().includes(q) || r.telepon.includes(q) || r.kota?.toLowerCase().includes(q) || r.jenis_layanan.toLowerCase().includes(q));
    }
    return d;
  }, [allData, filter, search]);

  const stats = useMemo(() => {
    const s: Record<string, number> = { total: allData.length, baru: 0, dikonfirmasi: 0, dijadwalkan: 0, selesai: 0, batal: 0, bulanIni: 0 };
    const thisMonth = new Date().toISOString().slice(0, 7);
    for (const r of allData) {
      if (r.status in s) s[r.status]++;
      if (r.created_at.startsWith(thisMonth)) s.bulanIni++;
    }
    return s;
  }, [allData]);

  function exportCSV() {
    const headers = ["Tanggal", "Nama", "Telepon", "Kota", "Layanan", "Kategori", "Status"];
    const rows = filteredData.map((r) => [new Date(r.created_at).toLocaleDateString("id-ID"), r.nama, r.telepon, r.kota || "", r.jenis_layanan, r.kategori || "", r.status]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `pendaftaran-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  function openWA(phone: string, message: string) {
    const cleaned = phone.replace(/^0/, "62").replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`, "_blank");
  }

  if (!authenticated) {
    return (
      <><Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-charcoal flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-sm w-full text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="font-amiri text-2xl text-emerald-900 mb-2">Admin Panel</h1>
          <p className="text-sm text-slate-500 mb-6">Masukkan kunci admin untuk melanjutkan.</p>
          <input type="password" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-xl text-base mb-4 focus:outline-none focus:border-emerald-600 focus:ring-[3px] focus:ring-emerald-600/10" placeholder="Admin Key" value={loginKey} onChange={(e) => setLoginKey(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
          <button onClick={handleLogin} className="w-full py-3 bg-gradient-to-br from-emerald-700 to-emerald-600 text-white rounded-xl font-bold hover:-translate-y-0.5 hover:shadow-xl transition-all">Masuk</button>
        </div>
      </div></>
    );
  }

  return (
    <><Navbar />
    <div className="min-h-screen bg-cream pt-24 px-4 md:px-6 pb-12">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-amiri text-3xl text-emerald-900">Dashboard Admin</h1>
            <p className="text-sm text-slate-500 mt-1">RuqyahSyari.com — Kelola pendaftaran & operasional</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={fetchData} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">🔄 Refresh</button>
            <button onClick={exportCSV} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">📥 Export CSV</button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-all">🚪 Logout</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {[
            { label: "Total", value: stats.total, color: "bg-slate-50 border-slate-200" },
            { label: "Bulan Ini", value: stats.bulanIni, color: "bg-indigo-50 border-indigo-200" },
            { label: "Baru", value: stats.baru, color: "bg-blue-50 border-blue-200" },
            { label: "Dikonfirmasi", value: stats.dikonfirmasi, color: "bg-amber-50 border-amber-200" },
            { label: "Dijadwalkan", value: stats.dijadwalkan, color: "bg-purple-50 border-purple-200" },
            { label: "Selesai", value: stats.selesai, color: "bg-emerald-50 border-emerald-200" },
            { label: "Batal", value: stats.batal, color: "bg-red-50 border-red-200" },
          ].map((s) => (
            <div key={s.label} className={`${s.color} border rounded-xl px-4 py-3 text-center`}>
              <p className="text-2xl font-bold text-slate-800">{s.value}</p>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex gap-2 flex-wrap flex-1">
            {["semua", ...STATUS_OPTIONS].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${filter === s ? "bg-emerald-700 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                {s === "semua" ? "Semua" : `${STATUS_ICONS[s] || ""} ${s.charAt(0).toUpperCase() + s.slice(1)}`}
              </button>
            ))}
          </div>
          <div className="relative">
            <input type="text" placeholder="Cari nama, telepon, kota..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full md:w-[280px] px-4 py-2 pl-9 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 bg-white" />
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-4">
          {/* Table */}
          <div className={`${selectedId ? "flex-1 min-w-0" : "w-full"} transition-all`}>
            {loading ? (
              <div className="text-center py-20 text-slate-400">Memuat data...</div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg mb-2">{search ? "Tidak ada hasil pencarian." : "Belum ada data."}</p>
                {search && <button onClick={() => setSearch("")} className="text-emerald-700 text-sm underline">Reset</button>}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-black/[.06] overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      {["Tanggal", "Nama", "Telepon", "Kota", "Layanan", "Status", "Aksi"].map((h, i) => (
                        <th key={h} className={`text-left px-4 py-3 font-semibold text-slate-400 text-xs uppercase tracking-wider ${i >= 2 && i <= 4 ? "hidden lg:table-cell" : ""}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row) => (
                      <tr key={row.id} className={`border-b border-slate-50 hover:bg-emerald-50/30 cursor-pointer transition-colors ${selectedId === row.id ? "bg-emerald-50/50" : ""}`} onClick={() => fetchDetail(row.id)}>
                        <td className="px-4 py-3 text-slate-400 whitespace-nowrap text-xs">{new Date(row.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{row.nama}</td>
                        <td className="px-4 py-3 text-slate-500 hidden lg:table-cell"><a href={`https://wa.me/${row.telepon.replace(/^0/, "62")}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline" onClick={(e) => e.stopPropagation()}>{row.telepon}</a></td>
                        <td className="px-4 py-3 text-slate-400 text-xs hidden lg:table-cell">{row.kota || "—"}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell max-w-[160px] truncate">{row.jenis_layanan}</td>
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <select value={row.status} onChange={(e) => updateStatus(row.id, e.target.value)} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border cursor-pointer ${STATUS_COLORS[row.status] || ""}`}>
                            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <Link href={`/admin/dokumen?id=${row.id}`} className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors no-underline">📄 Dok</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-3 text-xs text-slate-400 text-right">{filteredData.length} dari {allData.length} data</div>
          </div>

          {/* Detail Side Panel */}
          {selectedId && (
            <div className="hidden lg:block w-[380px] shrink-0">
              <div className="bg-white rounded-2xl border border-black/[.06] shadow-sm sticky top-24 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-5 py-4 flex items-center justify-between">
                  <h3 className="text-white font-bold text-sm">Detail Klien</h3>
                  <button onClick={() => { setSelectedId(null); setDetailData(null); }} className="text-white/70 hover:text-white text-lg">✕</button>
                </div>
                {detailData ? (
                  <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                    <div>
                      <h4 className="font-bold text-lg text-emerald-900">{detailData.nama}</h4>
                      <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full mt-1 ${STATUS_COLORS[detailData.status]}`}>{detailData.status.charAt(0).toUpperCase() + detailData.status.slice(1)}</span>
                    </div>

                    <DSection title="Kontak">
                      <DRow label="Telepon" value={detailData.telepon} />
                      <DRow label="Email" value={detailData.email || "—"} />
                      <DRow label="Alamat" value={detailData.alamat || "—"} />
                      <DRow label="Kota" value={detailData.kota || "—"} />
                    </DSection>

                    <DSection title="Layanan">
                      <DRow label="Jenis" value={detailData.jenis_layanan} />
                      <DRow label="Kategori" value={detailData.kategori || "—"} />
                      <DRow label="Jumlah" value={detailData.jumlah_orang || "—"} />
                      <DRow label="Jadwal" value={detailData.jadwal_pilihan ? new Date(detailData.jadwal_pilihan).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "long", year: "numeric" }) : "—"} />
                      <DRow label="Waktu" value={detailData.waktu_pilihan || "—"} />
                    </DSection>

                    {(detailData.keluhan || detailData.riwayat) && (
                      <DSection title="Keterangan">
                        {detailData.keluhan && <DRow label="Keluhan" value={detailData.keluhan} />}
                        {detailData.riwayat && <DRow label="Riwayat" value={detailData.riwayat} />}
                      </DSection>
                    )}

                    <DSection title="Info">
                      <DRow label="Sumber" value={detailData.sumber_info || "—"} />
                      <DRow label="Daftar" value={new Date(detailData.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })} />
                    </DSection>

                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">WhatsApp Cepat</p>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(WA_TEMPLATES).map(([key, tmpl]) => (
                          <button key={key} onClick={() => openWA(detailData.telepon, tmpl.msg(detailData.nama.split(" ")[0]))} className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-colors text-left">
                            💬 {tmpl.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Link href={`/admin/dokumen?id=${detailData.id}`} className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-br from-emerald-700 to-emerald-600 text-white rounded-xl font-bold text-sm hover:-translate-y-0.5 hover:shadow-xl transition-all no-underline mt-2">
                      📄 Generate Dokumen
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div></>
  );
}

function DSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-slate-100 pt-3">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function DRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-[12px] text-slate-400 w-[72px] shrink-0">{label}</span>
      <span className="text-[12px] text-slate-700 break-words">{value}</span>
    </div>
  );
}
