import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    throw Object.assign(new Error("Username already exists"), {
      statusCode: 400,
    });
  }

  const newUser = {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
  };

  const user = await prisma.user.create({ data: newUser });

  return user;
};

export default createUser;

