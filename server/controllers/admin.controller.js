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
      where: {
        NOT: {
          role: 'ADMIN'
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        vendor: {
          select: {
            vendorName: true,
            _count: {
              select: {
                events: true
              }
            }
          }
        },


        _count: {
          select: {
            bookings: true
          }
        }
      }
    });

    console.log(users)

    const totalUsers = await prisma.user.count({
      where: {
        NOT: {
          role: 'ADMIN'
        }
      }
    });
    const totalPages = Math.ceil(totalUsers / limit);

    const formattedUsers = users.map(user => {
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      if (user.role === 'VENDOR' && user.vendor) {
        userData.vendorName = user.vendor.vendorName;
        userData.eventsCount = user.vendor._count.events;
      } else if (user.role === 'USER') {
        userData.bookingsCount = user._count.bookings;
      }
      return userData;
    });

    res.json({
      users: formattedUsers,
      currentPage: page,
      totalPages,
      totalUsers,
    });
  } catch (err) {
    console.error('Admin Get Users Error:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

exports.getDashboardMetrics = async (req, res) => {
  try {
    const [
      totalUsersCount,
      activeEventsCount,
      totalRevenueResult,
      pendingEventsCount
    ] = await Promise.all([
      prisma.user.count({
        where: {
          NOT: {
            role: 'ADMIN'
          }
        }
      }),
      prisma.event.count({
        where: {
          status: 'APPROVED'
        }
      }),
      prisma.booking.aggregate({
        _sum: {
          price: true,
        },
      }),
      prisma.event.count({
        where: {
          status: 'PENDING'
        }
      })
    ]);

    const totalRevenue = totalRevenueResult._sum.price || 0;

    res.json({
      totalUsers: totalUsersCount,
      totalEvents: activeEventsCount,
      totalRevenue: totalRevenue,
      pendingApprovals: pendingEventsCount,
    });

  } catch (err) {
    console.error('Admin Get Dashboard Metrics Error:', err);
    res.status(500).json({ message: 'Failed to load dashboard metrics' });
  }
};