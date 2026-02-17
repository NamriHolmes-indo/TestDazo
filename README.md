# Web AI Chatbot

Fullstack AI Engineer Technical Test — PT. Dazo Kreatif Indonesia

Author: Naufal Ammar Badri

## Deskripsi

Aplikasi ini merupakan implementasi Web AI Chatbot yang memungkinkan pengguna bertanya mengenai produk atau layanan, serta secara otomatis mencatat ketertarikan produk pengguna ke dalam file Excel.

Sistem dibangun menggunakan arsitektur fullstack monorepo yang terdiri dari frontend berbasis Vue.js dan backend berbasis Node.js dengan integrasi LangChain dan Google Gemini.

## Arsitektur Sistem

![alt text](https://github.com/NamriHolmes-indo/TestDazo/blob/main/flow%20program.jpg "Flow kerja program")

## Teknologi yang Digunakan

Backend:
- Node.js (Express)
- LangChain JS
- Google Gemini API
- ExcelJS

Frontend:
- Vue.js 3 (Vite)
- Ant Design Vue
- Markdown Renderer
- Fetch API

Data Output:

- Excel (.xlsx)

## Setup dan Instalasi

Clone repository:

```
git clone https://github.com/NamriHolmes-indo/TestDazo
cd dazo
```

## Setup Backend

Masuk ke folder backend:
```
cd dazo-be-test
```
Install dependency:
```
npm install
```
> [!IMPORTANT]
> ### Konfigurasi Environment Backend

Buat file: ``dazo-be-test/.env``

Isi:
```
PORT=8121
GOOGLE_API_KEY=GEMINI_API_ANDA
```
> [!TIP]
> PORT → port server backend  
> GOOGLE_API_KEY → API key Gemini untuk LLM

### Menjalankan Backend
```
node app.js
```
> [!WARNING]
> Jalankan ini di folder dazo-be-test

Server berjalan di: ``http://localhost:PORT``
Endpoint API chatbot: ``POST /api/chat``

## Setup Frontend

> [!WARNING]
> Masuk ke folder frontend:
```
cd ../dazo-fe-test
```
Install dependency:
```
npm install
```
### Konfigurasi Environment Frontend

> [!IMPORTANT]
> Buat file: ``dazo-fe-test/.env``

Isi:
```VITE_API_URL=http://localhost:8121/api/chat```
### Menjalankan Frontend
```
npm run dev
```
Akses aplikasi melalui:
```
http://localhost:5173
```
## Endpoint API

``POST /api/chat``

Request:
```
{
"message": "Saya tertarik paket premium"
}
```
Response:
```
{
"reply": "Paket premium cocok untuk bisnis Anda.",
"interestedProduct": "Paket Premium"
}
```
## Penyimpanan Data Excel
> File Excel dibuat otomatis dan data ditambahkan setiap ada ketertarikan produk.

Lokasi file: ``dazo-be-test/luaran/``

Format kolom:
- Tanggal (WIB)
- Nama Produk
- Pesan User
- Response AI

Data selalu ditambahkan tanpa overwrite.

## Error Handling

Sistem menangani kondisi berikut:
- Input kosong
- Backend error
- API key tidak tersedia
- Gagal membaca atau menulis file Excel
- Format respons AI tidak valid

Server tetap berjalan tanpa crash.

## Keamanan

- API key tidak di-hardcode
- Menggunakan environment variable
- File Excel dibuat otomatis jika belum ada
- Data Excel bersifat append-only
