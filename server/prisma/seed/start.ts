import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  console.log('💫 seed executing ...');
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      name: 'john',
      email: 'john@gmail.com',
      password: 'password',
    },
  });
  console.log('💫 seed finished.');
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
