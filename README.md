
# Aplikasi CRUD

Proyek ini adalah aplikasi CRUD (Create, Read, Update, Delete) yang dibangun dengan database PostgreSQL menggunakan Prisma sebagai ORM dan backend Express. Frontend dibuat dengan HTML, CSS, dan JavaScript untuk berinteraksi dengan backend.

## Struktur Proyek

```
.
├── backend
│   ├── prisma
│   │   └── schema.prisma        # Prisma schema untuk model database
│   ├── server.js                # Backend utama dengan Express
│   └── backend.dockerfile       # Dockerfile untuk layanan backend
├── frontend
│   ├── index.html               # File HTML untuk frontend
│   ├── style.css                # File CSS untuk frontend
│   ├── script.js                # File JavaScript untuk frontend
│   └── frontend.dockerfile      # Dockerfile untuk layanan frontend
├── compose.yaml                 # Konfigurasi Docker Compose
└── README.md                    # Dokumentasi proyek (file ini)
```

## Fitur

1. **Model User**:

   - `id`: Primary key yang auto-increment.
   - `name`: Nama pengguna.
   - `email`: Email pengguna.
   - `phoneNum`: Nomor telepon pengguna.
   - `createdAt`: Timestamp saat data dibuat.
   - `updatedAt`: Timestamp saat data terakhir diperbarui.

2. **Frontend**:

   - Menampilkan, menambahkan, mengedit, dan menghapus pengguna (CRUD).
   - Menampilkan `createdAt` dan `updatedAt` untuk setiap pengguna.

3. **Backend**:

   - API untuk operasi CRUD.
   - Menggunakan Prisma untuk interaksi dengan database.

4. **Database**:

   - PostgreSQL sebagai database.

5. **Environment Setup**:

   - Berjalan di Docker untuk lingkungan pengembangan dan deployment yang konsisten.

## Prasyarat

Pastikan Anda memiliki perangkat berikut terpasang di sistem Anda:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Environment Variables

Buat file `.env` di direktori root dengan variabel berikut:

```
DATABASE_URL=postgresql://user:password@db:5432/mydatabase
```

Ganti `user`, `password`, dan `mydatabase` dengan kredensial yang Anda pilih.

## Instruksi Menjalankan di Docker

1. **Klon Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Atur Variabel Lingkungan**:

   - Buat file `.env` di direktori root seperti yang dijelaskan di atas.

3. **Bangun dan Jalankan Kontainer**:

   ```bash
   docker-compose up --build
   ```

4. **Akses Aplikasi**:

   - **Frontend**: Buka `http://localhost:8080` di browser Anda.
   - **Backend API**: Dapat diakses di `http://localhost:3000/api/users`.

## Catatan

- Database PostgreSQL menyimpan data menggunakan volume Docker (`db_data`).
- Layanan backend menggunakan Prisma ORM untuk berinteraksi dengan database PostgreSQL.
- Frontend disajikan oleh server NGINX.
- Pastikan `DATABASE_URL` di file `.env` sesuai dengan kredensial database yang diatur di file `docker-compose.yml`.

## Perintah Prisma (Development)

- **Generate Prisma Client**:

  ```bash
  npx prisma generate
  ```

- **Jalankan Migrasi**:

  ```bash
  npx prisma migrate dev --name init
  ```

- **Buka Prisma Studio**:

  ```bash
  npx prisma studio
  ```

## Kesimpulan

Dengan Docker, aplikasi ini dapat dengan mudah di-deploy dan dijalankan di lingkungan apa pun. Ikuti langkah-langkah di atas untuk memulai!
