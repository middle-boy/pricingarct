# ARCT.STUDIO Pricing Tool — Google Sheets Setup Guide

## Cara Kerja

Aplikasi ini dikonfigurasi sebagai **"Headless CMS" berbasis Google Sheets**. Seluruh data harga, parameter dasar, opsi dropdown, dan layanan tambahan ditarik dari Google Sheets melalui API publik (tanpa API key, tanpa backend).

Semua logika _hardcoded_ telah dihapus. Agar aplikasi dapat berjalan dengan lancar, pastikan Anda telah membuat spreadsheet yang sesuai dengan format di bawah ini.

---

## Langkah Setup

### 1. Setup Environment

Agar aplikasi terhubung otomatis ke spreadsheet, Anda harus mengatur variabel lingkungan:

1. Buat file `.env` di root project jika belum ada.
2. Tambahkan konfigurasi berikut:
   ```env
   VITE_GOOGLE_SHEET_ID=masukkan_id_spreadsheet_anda_disini
   ```

### 2. Buat Google Spreadsheet Baru

Buka https://sheets.google.com → buat spreadsheet baru.

### 3. Set Permissions ke Publik

Agar aplikasi bisa membaca data, setel akses spreadsheet menjadi Publik:

```text
File → Share → General Access → Anyone with the link → Viewer
```

---

## Struktur Tab (Wajib Sama Persis)

Anda harus membuat 6 tab (sheet) dengan nama persis seperti berikut:

1. `config`
2. `services`
3. `complexity`
4. `urgency`
5. `options`
6. `addons`

Jika tab tidak ditemukan atau dibiarkan kosong, aplikasi akan menggunakan data bawaan (default).

---

### Tab 1: `config`

Tab ini menyimpan **semua harga dasar, kuota gratis, dan parameter kalkulasi**.
_Struktur Kolom:_ `key` · `value` · `hidden`

| key                | value    | hidden |
| ------------------ | -------- | ------ |
| logo_base_price    | 750000   |        |
| logo_alt_free      | 1        |        |
| logo_alt_price     | 250000   |        |
| logo_rev_free      | 2        |        |
| logo_rev_price     | 100000   |        |
| gd_alt_free        | 1        |        |
| gd_alt_price       | 150000   |        |
| gd_rev_free        | 2        |        |
| gd_rev_price       | 75000    |        |
| brand_base_price   | 750000   |        |
| brand_rev_free     | 2        |        |
| brand_rev_price    | 100000   |        |
| uiux_base_price    | 700000   |        |
| uiux_comp_free     | 10       |        |
| uiux_comp_price    | 50000    |        |
| uiux_handoff_price | 500000   |        |
| uiux_rev_free      | 2        |        |
| uiux_rev_price     | 150000   |        |
| web_base_price     | 10000000 |        |
| web_page_free      | 5        |        |
| web_page_price     | 500000   |        |

---

### Tab 2: `services`

Menyimpan daftar sub-layanan utama (misalnya untuk Graphic Design).
_Struktur Kolom:_ `code` · `name` · `base` · `unit` · `cat` · `hidden`

| code | name              | base   | unit | cat           | hidden |
| ---- | ----------------- | ------ | ---- | ------------- | ------ |
| 02-B | Flyer             | 100000 | item | Print & Promo |        |
| 04-A | Social Media Post | 69000  | item | Social Media  |        |

---

### Tab 3: `complexity`

Menyimpan level kerumitan (multiplier untuk harga).
_Struktur Kolom:_ `id` · `label` · `mult` · `hidden`

| id  | label    | mult | hidden |
| --- | -------- | ---- | ------ |
| 1   | Simple   | 1    |        |
| 2   | Standard | 1.3  |        |
| 3   | Complex  | 1.6  |        |

---

### Tab 4: `urgency`

Menyimpan tingkat urgensi pengerjaan (multiplier untuk harga).
_Struktur Kolom:_ `id` · `label` · `badge` · `mult` · `hidden`

| id  | label      | badge | mult | hidden |
| --- | ---------- | ----- | ---- | ------ |
| 1   | Normal     |       | 1    |        |
| 2   | Rush       | +50%  | 1.5  |        |
| 3   | Super Rush | +100% | 2    |        |

---

### Tab 5: `options`

Menyimpan semua data list untuk Dropdown dan Pilihan Kategori.
_Struktur Kolom:_ `category` · `label` · `value` · `hidden`

| category   | label               | value            | hidden |
| ---------- | ------------------- | ---------------- | ------ |
| logo_type  | Combination Mark    | Combination Mark |        |
| logo_type  | Logotype            | Logotype         |        |
| gd_ratio   | 1:1 (Square)        | 1:1 (Square)     |        |
| uiux_ratio | Mobile (375x812)    | Mobile (375x812) |        |
| prototype  | Static Mockup       | 1.0              |        |
| prototype  | Clickable Prototype | 1.4              |        |
| prototype  | Hi-Fi Interactive   | 1.8              |        |

---

### Tab 6: `addons`

Struktur tunggal untuk **seluruh Add-Ons dan Toggles** di seluruh layanan. Fitur UI secara otomatis membuat Toggles dan Checkbox berdasarkan data ini.
_Struktur Kolom:_ `service` · `group` · `id` · `label` · `desc` · `price_val` · `type` · `hidden`

- **service**: ID layanan target (`logo`, `gd`, `brand`, `uiux`, `web`)
- **group**: Nama grup tampilan, contoh: `Add-Ons` (akan jadi checkbox), `File Options` (akan jadi toggle).
- **type**: Tipe harga: `flat` (harga tetap), `percent` (persentase seperti 0.15), `mult` (mengikuti multiplier complexity), `per_page` (dikali jumlah halaman).

| service | group                  | id               | label                        | desc                      | price_val | type     | hidden |
| ------- | ---------------------- | ---------------- | ---------------------------- | ------------------------- | --------- | -------- | ------ |
| logo    | File Options           | multipleFiles    | Multiple File Formats        | AI, EPS, SVG, PDF         | 0.15      | percent  |        |
| logo    | Add-Ons                | brand_guidelines | Brand Guidelines (30+ hal)   |                           | 3500000   | flat     |        |
| gd      | File & Print Options   | titipCetak       | Titip Cetak (Print Handling) | ARCT koordinasi ke vendor | 0.20      | percent  |        |
| brand   | Komponen Brand Package | maskot           | Brand Mascot Character       | Karakter utama + ekspresi | 4950000   | mult     |        |
| uiux    | Add-Ons                | wireframe        | Wireframe                    |                           | 200000    | per_page |        |

---

## Fitur Tambahan: "Sembunyikan Baris"

Di setiap tab, Anda bisa menambahkan satu kolom opsional bernama `hidden`.
Jika nilai pada kolom tersebut diisi dengan **`TRUE`**, maka baris tersebut akan **diabaikan** oleh aplikasi. Gunakan fitur ini jika Anda ingin menonaktifkan fitur/layanan tertentu tanpa menghapus barisnya dari spreadsheet.

## Tips Workflow

- **Update Harga**: Ubah nilai di Sheets, lalu kembali ke aplikasi dan klik logo refresh (**↻**) di pojok kanan atas Header untuk menyinkronkan data seketika tanpa perlu merefresh halaman.
- **Kesalahan Ketik (Typo)**: Aplikasi secara cerdas tidak sensitif huruf besar/kecil (_case-insensitive_) dan mengabaikan spasi pada penamaan header kolom.

---

_ARCT.STUDIO Pricing Tool — SSOT Architecture v2026_
