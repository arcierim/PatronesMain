import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { username: "alice", password: "1234" },
      { username: "bob", password: "abcd" },
      { username: "charlie", password: "pass" },
      { username: "diana", password: "4321" },
      { username: "esteban", password: "demo" },
    ],
  });
  console.log("Usuarios insertados ✅");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
