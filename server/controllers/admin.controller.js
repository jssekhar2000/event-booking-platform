const prisma = require('../prisma/client');

exports.getPendingEventsAdmin = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  try {
    const events = await prisma.event.findMany({
      where: { status: 'PENDING' },
      skip,
      take: limit,
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        title: true,
        shortDescription: true,
        date: true,
        location: true,
        imageUrl: true,
        category: true,
        status: true,
        vendor: {
          select: {
            vendorName: true,
            user: {
              select: { name: true, email: true }
            }
          }
        }
      }
    });

    const totalEvents = await prisma.event.count({
      where: { status: 'PENDING' }
    });
    const totalPages = Math.ceil(totalEvents / limit);

    res.json({
      events,
      currentPage: page,
      totalPages,
      totalEvents,
    });
  } catch (err) {
    console.error('Admin Get Pending Events Error:', err);
    res.status(500).json({ message: 'Failed to fetch pending events' });
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

exports.getAllUsersAdmin = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  try {
    const users = await prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        vendor: {
          select: {
            id: true,
            vendorName: true,
            events: {
              select: { id: true, title: true }
            }
          }
        },
        bookings: {
          select: {
            id: true,
            event: {
              select: { id: true, title: true }
            }
          }
        }
      }
    });

    const totalUsers = await prisma.user.count();
    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      users,
      currentPage: page,
      totalPages,
      totalUsers,
    });
  } catch (err) {
    console.error('Admin Get Users Error:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};