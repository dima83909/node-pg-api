const prisma = require('../db');

module.exports = {
  getAll: async (userId) => {
    return prisma.post.findMany({
      where: { userId: Number(userId) },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });
  },

  getOne: async (id, userId) => {
    return prisma.post.findFirst({
      where: { id: Number(id), userId: Number(userId) },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });
  },

  create: async ({ title, body }, userId) => {
    return prisma.post.create({
      data: { title, body, userId: Number(userId) },
    });
  },

  update: async (id, { title, body }, userId) => {
    const post = await prisma.post.findFirst({
      where: { id: Number(id), userId: Number(userId) },
    });
    if (!post) return null;
    try {
      return await prisma.post.update({
        where: { id: Number(id) },
        data: { title, body },
      });
    } catch (err) {
      if (err.code === 'P2025') return null;
      throw err;
    }
  },

  remove: async (id, userId) => {
    const post = await prisma.post.findFirst({
      where: { id: Number(id), userId: Number(userId) },
    });
    if (!post) return null;
    try {
      await prisma.post.delete({
        where: { id: Number(id) },
      });
      return true;
    } catch (err) {
      if (err.code === 'P2025') return null;
      throw err;
    }
  },
};