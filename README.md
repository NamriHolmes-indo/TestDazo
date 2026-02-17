# Web AI Chatbot

Fullstack AI Engineer Technical Test — PT. Dazo Kreatif Indonesia

Author: Naufal Ammar Badri

## Deskripsi

Aplikasi ini merupakan implementasi Web AI Chatbot yang memungkinkan pengguna bertanya mengenai produk atau layanan, serta secara otomatis mencatat ketertarikan produk pengguna ke dalam file Excel.

Sistem dibangun menggunakan arsitektur fullstack monorepo yang terdiri dari frontend berbasis Vue.js dan backend berbasis Node.js dengan integrasi LangChain dan Google Gemini.

## Arsitektur Sistem

Alur kerja sistem:

1. Pengguna mengirim pesan melalui antarmuka chatbot
2. Frontend mengirim request HTTP ke backend
3. Backend memproses pesan menggunakan LangChain dan model Gemini
4. AI menentukan apakah terdapat ketertarikan terhadap produk
5. Jika ada ketertarikan, data disimpan ke file Excel
6. Backend mengirim respons ke frontend
7. Frontend menampilkan balasan AI

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

git clone <REPOSITORY_URL>
cd dazo

## Setup Backend

Masuk ke folder backend:

cd dazo-be-test

Install dependency:

npm install

### Konfigurasi Environment Backend

Buat file:

dazo-be-test/.env

Isi:

PORT=3000
GOOGLE_API_KEY=YOUR_GEMINI_API_KEY

Keterangan:
PORT → port server backend  
GOOGLE_API_KEY → API key Gemini untuk LLM

### Menjalankan Backend

node app.js

Server berjalan di:

http://localhost:PORT

Endpoint API chatbot:

POST /api/chat

## Setup Frontend

Masuk ke folder frontend:

cd ../dazo-fe-test

Install dependency:

npm install

### Konfigurasi Environment Frontend

Buat file:

dazo-fe-test/.env

Isi:

VITE_API_URL=http://localhost:3000/api/chat

### Menjalankan Frontend

npm run dev

Akses aplikasi melalui:

http://localhost:5173

## Endpoint API

POST /api/chat

Request:

{
"message": "Saya tertarik paket premium"
}

Response:

{
"reply": "Paket premium cocok untuk bisnis Anda.",
"interestedProduct": "Paket Premium"
}

## Penyimpanan Data Excel

File Excel dibuat otomatis dan data ditambahkan setiap ada ketertarikan produk.

Lokasi file:

dazo-be-test/luaran/

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

## Pengembangan Selanjutnya

- Conversation memory
- Streaming response
- Download Excel dari UI
- Containerization dengan Docker
- Deployment cloud
