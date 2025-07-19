const prisma = require('../prisma/client');

exports.getAllEventsAdmin = async (req, res) => {
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
    console.error('Admin Get Events Error:', err);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

exports.updateEventStatus = async (req, res) => {
    const eventId = parseInt(req.params.id);
    const { status } = req.body;
  
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
  
    try {
      const updated = await prisma.event.update({
        where: { id: eventId },
        data: { status }
      });
  
      res.json({ message: `Event ${status.toLowerCase()} successfully`, event: updated });
    } catch (err) {
      console.error('Update Event Status Error:', err);
      res.status(500).json({ message: 'Failed to update event status' });
    }
  };

  
exports.getAllUsers = async (req, res) => {
try {
    const users = await prisma.user.findMany({
    orderBy: { role: 'asc' },
    include: {
        vendor: true,
        bookings: {
        include: { event: true }
        }
    }
    });

    res.json(users);
} catch (err) {
    console.error('Admin Get Users Error:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
}
};
  
  
