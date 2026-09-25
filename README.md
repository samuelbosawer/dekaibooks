# Dekai Books — Website Profil

Website untuk Dekai Books, gerakan literasi dan perpustakaan jalanan dari Yahukimo, Papua Pegunungan. Dibangun dengan pendekatan editorial/jurnal budaya, bukan template landing page.

Website ini statis sepenuhnya — HTML, CSS, dan JavaScript murni tanpa framework maupun proses build. Bisa langsung dihosting di layanan statis apa pun (GitHub Pages, Netlify, dsb).

## Struktur Proyek

```
index.html              Halaman utama (profil, one-page)
katalog.html             Halaman Katalog Buku (data dari Google Sheet)

assets/css/style.css     Seluruh styling (warna, tipografi, layout, animasi, responsive)
assets/js/partials.js    Template header, footer, dan tombol sosial mengambang (dipakai semua halaman)
assets/js/script.js      Perilaku interaktif umum (nav mobile, header saat scroll, reveal animasi, lightbox galeri)
assets/js/katalog.js     Pengambilan & render data katalog dari Google Sheet (khusus katalog.html)

assets/img/logo.webp     Logo Dekai Books (header, hero, footer, favicon)
assets/img/galeri/       Foto dokumentasi lapak baca (1.webp - 8.webp)
```

Tidak ada dependency, tidak ada `package.json`, tidak ada langkah build. Edit file, simpan, refresh browser.

## Menjalankan di Lokal

Karena file dimuat dengan path relatif dan `katalog.html` mengambil data lewat `fetch()`, buka lewat local server (bukan `file://`) agar semuanya termuat sempurna:

```bash
# salah satu saja, sesuai yang tersedia di komputer
npx serve .
python -m http.server 8080
```

Lalu buka `http://localhost:8080` (atau port yang ditampilkan).

## Header & Footer: Sistem Templating

Header, footer, dan tombol sosial mengambang tidak lagi ditulis berulang di setiap file HTML. Semuanya didefinisikan **satu kali** sebagai string HTML di `assets/js/partials.js`, lalu disuntikkan ke setiap halaman saat dimuat. Mengubah menu, logo, alamat, atau tautan sosial cukup dilakukan di satu file itu — otomatis berlaku di semua halaman.

**Cara kerja:** setiap halaman HTML hanya berisi elemen mount kosong:

```html
<header class="site-header" id="site-header"></header>
...
<footer class="site-footer" id="site-footer"></footer>
<div class="float-social" id="float-social"></div>
```

`partials.js` mencari elemen-elemen itu lewat ID-nya dan mengisi `innerHTML`-nya. Skrip ini harus dimuat **sebelum** `script.js` karena `script.js` butuh header/nav sudah ada di DOM.

**Menambahkan halaman baru:** salin kerangka berikut ke file HTML baru:

```html
<body data-page="nama-halaman">
  <header class="site-header" id="site-header"></header>
  <main id="konten">
    <!-- konten halaman -->
  </main>
  <footer class="site-footer" id="site-footer"></footer>
  <div class="float-social" id="float-social"></div>

  <script src="assets/js/partials.js"></script>
  <script src="assets/js/script.js"></script>
</body>
```

Atribut `data-page` menentukan bagaimana tautan navigasi dibentuk:

- `data-page="home"` (dipakai `index.html`) → tautan menu memakai anchor langsung, misalnya `#tentang`.
- Nilai lain (mis. `data-page="katalog"`) → tautan menu otomatis diarahkan ke `index.html#tentang`, dan menu yang cocok dengan nilai `key` di `navItems` (lihat `partials.js`) ditandai aktif (warna oranye).

Untuk menambah item menu baru, edit array `navItems` di bagian atas `assets/js/partials.js`.

## Halaman Katalog Buku

`katalog.html` menampilkan daftar buku yang diambil langsung dari Google Sheet lewat endpoint `gviz` bawaan Google (tanpa API key, tanpa backend). Logikanya ada di `assets/js/katalog.js`.

**Menghubungkan ke Google Sheet:**

1. Buka Google Sheet yang berisi data katalog. Baris pertama harus berisi nama kolom (mis. `Judul`, `Penulis`, `Kategori`, `Tahun`, `Status`) — nama kolom ini otomatis dipakai sebagai judul tabel di halaman, jadi tidak perlu ubah kode saat menambah/mengubah kolom.
2. **Bagikan** sheet tersebut: klik Share, atur akses ke **"Anyone with the link" → Viewer**. Tanpa ini, data tidak bisa diambil dari browser pengunjung.
3. Salin ID sheet dari URL-nya: `docs.google.com/spreadsheets/d/`**`{ID}`**`/edit`.
4. Buka `assets/js/katalog.js`, isi bagian `CONFIG` di baris paling atas:
   ```js
   var CONFIG = {
     sheetId: "TEMPEL_ID_SHEET_DI_SINI",
     sheetName: "Sheet1" // nama tab di bagian bawah Google Sheets
   };
   ```
5. Simpan dan muat ulang `katalog.html`. Sebelum `sheetId` diisi, halaman menampilkan pesan "Katalog belum terhubung" (bukan error) sehingga tidak ada tampilan rusak.

Kotak pencarian di halaman ini menyaring baris yang sudah dimuat, mencocokkan teks di seluruh kolom sekaligus — tidak perlu konfigurasi tambahan.

## Struktur Halaman (`index.html`)

Urutan section, mengikuti alur profil resmi Dekai Books:

1. **Hero** — nama, tagline, dan kutipan visi, gaya sampul jurnal (latar hitam, dengan vinyet, tekstur grain halus, dan garis animasi tipis)
2. **Tentang Dekai Books** — sejarah singkat berdirinya gerakan
3. **Keresahan** — kutipan editorial tentang keterbatasan akses buku di Yahukimo
4. **Visi** — "Belajar, Bertumbuh, Membumi" (latar hitam, tipografi besar)
5. **Misi** — enam poin misi dalam bentuk daftar bernomor
6. **Gerakan yang Berjalan** — Lapak Baca, Pemutaran Film, Riset Kolaborasi
7. **Lapak Baca** — jadwal (Rabu & Sabtu) dan detail kegiatan
8. **Galeri** — mosaik foto dokumentasi (kotak 1:1), setiap foto bisa diklik untuk dibuka dalam lightbox
9. **Donasi & Relawan** — ajakan dukungan buku/dana dan keterlibatan relawan, mengarah ke WhatsApp
10. **Pengurus** — susunan pengurus dan bidang
11. **Lokasi** — alamat lengkap
12. **Kontak (Mari Terhubung)** — Instagram, Facebook, WhatsApp
13. **Footer** — identitas singkat, lokasi, tautan sosial, kredit pembuat

Navigasi header bersifat sticky dan selalu berlatar hitam. Ada tombol sosial mengambang (WhatsApp, Instagram, Facebook) di kanan bawah yang otomatis tersembunyi saat mendekati footer agar tidak menumpuk dengan tautan sosial di sana.

## Galeri & Lightbox

Foto dokumentasi ada di `assets/img/galeri/1.webp` sampai `8.webp`. Setiap foto ditampilkan sebagai kotak 1:1 dan bisa diklik untuk membuka lightbox (navigasi sebelumnya/berikutnya, tutup dengan Escape atau klik di luar gambar). Untuk mengganti atau menambah foto, sunting daftar `<button class="gallery-frame">` di `index.html` dan sesuaikan path gambar serta teks pada `<span class="gallery-caption">`.

## Sistem Desain

- **Warna** — Oranye `#f6931e` sebagai aksen, hitam `#000000` dan putih `#ffffff` sebagai warna dominan. Didefinisikan sebagai CSS custom properties di `:root` pada `assets/css/style.css`.
- **Tipografi** — DM Serif Display (heading/editorial) + Inter (body), dimuat dari Google Fonts.
- **Penomoran** — Section tidak memakai penomoran urut (01, 02, ...); hanya ditandai garis kecil oranye (`.section-mark`). Daftar isi seperti Misi dan Program tetap memakai nomor karena itu bagian dari kontennya sendiri, dengan warna oranye yang sama di kedua tempat.
- **Animasi** — Reveal halus saat scroll (fade + translateY) lewat `IntersectionObserver` di `script.js`, durasi singkat, menghormati `prefers-reduced-motion`.

## Mengganti Logo

Ganti file `assets/img/logo.webp` dengan file baru bernama sama. Logo dipakai di header, hero, footer, favicon, dan Open Graph image lewat `partials.js` dan `index.html`/`katalog.html`.

## Hosting di GitHub Pages & Custom Domain

Repo ini dihosting lewat GitHub Pages di [`dekaibooks/dekaibooks.github.io`](https://github.com/dekaibooks/dekaibooks.github.io), sehingga situs otomatis tersedia di `https://dekaibooks.github.io`.

**Menghubungkan custom domain:**

1. Di GitHub, buka **Settings → Pages**, isi kolom **Custom domain** dengan `www.dekaibooks.org`, lalu Save. GitHub akan membuat file `CNAME` di root repo.
2. Di panel DNS penyedia domain, tambahkan record berikut:

   | Domain | Type  | Value                  |
   | ------ | ----- | ---------------------- |
   | www    | CNAME | dekaibooks.github.io   |
   | @      | A     | 185.199.108.153        |
   | @      | A     | 185.199.109.153        |
   | @      | A     | 185.199.110.153        |
   | @      | A     | 185.199.111.153        |

   Record `@` membuat `dekaibooks.org` (tanpa www) ikut diarahkan ke GitHub Pages.

3. Tunggu propagasi DNS (beberapa menit hingga 24 jam), lalu centang **Enforce HTTPS** di Settings → Pages.

## Kredit

Website dikembangkan oleh [sbos.lab](https://projectbos.web.id) untuk Dekai Books.
