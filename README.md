# EcoClassify AI 

EcoClassify AI adalah aplikasi berbasis AI yang membantu pengguna mengidentifikasi jenis sampah melalui gambar. Sistem memanfaatkan model Machine Learning berbasis Convolutional Neural Network (CNN) untuk mengklasifikasikan sampah dan memberikan informasi pengelolaan yang sesuai.

## Latar Belakang

Kurangnya pemahaman masyarakat mengenai pemilahan sampah menyebabkan banyak sampah yang seharusnya dapat didaur ulang bercampur dengan sampah lainnya. EcoClassify AI dikembangkan untuk membantu proses identifikasi sampah secara otomatis sehingga pengguna dapat melakukan pemilahan dengan lebih mudah dan tepat.

## Fitur Utama

* Klasifikasi sampah menggunakan gambar
* Upload gambar dari perangkat
* Penggunaan kamera secara langsung
* Autentikasi pengguna (Login & Register)
* Verifikasi OTP melalui email
* Reset password melalui email
* Manajemen profil pengguna
* Upload foto profil
* Riwayat klasifikasi sampah
* Dashboard statistik pengguna

## Kategori Sampah

Model Machine Learning digunakan untuk mengidentifikasi beberapa kategori sampah berikut:

* Kardus
* Kertas
* Logam
* Plastik
* Kaca
* Residu

## Arsitektur Sistem

```text
Frontend (React + Vite)
        │
        ▼
Backend API (Express.js)
        │
        ├── PostgreSQL / NeonDB
        ├── Cloudinary Storage
        ├── Resend Email Service
        └── CNN Model Prediction API
```

## Teknologi yang Digunakan

### Frontend

* React.js
* Vite
* React Router DOM
* React Icons

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* Cloudinary
* Resend

### Database

* PostgreSQL
* Neon Database

### Machine Learning

* TensorFlow
* Keras
* Convolutional Neural Network (CNN)

## Struktur Project

```text
eco-classify-ai/
│
├── backend/
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── README.md
└── .gitignore
```

## Setup Environment

### Backend

Masuk ke folder backend:

```bash
cd backend
```

Install dependency:

```bash
npm install
```

Buat file `.env` berdasarkan `.env.example`.

Jalankan server:

```bash
npm run dev
```

### Frontend

Masuk ke folder frontend:

```bash
cd frontend
```

Install dependency:

```bash
npm install
```

Buat file `.env` berdasarkan `.env.example`.

Jalankan aplikasi:

```bash
npm run dev
```

## Template Environment

### Backend

Lihat file:

```text
backend/.env.example
```

### Frontend

Lihat file:

```text
frontend/.env.example
```

### Tautan Model Machine Learning
Model tersedia di Google Drive: https://drive.google.com/drive/folders/1zX_NJnRITMgaEsmOD-pU_BZ3HLhetauJ?usp=sharing

## Deployment

Frontend:

```text
https://klasifikasi-sampah-sable.vercel.app
```

Backend:

```text
https://klasifikasi-sampah-production-276b.up.railway.app
```

## Tim Pengembang

Tim Capstone Project
