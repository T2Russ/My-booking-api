import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const existing = await prisma.host.findUnique({ where: { username } });
  if (existing) {
    throw Object.assign(new Error("Username already exists"), {
      statusCode: 400,
    });
  }

  const newHost = {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  };

  const host = await prisma.host.create({ data: newHost });

  return host;
};

export default createHost;
