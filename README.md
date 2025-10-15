# 🧼 Shoe Laundry REST API (Node.js, Express.js, Supabase)

## 🙎‍♂️ Data Mahasiswa

Nama     : Muhammad Riza

NIM      : 21120123140117

Kelompok : 4


## 📝 Deskripsi Proyek

Proyek ini adalah implementasi RESTful API sederhana yang dirancang untuk mengelola daftar barang (sepatu) yang masuk ke layanan cuci sepatu (*shoe laundry*). API ini menyediakan antarmuka CRUD lengkap yang memungkinkan aplikasi *client* (seperti dashboard atau aplikasi kasir) untuk melacak status pengerjaan setiap pesanan.

## ✨ Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| **CRUD Penuh** | Mendukung operasi Create, Read, Update, dan Delete untuk data barang. |
| **Filter Status** | Memungkinkan pengambilan data berdasarkan status pengerjaan (`Masuk`, `Dicuci`, `Selesai`, `Diambil`). |
| **Backend Terkelola** | Menggunakan **Supabase (PostgreSQL)** untuk penyimpanan data yang andal. |
| **Serverless Deployment** | Di-*deploy* ke **Vercel** sebagai *Serverless Function* menggunakan Node.js dan Express.js. |

## 🛠️ Stack Teknologi

  * **Backend:** Node.js
  * **Framework:** Express.js
  * **Database:** Supabase (PostgreSQL)
  * **Deployment:** Vercel

-----

## 💾 Struktur Data (Tabel `items`)

Data disimpan dalam tabel `items` di Supabase dengan skema sebagai berikut:

| Kolom | Tipe Data | Keterangan | Contoh Nilai |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **Primary Key** unik untuk setiap item (dihasilkan otomatis). | `8f5b...` |
| `nama_sepatu` | `TEXT` | Nama dan jenis sepatu. | `Vans Old Skool` |
| `warna` | `TEXT` | Warna sepatu. | `Navy` |
| `layanan` | `TEXT` | Jenis layanan cuci yang dipilih. | `Deep Clean` |
| `status` | `TEXT` | Status pengerjaan saat ini. | `Masuk`, `Dicuci`, `Selesai` |
| `tgl_masuk` | `TIMESTAMPTZ`| Tanggal dan waktu item diterima (ditetapkan otomatis).| `2025-10-15T...` |

-----

## 🚀 Panduan Instalasi dan Menjalankan API (Lokal)

### 1\. Kloning Repositori

```bash
git clone https://github.com/rizasaputra29/shoe-laundry-api
cd shoe-laundry-api
```

### 2\. Instal Dependencies

```bash
npm install
```

### 3\. Konfigurasi Environment Variables

Buat file bernama **`.env`** di *root* direktori proyek Anda dan isi dengan kredensial Supabase Anda.

```env
SUPABASE_URL="https://[PROJECT_REF].supabase.co"
SUPABASE_KEY="[YOUR_SUPABASE_SERVICE_ROLE_KEY]"
PORT=3000
```

> **Penting:** Gunakan **Service Role Key** dari Supabase Anda untuk operasi *server-side* yang aman.

### 4\. Jalankan Server

Gunakan *script* `dev` untuk menjalankan server secara lokal dengan fitur *live-reload* (memantau perubahan *file*).

```bash
npm run dev
```

Server akan aktif dan *listening* di `http://localhost:3000`.

-----

## 🌐 Endpoint API

**Base URL Lokal:** `http://localhost:3000/api`

| Metode | Endpoint | Keterangan |
| :--- | :--- | :--- |
| `POST` | `/items` | Tambah barang baru ke daftar cuci. |
| `GET` | `/items` | Ambil semua barang. |
| `GET` | `/items?status=STATUS` | Ambil barang berdasarkan status (misalnya, `Selesai`). |
| `GET` | `/items/:id` | Ambil detail barang berdasarkan ID. |
| `PUT` | `/items/:id` | Perbarui detail/status barang berdasarkan ID. |
| `DELETE` | `/items/:id` | Hapus barang berdasarkan ID. |

-----

## 💬 Contoh Request & Response

### 1\. CREATE (Tambah Barang)

| **Request** | **Response Status** |
| :--- | :--- |
| `POST /api/items` | `201 Created` |

**Body Request:**

```json
{
    "nama_sepatu": "Vans Old Skool",
    "warna": "Merah Marun",
    "layanan": "Reguler"
}
```

**Response Body (JSON):**

```json
{
    "id": "e4f5a6b7-c8d9-0e1f-2a3b-4c5d6e7f8a9b",
    "nama_sepatu": "Vans Old Skool",
    "warna": "Merah Marun",
    "layanan": "Reguler",
    "status": "Masuk",
    "tgl_masuk": "2025-10-15T16:00:00.000+07:00"
}
```

### 2\. READ All (dengan Filter)

| **Request** | **Response Status** |
| :--- | :--- |
| `GET /api/items?status=Selesai` | `200 OK` |

**Response Body (JSON):**

```json
[
    {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "nama_sepatu": "Converse Chuck Taylor",
        "warna": "Hitam",
        "layanan": "Reguler",
        "status": "Selesai",
        "tgl_masuk": "2025-10-01T10:00:00.000+07:00"
    }
]
```

### 3\. UPDATE (Ganti Status)

| **Request** | **Response Status** |
| :--- | :--- |
| `PUT /api/items/e4f5a6b7-c8d9-0e1f-2a3b-4c5d6e7f8a9b` | `200 OK` |

**Body Request:**

```json
{
    "status": "Dicuci"
}
```

**Response Body (JSON):** (Objek yang diperbarui)

```json
[
    {
        "id": "e4f5a6b7-c8d9-0e1f-2a3b-4c5d6e7f8a9b",
        "nama_sepatu": "Vans Old Skool",
        "warna": "Merah Marun",
        "layanan": "Reguler",
        "status": "Dicuci",
        "tgl_masuk": "2025-10-15T16:00:00.000+07:00"
    }
]
```

### 4\. DELETE (Hapus Barang)

| **Request** | **Response Status** |
| :--- | :--- |
| `DELETE /api/items/e4f5a6b7-c8d9-0e1f-2a3b-4c5d6e7f8a9b` | `204 No Content` |

**Response Body:** (Kosong)

-----

## ☁️ Link Deployment (Vercel)

API ini telah di-*deploy* ke Vercel dan dapat diakses publik.

**Base URL Production:**

➡️ **`https://responsi-ppb-modul1.vercel.app/`**