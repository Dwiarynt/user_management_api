```markdown
# User Management API

REST API untuk manajemen user dengan fitur lengkap:

- Register & Login (JWT)
- CRUD user (protected route)
- Upload avatar ke Cloudinary
- Validasi email & password
- Menyimpan waktu `updated_at` setiap kali profil diperbarui
- Keamanan server dengan CORS & Helmet

---

## **Teknologi**

- Node.js & Express.js
- PostgreSQL
- Cloudinary (untuk upload avatar)
- JWT (JSON Web Token) untuk autentikasi
- Bcrypt.js untuk hashing password
- Multer & Streamifier untuk upload file
- Helmet & CORS untuk keamanan server

---

## **Struktur Project**

```

user_management_api/
│
├── index.js
├── .env
├── package.json
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   └── models/
│       └── userModel.js
├── docs/
│   ├── UserManagementAPI.postman_collection.json
│   └── screenshot_endpoint.png

````

---

## **Setup Project (Local)**

1. Clone repository:

```bash
git clone https://github.com/username/user_management_api.git
cd user_management_api
````

2. Install dependencies:

```bash
npm install
```

3. Buat file `.env` di root project:

```
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=supersecretkey123
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

4. Jalankan server:

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000/`

---

## **Endpoints**

### **Auth**

| Method | Endpoint           | Body (JSON)                   | Description               |
| ------ | ------------------ | ----------------------------- | ------------------------- |
| POST   | /api/auth/register | { username, email, password } | Register user baru        |
| POST   | /api/auth/login    | { email, password }           | Login dan dapat token JWT |

### **User (Protected)**

> Semua endpoint di bawah memerlukan **header Authorization**:
>
> ```
> Authorization: Bearer <token>
> ```

| Method | Endpoint          | Body / Form-data              | Description                      |
| ------ | ----------------- | ----------------------------- | -------------------------------- |
| GET    | /api/users/me     | -                             | Ambil data profil user           |
| PUT    | /api/users/me     | { username, email, password } | Update profil user               |
| DELETE | /api/users/me     | -                             | Hapus user                       |
| POST   | /api/users/avatar | file (form-data)              | Upload foto profil ke Cloudinary |

---

## **Validasi Input**

* Email harus format valid (`example@domain.com`)
* Password minimal 6 karakter

---

## **Postman Collection**

* File Postman collection tersedia di: `docs/UserManagementAPI.postman_collection.json`
* Bisa di-import ke Postman untuk langsung test semua endpoint

---

## **Screenshot Dokumentasi**

* Semua screenshot endpoint disimpan di folder `docs/`
* Contoh: `docs/register.png`, `docs/login.png`, `docs/get_profile.png`

---

## **Tips Keamanan**

* Jangan commit file `.env` ke GitHub
* Token JWT harus disimpan secara aman (misal Postman environment variable)
* Gunakan HTTPS di production

---
