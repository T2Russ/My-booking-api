const prisma = new PrismaClient();

const getUsers = async (username) => {
  const where = username
    ? { username: { contains: username, mode: "insensitive" } }
    : {};

  const users = await prisma.user.findMany({ where });
  return users;
};
