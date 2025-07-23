import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // initialized once and reused, other versions failed the tests

const getUsers = async (username) => {
  const where = username
    ? { username: { contains: username, mode: "insensitive" } }
    : {};

  const users = await prisma.user.findMany({ where });
  return users;
};

export default getUsers;
