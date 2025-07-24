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
      shortDescription,
      longDescription,
      date,
      location,
      category,
      totalTickets,
      availableTickets,
      price,
      originalPrice,
      imageUrl,
      mapUrl,
      amenities = [],
      tags = [],
      restrictions = {
        age: 'All Ages',
        capacity: `${availableTickets} attendees`,
        dressCode: 'Casual'
      }
    } = req.body;

    const event = await prisma.event.create({
      data: {
        vendorId: vendor.id,
        title,
        shortDescription,
        longDescription,
        date: new Date(date),
        location,
        category,
        totalTickets: Number(totalTickets),
        availableTickets: Number(availableTickets),
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        imageUrl,
        mapUrl,
        amenities,
        tags,
        restrictions: typeof restrictions === 'string' ? restrictions : JSON.stringify(restrictions),
        status: 'PENDING',
      }
    });

    res.status(201).json(event);
  } catch (err) {
    console.error('Create Event Error:', err);
    res.status(500).json({ error: err.message || 'Failed to create event' });
  }
};


exports.getVendorEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const { search = '', status, page = 1, limit = 6 } = req.query;

    const vendor = await prisma.vendor.findUnique({
      where: { userId }
    });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const filters = {
      vendorId: vendor.id,
      ...(status && { status }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { shortDescription: { contains: search, mode: 'insensitive' } },
          { longDescription: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where: filters,
        orderBy: [
          { createdAt: 'desc' },
          { id: 'desc' }
        ],
        skip,
        take
      }),
      prisma.event.count({
        where: filters
      })
    ]);

    res.json({
      events,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.error(err);
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

    const {
      title,
      shortDescription,
      longDescription,
      date,
      location,
      category,
      totalTickets,
      availableTickets,
      price,
      originalPrice,
      imageUrl,
      mapUrl,
      amenities = [],
      tags = [],
      restrictions = {
        age: 'All Ages',
        capacity: `${availableTickets} attendees`,
        dressCode: 'Casual'
      }
    } = req.body;

    const updated = await prisma.event.update({
      where: { id: eventId },
      data: {
        title,
        shortDescription,
        longDescription,
        date: new Date(date),
        location,
        category,
        totalTickets: Number(totalTickets),
        availableTickets: Number(availableTickets),
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        imageUrl,
        mapUrl,
        amenities,
        tags,
        restrictions: typeof restrictions === 'string' ? restrictions : JSON.stringify(restrictions),
        updatedAt: new Date()
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

    const now = new Date();

    const [activeEvents, totalBookings, totalRevenue] = await Promise.all([
      prisma.event.count({
        where: {
          vendorId: vendor.id,
          date: {
            gte: now,
          },
        },
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
      activeEvents,
      totalBookings,
      totalRevenue: totalRevenue._sum.price || 0,
    });
  } catch (err) {
    console.error('Vendor Dashboard Error:', err);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};




