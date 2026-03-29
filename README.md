# RuqyahSyari.com

Layanan Ruqyah Syar'iyyah Profesional — DIY & Sebagian Jawa Tengah.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Database**: Google Firebase (Firestore)
- **Hosting**: Vercel
- **Messaging**: WhatsApp Business (deep link)
- **Analytics**: Google Analytics 4 (optional)

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local — isi Firebase config & Admin key
npm run dev
```

Panduan lengkap setup Firebase ada di file `PANDUAN-FIREBASE.md`.

## Deploy ke Vercel

1. Push ke GitHub
2. vercel.com → Import repo
3. Tambahkan semua Environment Variables dari `.env.local.example`
4. Deploy

## Security

- Semua database access melalui Firebase Admin SDK (server-side)
- Firestore rules memblokir 100% akses langsung dari browser
- Rate limiting 5 req/menit per IP
- Input validation & sanitization
- Admin panel dilindungi ADMIN_SECRET_KEY
