# EcoClassify Backend

Backend API untuk aplikasi **EcoClassify (Smart Waste Scanner)** yang digunakan untuk autentikasi pengguna, klasifikasi sampah menggunakan Machine Learning, manajemen profil, dan penyimpanan riwayat klasifikasi.

## Teknologi yang Digunakan

* Node.js
* Express.js
* PostgreSQL / NeonDB
* JWT Authentication
* Multer
* Nodemailer
* TensorFlow.js

## Struktur Environment

Buat file `.env` berdasarkan `.env.example`.

Contoh:

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=eco_classify
DB_PASSWORD=password
DB_PORT=5432

JWT_SECRET=your_jwt_secret

DATABASE_URL=postgresql://user:password@host/database

AI_API_URL=https://your-ml-api-url

CLIENT_URL=http://localhost:5173

RESEND_API_KEY=your_resend_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


## Instalasi

1. Clone repository

```bash
git clone <repository-url>
```

2. Masuk ke folder backend

```bash
cd backend
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

Mode production:

```bash
npm start
```

Server akan berjalan pada:

```text
http://localhost:8080
```

## Endpoint Utama

### Authentication

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/verify-otp
* POST /api/auth/resend-otp
* POST /api/auth/forgot-password
* POST /api/auth/reset-password

### Profile

* GET /api/profile
* PUT /api/profile
* PUT /api/profile/photo
* DELETE /api/profile/photo
* PUT /api/profile/password
* DELETE /api/profile

### Classification

* POST /api/classify

### History

* GET /api/histories

## Model Machine Learning

Model TensorFlow digunakan untuk mengklasifikasikan gambar sampah menjadi beberapa kategori:

* Plastik
* Kardus
* Kertas
* Logam
* Kaca
* Residu

## Deployment

Backend dideploy menggunakan Railway.

## Tim Pengembang

Capstone Project DBS Foundation Coding Camp 2026.
