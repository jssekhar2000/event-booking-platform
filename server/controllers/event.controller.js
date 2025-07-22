const prisma = require('../prisma/client');

exports.getAllEvents = async (req, res) => {
  const { category, location, search } = req.query;

  try {
    const events = await prisma.event.findMany({
      where: {
        ...(category && { category: { equals: category, mode: 'insensitive' } }),
        ...(location && { location: { contains: location, mode: 'insensitive' } }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ]
        }),
      },
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


exports.getEventById = async (req, res) => {
    const eventId = parseInt(req.params.id);
  
    try {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
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
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.json(event);
    } catch (err) {
      console.error('Get Event By ID Error:', err);
      res.status(500).json({ message: 'Failed to fetch event details' });
    }
  };
  
