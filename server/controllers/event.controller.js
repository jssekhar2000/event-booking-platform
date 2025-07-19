const prisma = require('../prisma/client');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
      include: {
        vendor: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        }
      }
    });

    res.json(events);
  } catch (err) {
    console.error('Get Events Error:', err);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};
