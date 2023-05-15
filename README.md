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

`npx prisma init` -> Inicializar prisma
`npx prisma help` -> Help of prisma
`npx prisma migrate dev` -> Generate the migrations
`npx prisma generate` -> Generate clases to use in the app
`npx prisma format` -> Format prisma schema file
`npx prisma migrate dev --name init` -> First migration
`npx prisma migrate dev --name initial-migration --create-only` -> [Add prisma to a project](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/add-prisma-migrate-to-a-project)
`npx prisma migrate resolve --applied {nombre_migración}` marcar migración como aplicada a la base de datos
`npx prisma db pull --schema {filepath}`
