import { PrismaClient } from '@prisma/client';
import * as bycrypt from 'bcrypt';

const prisma = new PrismaClient();

const sports = ['Football', 'Basketball', 'Tennis', 'Baseball', 'Soccer'];
const optionsOds = [1.6, 1.2, 1.3, 2.1];

const numberOfAdminUsers = 3;
const numberOfUsers = 6;

async function main() {
  for (let i = 0; i < numberOfAdminUsers; i++) {
    await prisma.user.create({
      data: {
        role: 'admin',
        firstName: `Admin${i}`,
        lastName: `Admin${i}`,
        email: `admin${i}@example.com`,
        username: `admin${i}`,
        password: await bycrypt.hash(`admin${i}`, 10),
        birthDate: new Date(),
      },
    });
  }

  for (let i = 0; i < numberOfUsers; i++) {
    await prisma.user.create({
      data: {
        role: 'user',
        firstName: `User${i}`,
        lastName: `User${i}`,
        email: `user${i}@example.com`,
        username: `user${i}`,
        password: await bycrypt.hash(`user${i}`, 10),
        birthDate: new Date(),
      },
    });
  }
  const createEventsAndBets = await Promise.all(
    sports.map(async (sport, index) => {
      const createEvent = await prisma.event.create({
        data: {
          name: `Event ${index + 1}`,
          sport: sport,
          description: `Description of Event ${index + 1}`,
          bets: {
            createMany: {
              data: optionsOds.map((optionOd, index) => {
                return {
                  betOption: index + 1,
                  name: `Option ${index + 1}`,
                  odd: optionOd,
                };
              }),
            },
          },
        },
        include: {
          bets: true,
        },
      });

      return createEvent;
    }),
  );
  return createEventsAndBets;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
