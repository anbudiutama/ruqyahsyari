import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { rateLimit } from "@/lib/rate-limit";

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^(\+?62|0)8\d{7,12}$/.test(cleaned);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(val: unknown): string | null {
  if (!val || typeof val !== "string") return null;
  return val.replace(/<[^>]*>/g, "").trim().slice(0, 1000) || null;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const { allowed, remaining } = rateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan tunggu 1 menit." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();

    const nama = sanitize(body.nama);
    const telepon = sanitize(body.telepon);
    const jenisLayanan = sanitize(body.jenis_layanan);

    if (!nama || !telepon || !jenisLayanan) {
      return NextResponse.json(
        { error: "Nama, telepon, dan jenis layanan wajib diisi." },
        { status: 400 }
      );
    }

    if (!isValidPhone(telepon)) {
      return NextResponse.json(
        { error: "Format nomor telepon tidak valid." },
        { status: 400 }
      );
    }

    const email = sanitize(body.email);
    if (email && !isValidEmail(email)) {
      return NextResponse.json({ error: "Format email tidak valid." }, { status: 400 });
    }

    const record = {
      nama,
      telepon: telepon.replace(/[\s\-()]/g, ""),
      email,
      alamat: sanitize(body.alamat),
      kota: sanitize(body.kota),
      jenis_layanan: jenisLayanan,
      kategori: sanitize(body.kategori),
      jumlah_orang: sanitize(body.jumlah_orang),
      jadwal_pilihan: body.jadwal_pilihan || null,
      waktu_pilihan: sanitize(body.waktu_pilihan),
      keluhan: sanitize(body.keluhan),
      riwayat: sanitize(body.riwayat),
      sumber_info: sanitize(body.sumber_info),
      status: "baru",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const docRef = await adminDb.collection("pendaftaran").add(record);

    return NextResponse.json(
      { success: true, id: docRef.id, created_at: record.created_at },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
