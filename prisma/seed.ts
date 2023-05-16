import { PrismaClient } from '@prisma/client';
import { async } from 'rxjs';

const prisma = new PrismaClient();

const sports = ['Football', 'Basketball', 'Tennis', 'Baseball', 'Soccer'];

const optionsOds = [1.6, 1.2, 1.3, 2.1];

async function main() {
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
  console.log(createEventsAndBets);
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
