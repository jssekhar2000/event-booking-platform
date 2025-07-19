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
