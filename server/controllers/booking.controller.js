const prisma = require('../prisma/client');
const { sendBookingConfirmation } = require('../utils/mailer');

exports.bookEvent = async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.body;

  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableTickets < 1) {
      return res.status(400).json({ message: 'No tickets available' });
    }

    const existingBooking = await prisma.booking.findFirst({
      where: { userId, eventId }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this event' });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        eventId,
        price: event?.price
      }
    });

    await prisma.event.update({
      where: { id: eventId },
      data: { availableTickets: event.availableTickets - 1 }
    });

    await sendBookingConfirmation(req.user.email, event.title);

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error('Booking Error:', err);
    res.status(500).json({ message: 'Failed to book event' });
  }
};

exports.getMyBookings = async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  try {
    const [bookings, totalBookings] = await Promise.all([
      prisma.booking.findMany({
        where: { userId },
        include: {
          event: {
            include: {
              vendor: {
                select: {
                  vendorName: true
                }
              }
            }
          }
        },
        orderBy: {
          bookingDate: 'desc'
        },
        skip: skip,
        take: limit
      }),
      prisma.booking.count({
        where: { userId }
      })
    ]);

    const totalPages = Math.ceil(totalBookings / limit);

    res.json({
      bookings,
      currentPage: page,
      totalPages: totalPages,
      totalBookings: totalBookings
    });
  } catch (err) {
    console.error('Get My Bookings Error:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

  exports.cancelBooking = async (req, res) => {
    const userId = req.user.id;
    const { bookingId } = req.body;
  
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { event: true }
      });
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      if (booking.userId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to cancel this booking' });
      }
  
      await prisma.event.update({
        where: { id: booking.eventId },
        data: { availableTickets: booking.event.availableTickets + 1 }
      });
  
      await prisma.booking.delete({
        where: { id: bookingId }
      });
  
      res.status(200).json({ message: 'Booking cancelled successfully' });
  
    } catch (err) {
      console.error('Cancel Booking Error:', err);
      res.status(500).json({ message: 'Failed to cancel booking' });
    }
  };
  
