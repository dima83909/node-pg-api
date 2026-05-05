const prisma = require('../db');
const bcrypt = require('bcrypt');

module.exports = {
  getAll: async () => {
    return prisma.user.findMany({
      omit: { password: true }, // ніколи не повертаємо пароль
    });
  },

  getOne: async (id) => {
    return prisma.user.findUnique({
      where: { id: Number(id) },
      omit: { password: true },
    });
  },

  create: async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      return await prisma.user.create({
        data: { name, email, password: hashedPassword },
        omit: { password: true },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        const error = new Error('Email already in use');
        error.status = 409;
        throw error;
      }
      throw err;
    }
  },

  update: async (id, { name, email }) => {
    try {
      return await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
        omit: { password: true },
      });
    } catch (err) {
      if (err.code === 'P2025') return null;
      throw err;
    }
  },

  remove: async (id) => {
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      return true;
    } catch (err) {
      if (err.code === 'P2025') return null;
      throw err;
    }
  },
};