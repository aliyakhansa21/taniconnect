# TaniConnect - Frontend

Aplikasi frontend untuk platform TaniConnect yang menghubungkan Petani dengan Restoran.

Dibangun dengan [Next.js](https://nextjs.org) dan menggunakan [Supabase](https://supabase.com) untuk authentication dan database.

## 🚀 Memulai

### Install Dependencies

```bash
npm install
```

### Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat aplikasi.

## 📁 Struktur Folder

```
fe/
├── public/                 # File statis (gambar, icon, dll)
├── src/
│   ├── app/               # App Router (halaman dan layout)
│   │   ├── layout.tsx     # Layout utama aplikasi
│   │   ├── page.tsx       # Halaman beranda/home
│   │   ├── globals.css    # Global stylesheet
│   │   ├── api/           # API routes
│   │   ├── auth/          # Pages untuk autentikasi
│   │   │   ├── login/     # Halaman login
│   │   │   └── register/  # Halaman registrasi
│   │   ├── components/    # React components yang reusable
│   │   │   ├── CTASection.tsx        # Call-to-Action section
│   │   │   ├── Footer.tsx            # Footer component
│   │   │   ├── HeroSection.tsx       # Hero/banner section
│   │   │   ├── HowItWorksSection.tsx # Penjelasan cara kerja
│   │   │   ├── Navbar.tsx            # Navigation bar
│   │   │   ├── ProblemSection.tsx    # Penjelasan masalah
│   │   │   └── SolutionSection.tsx   # Penjelasan solusi
│   │   ├── dashboard/     # Dashboard pages (protected routes)
│   │   │   ├── petani/    # Dashboard untuk petani
│   │   │   └── restoran/  # Dashboard untuk restoran
│   │   └── test-map/      # Testing page untuk map feature
│   └── lib/               # Library utilities
│       └── supabase/      # Supabase integration
│           ├── client.ts  # Supabase client (untuk client-side)
│           └── server.ts  # Supabase server (untuk server-side)
├── eslint.config.mjs      # ESLint configuration
├── middleware.ts          # Next.js middleware
├── next.config.ts         # Next.js configuration
├── postcss.config.mjs     # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 📂 Penjelasan Detail Folder

### `public/`
Menyimpan file statis yang bisa diakses langsung dari root URL. Gunakan untuk:
- Logo dan gambar aplikasi
- Icon dan favicon
- Asset statis lainnya

### `src/app/`
Folder utama Next.js App Router. Setiap file `.tsx` di sini adalah rute URL:
- `page.tsx` = halaman default folder tersebut
- Folder = path URL
- `layout.tsx` = layout untuk folder dan sub-folder

### `src/app/auth/`
Menangani authentication:
- `login/page.tsx` - Halaman login pengguna
- `register/page.tsx` - Halaman registrasi pengguna

### `src/app/components/`
Komponen React yang reusable untuk halaman beranda:
- **Navbar** - Menu navigasi atas
- **HeroSection** - Banner utama dengan judul besar
- **ProblemSection** - Menjelaskan masalah yang dipecahkan
- **SolutionSection** - Menjelaskan solusi yang diberikan
- **HowItWorksSection** - Penjelasan cara kerja platform
- **CTASection** - Call-to-Action (ajakan action)
- **Footer** - Footer website

### `src/app/dashboard/`
Protected routes untuk dashboard pengguna:
- `petani/page.tsx` - Dashboard khusus petani (melihat pesanan, profil, dll)
- `restoran/page.tsx` - Dashboard khusus restoran (melihat produk, pesanan, dll)

### `src/app/test-map/`
Halaman testing untuk fitur peta (mapping petani/restoran)

### `src/lib/supabase/`
Integrasi dengan Supabase:
- `client.ts` - Client-side Supabase (untuk fetch data di komponen)
- `server.ts` - Server-side Supabase (untuk fetch data di server actions)

## 🔧 Konfigurasi

### `tsconfig.json`
Konfigurasi TypeScript untuk project

### `eslint.config.mjs`
Aturan linting untuk code quality

### `next.config.ts`
Konfigurasi Next.js (image optimization, dll)

### `middleware.ts`
Next.js middleware untuk auth checks, redirects, dll

### `postcss.config.mjs`
Konfigurasi PostCSS (untuk Tailwind CSS, dll)

## 📚 Teknologi yang Digunakan

- **Next.js 14+** - React framework dengan App Router
- **TypeScript** - Type safety
- **Supabase** - Backend-as-a-Service untuk auth & database
- **TailwindCSS** - Utility-first CSS framework (kemungkinan)
- **ESLint** - Code linting

## 🔑 Environment Variables

Buat file `.env.local` di root folder `fe/` dan tambahkan:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Tips Pengembangan

1. **Struktur Folder App Router**: Folder = route, `page.tsx` = halaman
2. **Protected Routes**: Gunakan middleware untuk proteksi dashboard
3. **Server Components**: Gunakan default (server) untuk fetch data
4. **Client Components**: Tambahkan `'use client'` di atas file jika perlu interaksi client
5. **Supabase**: Gunakan `client.ts` untuk client-side, `server.ts` untuk server-side

## 📖 Dokumentasi Lebih Lanjut

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
