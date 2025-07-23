const prisma = require('../prisma/client');

exports.createEvent = async (req, res) => {
  const vendorUserId = req.user.id;

  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: vendorUserId }
    });

    if (!vendor) return res.status(400).json({ message: 'Vendor profile not found' });

    const {
      title,
      description,
      date,
      location,
      category,
      availableTickets
    } = req.body;

    const event = await prisma.event.create({
      data: {
        vendorId: vendor.id,
        title,
        description,
        date: new Date(date),
        location,
        category,
        availableTickets: Number(availableTickets)
      }
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVendorEvents = async (req, res) => {
  try {
    const userId = req.user.id;

    const vendor = await prisma.vendor.findUnique({
      where: { userId }
    });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const events = await prisma.event.findMany({
      where: { vendorId: vendor.id },
      orderBy: { date: 'asc' }
    });

    res.json(events);
  } catch (err) {
    console.error('Get Vendor Events Error:', err);
    res.status(500).json({ message: 'Failed to fetch vendor events' });
  }
};

exports.updateEvent = async (req, res) => {
  const userId = req.user.id;
  const eventId = parseInt(req.params.id);

  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId }
    });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event || event.vendorId !== vendor.id) {
      return res.status(403).json({ message: 'Not allowed to edit this event' });
    }

    const updated = await prisma.event.update({
      where: { id: eventId },
      data: {
        title: req.body.title,
        description: req.body.description,
        date: new Date(req.body.date),
        location: req.body.location,
        category: req.body.category,
        availableTickets: req.body.availableTickets
      }
    });

    res.json(updated);
  } catch (err) {
    console.error('Update Event Error:', err);
    res.status(500).json({ message: 'Failed to update event' });
  }
};

exports.deleteEvent = async (req, res) => {
  const userId = req.user.id;
  const eventId = parseInt(req.params.id);

  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId }
    });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event || event.vendorId !== vendor.id) {
      return res.status(403).json({ message: 'Not allowed to delete this event' });
    }

    await prisma.event.delete({
      where: { id: eventId }
    });

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Delete Event Error:', err);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};

exports.getVendorDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const vendor = await prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const [totalEvents, totalBookings, totalRevenue] = await Promise.all([
      prisma.event.count({
        where: { vendorId: vendor.id },
      }),
      prisma.booking.count({
        where: {
          event: {
            vendorId: vendor.id,
          },
        },
      }),
      prisma.booking.aggregate({
        _sum: {
          price: true,
        },
        where: {
          event: {
            vendorId: vendor.id,
          },
        },
      }),
    ]);

    res.json({
      totalEvents,
      totalBookings,
      totalRevenue: totalRevenue._sum.price || 0,
    });
  } catch (err) {
    console.error('Vendor Dashboard Error:', err);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};




