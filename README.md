# 🍰 Dapur Mulia E-Commerce

![Dapur Mulia](public/images/logo.png)

## 📋 Tentang Proyek

**Dapur Mulia** adalah platform e-commerce UMKM yang menjual berbagai macam kue tradisional, kue modern, roti, snack, cemilan, keripik, hampers, oleh-oleh, dan makanan ringan khas Aceh. Dibangun menggunakan **Laravel 10** dengan database **MySQL**.

### 🏠 Alamat Toko
Geulumpang Sulu Barat, Kecamatan Dewantara, Kabupaten Aceh Utara, Aceh, Indonesia

### 🎨 Tema
- **Warna Utama:** Fresh Orange (#FF7A00)
- **Gaya:** Modern, Elegant, Minimalist, Premium, Clean UI, Responsive

---

## ✨ Fitur Utama

### 👤 Customer Features
- ✅ Registrasi & Login Customer
- ✅ Katalog Produk Lengkap (100+ Produk)
- ✅ Detail Produk dengan Gambar & Rating
- ✅ Pencarian Produk Real-time
- ✅ Filter Produk (Kategori, Harga, Terbaru, Terpopuler)
- ✅ Shopping Cart
- ✅ Checkout & Pembayaran
- ✅ Upload Bukti Transfer
- ✅ Wishlist
- ✅ Riwayat Pesanan
- ✅ Dashboard Customer
- ✅ Edit Profil

### 🛠️ Admin Features
- ✅ Dashboard Admin dengan Statistik
- ✅ Manajemen Produk (CRUD)
- ✅ Manajemen Kategori (CRUD)
- ✅ Manajemen Customer
- ✅ Manajemen Pesanan
- ✅ Manajemen Pembayaran
- ✅ Verifikasi Pembayaran
- ✅ Laporan Penjualan
- ✅ Manajemen Banner
- ✅ Manajemen Testimoni
- ✅ Pengaturan Website

### 🔒 Security
- ✅ Autentikasi Secure (Laravel Sanctum)
- ✅ Proteksi CSRF
- ✅ Proteksi XSS
- ✅ SQL Injection Protection
- ✅ Validasi Input
- ✅ Middleware Admin

### 📱 Features
- ✅ Responsive Design (Mobile Friendly)
- ✅ Floating WhatsApp Button
- ✅ WhatsApp Order Integration
- ✅ TikTok Integration
- ✅ SEO Optimized
- ✅ Smooth Animations
- ✅ Fast Loading
- ✅ Newsletter Subscription
- ✅ Contact Form

---

## 🚀 Teknologi

| Teknologi | Versi |
|-----------|-------|
| PHP | ^8.1 |
| Laravel | ^10.0 |
| MySQL | ^8.0 |
| Bootstrap | ^5.3 |
| jQuery | ^3.6 |
| Laravel Sanctum | ^3.0 |
| DOMPDF | ^2.0 |
| Intervention Image | ^2.7 |
| SweetAlert2 | ^11.7 |
| Chart.js | ^4.3 |
| DataTables | ^1.13 |

---

## 💻 Persyaratan Sistem

- PHP >= 8.1
- Composer >= 2.0
- MySQL >= 8.0 / MariaDB >= 10.4
- Node.js >= 16.x (Optional, untuk asset building)
- XAMPP / Laragon / WAMP / LAMP

---

## 🔧 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/username/dapur-mulia-ecommerce.git
cd dapur-mulia-ecommerce
```

### 2. Install Dependencies
```bash
composer install
npm install && npm run build
```

### 3. Konfigurasi Environment
```bash
cp .env.example .env
php artisan key:generate
```
Edit file `.env` dan sesuaikan konfigurasi database:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dapur_mulia
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Setup Database
Via phpMyAdmin atau terminal:
```bash
mysql -u root -p < database.sql
```

Atau gunakan migrasi Laravel:
```bash
php artisan migrate --seed
```

### 5. Storage Link
```bash
php artisan storage:link
```

### 6. Jalankan Aplikasi
```bash
php artisan serve
```
Akses di browser: `http://localhost:8000`

---

## 👤 Akun Default

### Admin
| Level | Email | Password |
|-------|-------|----------|
| Super Admin | admin@dapurmulia.com | password |

### Customer (via Register)
Register akun baru di halaman `/register`

---

## 📁 Struktur Direktori

```
dapur-mulia-ecommerce/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── CategoryController.php
│   │   │   │   ├── CustomerController.php
│   │   │   │   ├── OrderController.php
│   │   │   │   └── ReportController.php
│   │   │   ├── Auth/
│   │   │   ├── HomeController.php
│   │   │   ├── ProductController.php
│   │   │   ├── CartController.php
│   │   │   ├── CheckoutController.php
│   │   │   └── UserController.php
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   └── Providers/
├── config/
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── uploads/
├── resources/
│   └── views/
│       ├── layouts/
│       ├── auth/
│       ├── home/
│       ├── products/
│       ├── cart/
│       ├── checkout/
│       ├── customer/
│       └── admin/
├── routes/
└── tests/
```

---

## 🌐 Deployment

### GitHub Pages (Frontend Only)
1. Push repository ke GitHub
2. Enable GitHub Pages di repository Settings
3. Publish dari folder `/docs` atau root

### Hosting (cPanel / Hostinger / Niagahoster)
1. Upload semua file ke server
2. Setup database di phpMyAdmin
3. Import `database.sql`
4. Update `.env` dengan konfigurasi server
5. Set folder `public` sebagai document root

### VPS Ubuntu
```bash
sudo apt update
sudo apt install nginx mysql-server php8.1 php8.1-fpm php8.1-mysql composer
git clone https://github.com/username/dapur-mulia-ecommerce.git
cd dapur-mulia-ecommerce
composer install
cp .env.example .env
php artisan key:generate
# Setup database & .env
php artisan migrate --seed
sudo chown -R www-data:www-data storage bootstrap/cache
```

---

## 🧪 Testing

```bash
php artisan test
```

### Black Box Testing Scope:
- ✅ Login & Register
- ✅ Search Product
- ✅ Shopping Cart Operations
- ✅ Checkout Process
- ✅ Payment Confirmation
- ✅ CRUD Product (Admin)
- ✅ CRUD Category (Admin)

---

## 📄 Dokumentasi

- **SRS** - Software Requirement Specification
- **Use Case Diagram**
- **Activity Diagram**
- **ERD** - Entity Relationship Diagram
- **Database Design**

---

## 📞 Kontak

- **WhatsApp:** 081273127063
- **TikTok:** @dapurmulia
- **Email:** info@dapurmulia.com
- **Alamat:** Geulumpang Sulu Barat, Kec. Dewantara, Kab. Aceh Utara, Aceh

---

## 📝 Lisensi

Hak Cipta © 2026 Dapur Mulia. Proyek ini dibuat untuk memenuhi tugas Semester VI E-Commerce Universitas Malikussaleh.

---

## 🙏 Credits

- **Universitas Malikussaleh** - Program Studi [Nama Prodi]
- **Dosen Pengampu** - [Nama Dosen]
- **Developer** - Tim Dapur Mulia

---

<div align="center">
  <h3>❤️ Dapur Mulia - Manisnya Tradisi, Modernnya Penyajian ❤️</h3>
</div>

