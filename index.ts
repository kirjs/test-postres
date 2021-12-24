// const {PrismaClient} = require("./prisma/generated/prisma-client-js");
//
// const prisma = new PrismaClient();
//
// async function main() {
//     console.log(Object.keys(prisma));
//     await prisma.user.create({
//         data: {
//             name: 'pirojok',
//         }
//     })
//     const users = await prisma.user.findMany();
//     console.log(users);
//     // ... you will write your Prisma Client queries here
// }
//
// main()
//     .catch((e) => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })
