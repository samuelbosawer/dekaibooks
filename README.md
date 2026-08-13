# Dekaibooks — Website Profil

Website satu halaman (one-page) untuk Dekaibooks, gerakan literasi dan perpustakaan jalanan dari Yahukimo, Papua Pegunungan. Dibangun dengan pendekatan editorial/jurnal budaya, bukan template landing page.

Website ini statis sepenuhnya — HTML, CSS, dan JavaScript murni tanpa framework maupun proses build. Bisa langsung dibuka di browser atau dihosting di layanan statis apa pun (GitHub Pages, Netlify, dsb).

## Struktur Proyek

```
index.html          Struktur halaman & seluruh konten teks
style.css            Seluruh styling (warna, tipografi, layout, animasi, responsive)
script.js            Perilaku interaktif (nav mobile, header saat scroll, reveal animasi)
assets/img/logo.webp Logo Dekaibooks (dipakai di header, hero, dan footer)
```

Tidak ada dependency, tidak ada `package.json`, tidak ada langkah build. Edit file, simpan, refresh browser.

## Menjalankan di Lokal

Karena file dimuat dengan path relatif, buka lewat local server (bukan `file://`) agar font dan asset termuat sempurna:

```bash
# salah satu saja, sesuai yang tersedia di komputer
npx serve .
python -m http.server 8080
```

Lalu buka `http://localhost:8080` (atau port yang ditampilkan).

## Struktur Halaman

Urutan section pada `index.html`, mengikuti alur profil resmi Dekaibooks:

1. **Hero** — nama, tagline, dan kutipan visi, gaya sampul jurnal (latar hitam)
2. **Tentang Dekaibooks** — sejarah singkat berdirinya gerakan
3. **Keresahan** — kutipan editorial tentang keterbatasan akses buku di Yahukimo
4. **Visi** — "Belajar, Bertumbuh, Membumi" (latar hitam, tipografi besar)
5. **Misi** — enam poin misi dalam bentuk daftar bernomor
6. **Gerakan yang Berjalan** — Lapak Baca, Pemutaran Film, Riset Kolaborasi
7. **Lapak Baca** — jadwal (Rabu & Sabtu) dan detail kegiatan
8. **Galeri** — lihat catatan di bawah, saat ini masih berupa bingkai placeholder
9. **Donasi & Relawan** — ajakan dukungan buku/dana dan keterlibatan relawan, mengarah ke WhatsApp
10. **Pengurus** — susunan pengurus dan bidang
11. **Lokasi** — alamat dan peta minimal (OpenStreetMap)
12. **Kontak (Mari Terhubung)** — Instagram, Facebook, WhatsApp
13. **Footer** — identitas singkat, lokasi, tautan sosial, kredit pembuat

Navigasi header bersifat sticky dan tetap berlatar hitam saat discroll. Ada tombol sosial mengambang (WhatsApp, Instagram, Facebook) di kanan bawah yang otomatis tersembunyi saat mendekati footer agar tidak menumpuk dengan tautan sosial di sana.

## Catatan Penting: Section Galeri

Section **Galeri** (`#galeri`) dibangun tanpa foto asli karena belum ada dokumentasi foto yang tersedia untuk website ini. Alih-alih memakai foto stok atau foto karangan, section ini memakai "bingkai" placeholder bertekstur dengan keterangan/caption yang diambil dari konten profil resmi.

Untuk mengganti dengan foto dokumentasi asli:

1. Simpan foto di `assets/img/galeri/` (buat foldernya).
2. Di `index.html`, cari `<div class="gallery-grid">` lalu ganti tiap `<figure class="gallery-frame ...">` dengan `<img>` di dalamnya, atau tambahkan sebagai `background-image` lewat CSS.
3. Hapus `.gallery-frame::before` (label "Dokumentasi") dan pola garis diagonal di `style.css` jika sudah tidak diperlukan sebagai placeholder.

## Sistem Desain

- **Warna** — Oranye `#f6931e` sebagai aksen, hitam `#000000` dan putih `#ffffff` sebagai warna dominan. Didefinisikan sebagai CSS custom properties di `:root` pada `style.css`.
- **Tipografi** — DM Serif Display (heading/editorial) + Inter (body), dimuat dari Google Fonts.
- **Penomoran** — Section tidak lagi memakai penomoran urut (01, 02, ...); hanya ditandai garis kecil oranye (`.section-mark`). Daftar isi seperti Misi dan Program tetap memakai nomor karena itu bagian dari kontennya sendiri.
- **Animasi** — Reveal halus saat scroll (fade + translateY) lewat `IntersectionObserver` di `script.js`, durasi singkat, menghormati `prefers-reduced-motion`.

## Mengganti Logo

Ganti file `assets/img/logo.webp` dengan file baru bernama sama, atau ubah semua atribut `src="assets/img/logo.webp"` di `index.html` (dipakai di header, hero, footer, favicon, dan Open Graph image).

## Kredit

Website dikembangkan oleh [sbos.lab](https://projectbos.web.id) untuk Dekaibooks.
