REST API Daftar Barang Cuci Sepatu (Shoe Laundry API)

🙎‍♂️ Data Mahasiswa
Nama     : Muhammad Riza Saputra

NIM      : 21120123140117

Kelompok : 4


📝 Deskripsi Umum Proyek
Proyek ini adalah implementasi RESTful API sederhana untuk mengelola daftar barang (sepatu) yang masuk ke layanan cuci sepatu. API dibangun menggunakan Node.js dan Express.js, dengan Supabase sebagai backend database (PostgreSQL). API ini di-deploy sebagai Serverless Function menggunakan Vercel.

✨ Tujuan dan Fitur Utama
Tujuan: Menyediakan antarmuka terpusat untuk aplikasi client (seperti Dashboard admin atau aplikasi mobile) guna melakukan manajemen data pesanan cuci sepatu.

Fitur Utama (CRUD):

Create: Menambahkan data sepatu baru ke daftar cuci.

Read: Mengambil semua daftar sepatu atau melihat detail berdasarkan ID.

Update: Mengubah detail atau status sepatu.

Delete: Menghapus data sepatu dari daftar.

Filter: Mendukung query untuk memfilter barang berdasarkan status.

💾 Struktur Data
Kolom	Tipe Data	Keterangan	Contoh Nilai
id	UUID	ID unik barang (otomatis)	8f5b...
nama_sepatu	TEXT	Nama dan jenis sepatu	Vans Old Skool
warna	TEXT	Warna utama sepatu	Navy
layanan	TEXT	Jenis layanan cuci	Fast Clean
status	TEXT	Status pengerjaan	Masuk, Dicuci, Selesai, Diambil
tgl_masuk	TIMESTAMPTZ	Tanggal dan waktu barang diterima (otomatis)	2025-10-15T15:00:00+07

Export to Sheets
🚀 Contoh Request dan Response
Base URL: [LINK_DEPLOY_VERCEL]/api

1. CREATE (Tambah Barang)
Endpoint: POST /api/items

Body (JSON):

JSON

{
    "nama_sepatu": "Converse Chuck 70",
    "warna": "Hitam",
    "layanan": "Deep Clean"
}
Response (201 Created):

JSON

{
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "nama_sepatu": "Converse Chuck 70",
    "warna": "Hitam",
    "layanan": "Deep Clean",
    "status": "Masuk",
    "tgl_masuk": "2025-10-15T15:10:00.000+07:00"
}
2. READ (Filter Status)
Endpoint: GET /api/items?status=Selesai

Response (200 OK):

JSON

[
    {
        "id": "f5e4d3c2-b1a0-9876-5432-1fedcba09876",
        "nama_sepatu": "Adidas Ultraboost",
        "warna": "Abu-abu",
        "layanan": "Reguler",
        "status": "Selesai",
        "tgl_masuk": "2025-10-10T10:00:00.000+07:00"
    }
    // ... barang lainnya dengan status "Selesai"
]
3. UPDATE (Ubah Status)
Endpoint: PUT /api/items/:id (Ganti :id dengan ID sepatu)

Body (JSON):

JSON

{
    "status": "Dicuci"
}
Response (200 OK): Mengembalikan objek yang telah diperbarui.

4. DELETE (Hapus Barang)
Endpoint: DELETE /api/items/:id (Ganti :id dengan ID sepatu)

Response (204 No Content): Tidak ada body yang dikembalikan.

⚙️ Langkah Instalasi dan Cara Menjalankan API (Lokal)
Clone Repository:

Bash

git clone https://github.com/rizasaputra29/shoe-laundry-api
cd shoe-laundry-api
Instal Dependencies:

Bash

npm install
Konfigurasi Environment: Buat file .env di root proyek dan isi dengan kredensial Supabase Anda:

Code snippet

SUPABASE_URL="https://[PROJECT_REF].supabase.co"
SUPABASE_KEY="[YOUR_SUPABASE_SERVICE_ROLE_KEY]"
Jalankan API:

Bash

npm run dev
# API akan berjalan di http://localhost:3000
🔗 Link Deploy (Vercel)
API ini telah di-deploy dan dapat diakses publik di:

Link Deploy Vercel: [GANTI DENGAN LINK VERCEL ANDA]