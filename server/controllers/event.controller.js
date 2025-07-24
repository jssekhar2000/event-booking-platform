const prisma = require('../prisma/client');

exports.getAllEvents = async (req, res) => {
  const { 
    category, 
    categories, 
    location, 
    locations, 
    search, 
    dateRange,
    sortBy = 'date',
    page = 1, 
    limit = 6 
  } = req.query;

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

    const getDateRangeFilter = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      switch (dateRange) {
        case 'today':
          const endOfToday = new Date(today);
          endOfToday.setDate(endOfToday.getDate() + 1);
          return {
            date: {
              gte: today,
              lt: endOfToday
            }
          };
          
        case 'this-week':
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 7);
          return {
            date: {
              gte: startOfWeek,
              lt: endOfWeek
            }
          };
          
        case 'this-month':
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
          return {
            date: {
              gte: startOfMonth,
              lt: endOfMonth
            }
          };
          
        case 'next-month':
          const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
          const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 1);
          return {
            date: {
              gte: startOfNextMonth,
              lt: endOfNextMonth
            }
          };
          
        case 'all':
        default:
          return {};
      }
    };

    const getSortOptions = () => {
      switch (sortBy) {
        case 'date':
          return { date: 'asc' };
        case 'price-low':
          return { price: 'asc' };
        case 'price-high':
          return { price: 'desc' };
        case 'popularity':
          return [
            { totalTickets: { sort: 'desc', nulls: 'last' } },
            { date: 'asc' }
          ];
        case 'rating':
          return { date: 'asc' };
        default:
          return { date: 'asc' };
      }
    };

    let whereClause = {};

    if (categoryFilter && categoryFilter.length > 0) {
      whereClause.category = {
        in: categoryFilter,
        mode: 'insensitive'
      };
    }

    if (locationFilter && locationFilter.length > 0) {
      if (locationFilter.length === 1) {
        whereClause.location = {
          contains: locationFilter[0],
          mode: 'insensitive'
        };
      } else {
        whereClause.OR = locationFilter.map(loc => ({
          location: { contains: loc, mode: 'insensitive' }
        }));
      }
    }

    const dateFilter = getDateRangeFilter();
    if (dateFilter.date) {
      whereClause = { ...whereClause, ...dateFilter };
    }

    if (search) {
      const searchConditions = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } }
      ];

      if (whereClause.OR) {
        whereClause.AND = [
          { OR: whereClause.OR },
          { OR: searchConditions }
        ];
        delete whereClause.OR;
      } else {
        whereClause.OR = searchConditions;
      }
    }

    const sortOptions = getSortOptions();

    const [events, totalCount] = await Promise.all([
      prisma.event.findMany({
        where: whereClause,
        orderBy: Array.isArray(sortOptions) ? sortOptions : [sortOptions],
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
  
