# 📊 Dashboard Project

Monorepo sederhana dengan folder `client/` (frontend) dan `server/` (backend).  
Dibangun menggunakan **pnpm** sebagai package manager.

---

## 🚀 Persyaratan

- [Node.js](https://nodejs.org/) (disarankan versi LTS)
- [pnpm](https://pnpm.io/) (project ini pakai `pnpm@10.13.1`)

Cek instalasi:

```bash
node -v
pnpm -v
```

---

## 📂 Struktur Folder

```
root/
├─ client/   # Frontend
│   └─ package.json
├─ server/   # Backend
│   └─ package.json
└─ package.json  # script root
```

---

## ⚙️ Instalasi

### Install dependencies untuk client & server:
```bash
pnpm run install:all
```

Atau bisa manual:
```bash
pnpm run install:client
pnpm run install:server
```

---

## 🖥️ Development

Jalankan **client** & **server** bersamaan:
```bash
pnpm dev
```

Jalankan **hanya client**:
```bash
pnpm dev:client
```

Jalankan **hanya server**:
```bash
pnpm dev:server
```

---

## 📦 Build & Start

Build client & server:
```bash
pnpm build
```

Start server hasil build:
```bash
pnpm start
```

---

## 🧹 Clean Build (Opsional)

Untuk membersihkan folder build lama:
```bash
pnpm clean
```

---

## 🛠️ Script yang tersedia

| Script             | Deskripsi                                |
|--------------------|------------------------------------------|
| `dev`              | Jalankan client + server secara bersamaan |
| `dev:client`       | Jalankan client saja                     |
| `dev:server`       | Jalankan server saja                     |
| `build`            | Build client dan server                  |
| `start`            | Start server hasil build                 |
| `install:all`      | Install dependency client & server       |
| `install:client`   | Install dependency hanya untuk client     |
| `install:server`   | Install dependency hanya untuk server     |
| `clean` (opsional) | Hapus folder build `dist`                |
