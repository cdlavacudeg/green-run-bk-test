# GreenRun - Backend Developer Test

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

# Prisma

- `npx prisma init` -> Init prisma
- `npx prisma help` -> Help of prisma
- `npx prisma migrate dev` -> Generate the migrations
- `npx prisma generate` -> Generate clases to use in the app
- `npx prisma format` -> Format prisma schema file
- `npx prisma migrate dev --name init` -> First migration
- `npx prisma migrate dev --name initial-migration --create-only` -> [Add prisma to a project](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/add-prisma-migrate-to-a-project)
- `npx prisma migrate resolve --applied {nombre_migración}` -> Mark the migration as applied
- `npx prisma db pull --schema {filepath}`

# Branch naming

Fix → Prefix FX
Feature → Prefix FE
Hot-fix → Prefix HF

estructura [Prefix][Day(dd)][Month(MM]Mes][Year(yy)]-[Basic description]
EJ: 
FX190423-login → Fix 19 of April 2023 on login
FE010123-bets → Feature 01 of January 2023 on bets
HF311223-user → Hot Fix 31 of December on user
