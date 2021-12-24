const {PrismaClient} = require("./prisma/generated/prisma-client-js");

const prisma = new PrismaClient()

async function createRoom() {
    return  prisma.room.create({
        data: {
            name: 'pirojok',
            size: "SINGLE"
        }
    });
}

async function createUser() {
    return prisma.user.create({
        data: {
            name: 'pirojok',
        }
    });
}

async function createGuest() {
    return prisma.guest.create({
        data: {
            name: 'pirojok',
        }
    });
}


async function clean() {
    await prisma.availabilities.deleteMany();
    await prisma.room.deleteMany();
    await prisma.guest.deleteMany();
}

describe('hotels', () => {
    beforeEach(async () => {
        await clean();
    });

    afterEach(async () => {
        await clean();
        await prisma.$disconnect();
    });


    describe('room list', () => {
        it('allows adding rooms', async function () {
            const rooms = await prisma.room.findMany();
            expect(rooms.length).toBe(0);
            await createRoom();

            expect((await prisma.room.findMany()).length).toBe(1);
        });
    });

    describe('availabilities', () => {
        it('allows adding rooms', async function () {
            const rooms = await prisma.room.findMany();
            expect(rooms.length).toBe(0);
            const room = await createRoom();
            const user = await createUser();
            const guest = await createGuest();

            await prisma.availabilities.create({
                data: {
                    guestId: guest.id,
                    roomId: room.id,
                    userId: user.id,
                    startDate: new Date('2021-12-12'),
                    endDate: new Date('2021-12-18'),
                }
            });

            await prisma.availabilities.create({
                data: {
                    guestId: guest.id,
                    roomId: room.id,
                    userId: user.id,
                    startDate: new Date('2021-12-10'),
                    endDate: new Date('2021-12-15'),
                }
            });


            expect((await prisma.availabilities.findMany()).length).toBe(2);
        });
    });
});