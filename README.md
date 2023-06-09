# GreenRun - Backend Developer Test

# Deploy on AWS

- [API](http://ec2-34-207-193-237.compute-1.amazonaws.com:8085/api/v1/docs)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
$ docker compose up -d database
$ npx prisma migrate reset
$ pnpm run start
```
## Initial users
Reference of initial users and events in prisma/seed.ts
- Admin: usernames: admin{n}, password: admin{n} -> n [0,3]
- User: usernames: user{n}, password: user{n} -> n [0,5]

## Prisma

- `npx prisma init` -> Init prisma
- `npx prisma help` -> Help of prisma
- `npx prisma migrate dev` -> Generate the migrations
- `npx prisma generate` -> Generate clases to use in the app
- `npx prisma format` -> Format prisma schema file
- `npx prisma migrate dev --name init` -> First migration
- `npx prisma migrate dev --name initial-migration --create-only` -> [Add prisma to a project](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/add-prisma-migrate-to-a-project)
- `npx prisma migrate resolve --applied {nombre_migración}` -> Mark the migration as applied
- `npx prisma db pull --schema {filepath}`
- `npx prisma db seed` -> Run Prisma seeder
- `npx prisma migrate reset` -> Reset the database

## Branch naming

- Fix → Prefix FX
- Feature → Prefix FE
- Hot-fix → Prefix HF

Estructure: [Prefix][Day(dd)][Month(MM]Mes][Year(yy)]-[Basic description]

Examples: 

- FX190423-login → Fix 19 of April 2023 on login
- FE010123-bets → Feature 01 of January 2023 on bets
- HF311223-user → Hot Fix 31 of December on user
