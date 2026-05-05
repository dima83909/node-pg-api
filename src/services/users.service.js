const prisma = require('../db');

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