const prisma = require('../prisma/client');

exports.getAllEvents = async (req, res) => {
  const { category, categories, location, locations, search, page = 1, limit = 6 } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const pageLimit = parseInt(limit);

  try {
    const categoryFilter = categories 
      ? categories.split(',').filter(Boolean)
      : category 
      ? [category] 
      : null;

    const locationFilter = locations 
      ? locations.split(',').filter(Boolean)
      : location 
      ? [location] 
      : null;

    const whereClause = {
      ...(categoryFilter && categoryFilter.length > 0 && {
        category: {
          in: categoryFilter,
          mode: 'insensitive'
        }
      }),
      ...(locationFilter && locationFilter.length > 0 && {
        location: {
          in: locationFilter.map(loc => ({ contains: loc, mode: 'insensitive' }))
        }
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { shortDescription: { contains: search, mode: 'insensitive' } }
        ]
      }),
    };

    if (locationFilter && locationFilter.length > 0) {
      whereClause.OR = whereClause.OR || [];
      whereClause.OR.push(
        ...locationFilter.map(loc => ({
          location: { contains: loc, mode: 'insensitive' }
        }))
      );
    }

    const [events, totalCount] = await Promise.all([
      prisma.event.findMany({
        where: whereClause,
        orderBy: { date: 'desc' },
        skip,
        take: pageLimit,
        select: {
          id: true,
          title: true,
          shortDescription: true,
          date: true,
          category: true,
          location: true,
          imageUrl: true,
          price: true,
          totalTickets: true,
          availableTickets: true,
          vendor: {
            select: {
              vendorName: true
            }
          }
        }
      }),
      prisma.event.count({
        where: whereClause
      })
    ]);

    const totalPages = Math.ceil(totalCount / pageLimit);

    res.json({
      events,
      totalEvents: totalCount,
      totalPages,
      currentPage: parseInt(page),
      eventsPerPage: pageLimit
    });
  } catch (err) {
    console.error(err);
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
  
