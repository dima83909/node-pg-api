const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../db');

module.exports = {
  register: async ({ name, email, password }) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      const error = new Error('Email already in use');
      error.status = 409;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      omit: { password: true },
    });
    return user;
  },

  login: async ({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );
    return { token };
  },
};
