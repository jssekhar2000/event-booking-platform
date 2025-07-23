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
  
    try {
      const bookings = await prisma.booking.findMany({
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
        }
      });

      res.json(bookings);
    } catch (err) {
      console.error('Get My Bookings Error:', err);
      res.status(500).json({ message: 'Failed to fetch bookings' });
    }
  };
  
