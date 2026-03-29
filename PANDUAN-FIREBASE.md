# PANDUAN SETUP FIREBASE — Untuk Pemula

Panduan ini menjelaskan cara setup Firebase dari nol hingga deploy.
Ikuti step-by-step, jangan lompati.

---

## LANGKAH 1: Buat Project Firebase

1. Buka https://console.firebase.google.com
2. Login dengan akun Google Anda
3. Klik **"Create a project"** (atau "Add project")
4. Isi nama project: `ruqyahsyari`
5. Google Analytics → pilih **Enable** → pilih account → klik **Create Project**
6. Tunggu beberapa detik, lalu klik **Continue**

✅ Project Firebase sudah jadi.

---

## LANGKAH 2: Aktifkan Firestore Database

1. Di sidebar kiri Firebase Console, klik **"Build"** → **"Firestore Database"**
2. Klik **"Create database"**
3. Pilih lokasi server: **asia-southeast2 (Jakarta)** ← paling dekat ke Indonesia
4. Security rules → pilih **"Start in production mode"** → klik **Create**

✅ Database Firestore sudah aktif.

---

## LANGKAH 3: Deploy Security Rules

1. Di Firestore Database, klik tab **"Rules"**
2. Hapus semua isi yang ada
3. Copy-paste isi file `firestore.rules` dari project:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /pendaftaran/{docId} {
      allow read, write: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

4. Klik **"Publish"**

> **Kenapa semua `false`?** Karena website kita mengakses database
> melalui Firebase Admin SDK di server (API routes), yang BYPASS rules ini.
> Jadi data tetap bisa dibaca/ditulis dari server, tapi browser/hacker
> tidak bisa akses langsung.

✅ Security rules sudah terpasang.

---

## LANGKAH 4: Buat Index untuk Query Admin

1. Di Firestore Database, klik tab **"Indexes"**
2. Klik **"Create Index"** (atau "Add index")
3. Isi:
   - Collection ID: `pendaftaran`
   - Field 1: `status` → Ascending
   - Field 2: `created_at` → Descending
   - Query scope: Collection
4. Klik **"Create Index"**
5. Tunggu sampai status berubah dari "Building..." ke ✅

> Index ini diperlukan agar admin panel bisa filter pendaftaran berdasarkan status.

✅ Index sudah dibuat.

---

## LANGKAH 5: Tambahkan Web App & Dapatkan Config

1. Di Firebase Console, klik ikon ⚙️ (gear) di sebelah "Project Overview" → **"Project settings"**
2. Scroll ke bawah ke bagian **"Your apps"**
3. Klik ikon **"</>"** (Web) untuk menambahkan web app
4. Isi nickname: `ruqyahsyari-web`
5. Centang **"Also set up Firebase Hosting"** → **JANGAN** centang (kita pakai Vercel)
6. Klik **"Register app"**
7. Anda akan melihat kode config seperti ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefgh",
  authDomain: "ruqyahsyari.firebaseapp.com",
  projectId: "ruqyahsyari",
  storageBucket: "ruqyahsyari.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

8. **SIMPAN/CATAT semua nilai ini** — kita akan butuhkan nanti
9. Klik **"Continue to console"**

✅ Web app terdaftar.

---

## LANGKAH 6: Download Service Account Key

Ini kunci rahasia untuk server. **JANGAN pernah share atau commit ke GitHub.**

1. Masih di Project settings, klik tab **"Service accounts"** (di atas)
2. Pastikan terpilih "Firebase Admin SDK"
3. Klik tombol **"Generate new private key"**
4. Klik **"Generate key"** di dialog konfirmasi
5. File JSON akan terdownload (contoh nama: `ruqyahsyari-firebase-adminsdk-xxxxx.json`)
6. **Buka file JSON tersebut** dengan text editor (Notepad/VS Code)
7. Isinya seperti ini:

```json
{
  "type": "service_account",
  "project_id": "ruqyahsyari",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@ruqyahsyari.iam.gserviceaccount.com",
  ...
}
```

8. **Copy SELURUH isi file** (Ctrl+A → Ctrl+C)

✅ Service account key sudah didapat.

---

## LANGKAH 7: Setup Environment Variables

### A. Untuk Development (lokal)

1. Buka project di code editor
2. Copy file `.env.local.example` → `.env.local`
3. Isi semua nilai dari Langkah 5 dan 6:

```env
# Dari Langkah 5 (Web app config)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB1234567890abcdefgh
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ruqyahsyari.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ruqyahsyari
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ruqyahsyari.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# Dari Langkah 6 (Service account — paste SELURUH isi JSON dalam SATU BARIS)
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"ruqyahsyari","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk@ruqyahsyari.iam.gserviceaccount.com","client_id":"123","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk"}

# WhatsApp — ganti dengan nomor WA aktif
NEXT_PUBLIC_WHATSAPP_NUMBER=6281326320313

# Admin Panel — buat password minimal 8 karakter
ADMIN_SECRET_KEY=RuqyahAdmin2026!

# Google Analytics (opsional)
NEXT_PUBLIC_GA_ID=
```

> **PENTING tentang FIREBASE_SERVICE_ACCOUNT_KEY:**
> Isi JSON dari Langkah 6 harus dalam **SATU BARIS** (tanpa enter).
> Cara mudah: buka file JSON → Ctrl+H → cari `\n` (newline) → replace dengan kosong.
> Atau gunakan tool online: https://www.textfixer.com/tools/remove-line-breaks.php

### B. Untuk Vercel (production)

1. Buka project di vercel.com → **Settings** → **Environment Variables**
2. Tambahkan SATU PER SATU:

| Key | Value | Catatan |
|-----|-------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSy...` | Dari Langkah 5 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `xxx.firebaseapp.com` | Dari Langkah 5 |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `ruqyahsyari` | Dari Langkah 5 |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `xxx.appspot.com` | Dari Langkah 5 |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `123456789012` | Dari Langkah 5 |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:123456789:web:abc` | Dari Langkah 5 |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | `{"type":"service_account",...}` | Dari Langkah 6, SATU BARIS |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `628xxxxxxxxxx` | Nomor WA aktif |
| `ADMIN_SECRET_KEY` | `RuqyahAdmin2026!` | Password admin |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Opsional |

> **Untuk FIREBASE_SERVICE_ACCOUNT_KEY di Vercel:**
> Vercel mendukung multi-line value. Anda bisa langsung paste isi JSON
> asli (dengan enter) ke field value di Vercel. Vercel akan handle-nya.

✅ Environment variables terpasang.

---

## LANGKAH 8: Test Lokal

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

1. Buka http://localhost:3000 → landing page muncul
2. Buka http://localhost:3000/formulir → isi form → submit
3. Cek Firebase Console → Firestore Database → collection `pendaftaran` → data muncul ✅
4. Buka http://localhost:3000/admin → masukkan Admin Key → data tampil ✅

---

## LANGKAH 9: Push ke GitHub & Deploy

```bash
# Pastikan .env.local TIDAK ikut ke-commit (sudah ada di .gitignore)
git init
git add .
git commit -m "Initial commit: RuqyahSyari.com with Firebase"
gh repo create ruqyahsyari --private --source=. --push
```

Lalu di Vercel:
1. vercel.com → New Project → Import repo `ruqyahsyari`
2. Isi semua Environment Variables (lihat Langkah 7B)
3. Klik Deploy
4. Setelah deploy selesai → Settings → Domains → tambahkan `ruqyahsyari.com`

---

## LANGKAH 10: Setup Domain

Di DNS provider domain `ruqyahsyari.com`:

| Type  | Name | Value               |
|-------|------|---------------------|
| A     | @    | 76.76.21.21         |
| CNAME | www  | cname.vercel-dns.com |

Tunggu 5-30 menit sampai propagasi DNS selesai.

✅ Website live di https://ruqyahsyari.com

---

## TROUBLESHOOTING

### "Firebase: No Firebase App" error
→ Pastikan semua 6 variabel `NEXT_PUBLIC_FIREBASE_*` sudah diisi di `.env.local`

### "Could not parse service account key" error
→ Pastikan `FIREBASE_SERVICE_ACCOUNT_KEY` berisi JSON valid dalam satu baris.
   Coba copy ulang dari file JSON yang didownload.

### Data tidak muncul di admin panel
→ Pastikan `ADMIN_SECRET_KEY` sama di `.env.local` dan yang diinput di login
→ Pastikan Firestore index sudah selesai dibuild (lihat Langkah 4)

### Form submit error 500
→ Cek Vercel logs: vercel.com → project → Deployments → klik deployment → Functions → Logs
→ Biasanya karena `FIREBASE_SERVICE_ACCOUNT_KEY` belum diset atau formatnya salah

### Firestore index "Building..."
→ Tunggu 2-5 menit. Index baru butuh waktu untuk selesai dibangun.

---

## KEAMANAN — JANGAN LUPA

- ❌ JANGAN commit `.env.local` ke GitHub (sudah ada di `.gitignore`)
- ❌ JANGAN share file service account JSON ke siapapun
- ❌ JANGAN taruh `FIREBASE_SERVICE_ACCOUNT_KEY` dengan prefix `NEXT_PUBLIC_`
- ✅ Gunakan Vercel Environment Variables untuk production
- ✅ Buat `ADMIN_SECRET_KEY` yang kuat (minimal 8 karakter, campur huruf+angka+simbol)
