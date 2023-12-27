# Bun: Simple API

## Pengantar

`Bun.js` adalah lingkungan runtime JavaScript baru yang mirip dengan Node.js dan Deno, tetapi lebih cepat dan lebih mandiri. Ini ditulis dalam Zig, bahasa rendah tingkat tinggi yang cepat, dan menggunakan Mesin `JavaScriptCore`, yang mendukung browser Webkit seperti Safari. Penggabungan Zig dan mesin `JavaScriptCore` telah menjadikan Bun salah satu runtime JavaScript tercepat.

## Instalasi

Lakukan instalasi dahulu jika belum ada, buka terminal (`macOS`, `Linux`, or `Windows Subsystem for Linux (WSL)`):

```bash
curl -fsSL https://bun.sh/install | bash
```

This project was created using `bun init` in bun v1.0.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Dependensi

Beberapa dependesi yang digunakan:

- `Elysia`: sebuah kerangka kerja web untuk Bun yang menyederhanakan penggunaan Bun, mirip dengan peran yang dimainkan oleh Express untuk Node.js.
- `Prisma`: sebuah pemetaan objek-relasional (ORM) untuk JavaScript dan TypeScript.
- `Dotenv`: paket NPM yang memuat variabel lingkungan dari file `.env `ke dalam` process.env`. Ini umumnya digunakan untuk mengelola konfigurasi lingkungan di aplikasi.
- `PG`: driver natif untuk `PostgreSQL`. Ini memungkinkan aplikasi JavaScript untuk terhubung dan berinteraksi dengan database `PostgreSQL`.
- `jsonwebtoken@8.5.1`: Sebuah paket yang mengimplementasikan standar JWT (JSON Web Token) dalam versi 8.5.1. JWT sering digunakan untuk otentikasi dan pertukaran informasi yang aman antara pihak yang terlibat.

Untuk instalasi silahkan ketikkan di terminal berikut:

```bash
bun install
```

## Migrasi Database

Buat database dahulu sesuaikan dengan yang ada di `.env`. Jika belum ada silahkan buat (duplicate) dari `.env.example`.

Contoh:

```sql
CREATE DATABASE recipe_app;
```

Kemudian buka terminal ketikkan berikut:

```bash
bunx prisma init --datasource-provider postgresql
```

Setelah itu akan terbuat sebuah folder dengan nama **prisma**. Kemudian buka file `schema.prisma` di dalam folder prisma. Kemudian tambahkan ini:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  recipies  Recipe[]

  comments  Comment[]
}

model Recipe {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id])
  userId    Int

  comments  Comment[]
}

model Comment {
  id        Int      @id @default(autoincrement())
  body      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id])
  userId    Int

  recipe   Recipe  @relation(fields: [recipeId], references: [id])
  recipeId Int
}
```

Terakhir lakukan ini:

```bash
bunx prisma migrate dev --name init
```

## Menjalankan Program

To run:

```bash
bun run index.ts
```
