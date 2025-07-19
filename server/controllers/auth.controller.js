const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) return res.status(400).json({ message: 'User already exists' });
  
      const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashed, role },
      });
  
      const token = generateToken(user);
      res.status(201).json({ token, user });
    } catch (err) {
        console.error(err);
      res.status(500).json({ message: 'Registration failed' });
    }
  };

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.createVendorProfile = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const existing = await prisma.vendor.findUnique({ where: { userId } });
      if (existing) return res.status(400).json({ message: 'Vendor profile already exists' });
  
      const vendor = await prisma.vendor.create({
        data: {
          userId,
          vendorName: "Sekhar Events",
          description: "Event organizer in Hyderabad"
        }
      });
  
      res.status(201).json(vendor);
    } catch (err) {
      console.error('Vendor Profile Error:', err);
      res.status(500).json({ message: 'Could not create vendor profile', error: err.message });
    }
  };
