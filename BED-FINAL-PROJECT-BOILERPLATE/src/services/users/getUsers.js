import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUsers = async (username) => {
  if (!username) {
    throw Object.assign(new Error("Missing query parameter: username"), {
      statusCode: 400,
    });
  }

  const users = await prisma.user.findMany({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });

  return users;
};

export default getUsers;
