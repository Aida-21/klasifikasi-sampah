# EcoClassify Frontend

Frontend aplikasi **EcoClassify (Smart Waste Scanner)** yang digunakan untuk melakukan klasifikasi sampah berbasis gambar menggunakan Machine Learning.

## Fitur

* Upload gambar sampah
* Klasifikasi sampah otomatis
* Login dan Register
* Verifikasi OTP Email
* Reset Password
* Profil Pengguna
* Upload Foto Profil
* Riwayat Klasifikasi
* Dashboard Statistik

## Teknologi yang Digunakan

* React
* Vite
* React Router DOM
* React Icons

## Struktur Environment

Buat file `.env` berdasarkan `.env.example`.

Contoh:

```env
VITE_API_URL=http://localhost:8080
```

Untuk production:

```env
VITE_API_URL=https://your-backend.up.railway.app
```

## Instalasi

1. Clone repository

```bash
git clone <repository-url>
```

2. Masuk ke folder frontend

```bash
cd frontend
```

3. Install dependency

```bash
npm install
```

4. Buat file `.env`

Salin isi dari `.env.example` lalu sesuaikan nilainya.

## Menjalankan Aplikasi

Mode development:

```bash
npm run dev
```

Aplikasi akan berjalan pada:

```text
http://localhost:5173
```

## Build Production

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Konfigurasi API

Seluruh request API menggunakan environment variable:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

Contoh:

```javascript
fetch(`${API_URL}/api/profile`);
```

## Deployment

Frontend dideploy menggunakan Vercel.

## Fitur Utama

### Smart Waste Scanner

Pengguna dapat:

* Mengunggah gambar sampah
* Menggunakan kamera perangkat
* Mendapatkan hasil klasifikasi otomatis

### Manajemen Akun

* Login
* Register
* OTP Verification
* Forgot Password
* Reset Password
* Edit Profil

### Riwayat Klasifikasi

* Menampilkan seluruh riwayat klasifikasi pengguna
* Filter berdasarkan kategori
* Pencarian riwayat

## Tim Pengembang

Tim Capstone Project : CC26-PSU384

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


