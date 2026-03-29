import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

function isAuthorized(req: NextRequest): boolean {
  const key = req.headers.get("x-admin-key");
  const adminKey = process.env.ADMIN_SECRET_KEY;
  if (!adminKey) return true;
  return key === adminKey;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const id = searchParams.get("id");

  try {
    // Single record by ID
    if (id) {
      const doc = await adminDb.collection("pendaftaran").doc(id).get();
      if (!doc.exists) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ id: doc.id, ...doc.data() });
    }

    // List with optional status filter
    let query: FirebaseFirestore.Query = adminDb
      .collection("pendaftaran")
      .orderBy("created_at", "desc")
      .limit(200);

    if (status && status !== "semua") {
      query = query.where("status", "==", status);
    }

    const snapshot = await query.get();
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(data);
  } catch (err) {
    console.error("Admin GET error:", err);
    return NextResponse.json(
      { error: "Gagal mengambil data." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.id || !body.status) {
      return NextResponse.json(
        { error: "id and status required" },
        { status: 400 }
      );
    }

    await adminDb.collection("pendaftaran").doc(body.id).update({
      status: body.status,
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin PATCH error:", err);
    return NextResponse.json(
      { error: "Gagal update status." },
      { status: 500 }
    );
  }
}
