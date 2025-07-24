

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function removeDuplicateEvents() {
  try {
    const duplicates = await prisma.$queryRaw`
      SELECT title, COUNT(*) as count
      FROM "Event"
      GROUP BY title
      HAVING COUNT(*) > 1
    `;

    for (const dup of duplicates) {
      const { title } = dup;

      const events = await prisma.event.findMany({
        where: { title },
        orderBy: { createdAt: 'desc' },
      });
      const toDelete = events.slice(1);

      for (const ev of toDelete) {
        await prisma.event.delete({
          where: { id: ev.id },
        });
        console.log(`Deleted duplicate event: ${ev.id} (${ev.title})`);
      }
    }

    console.log('Duplicate cleanup complete.');
  } catch (err) {
    console.error( err);
  } finally {
    await prisma.$disconnect();
  }
}

removeDuplicateEvents();
