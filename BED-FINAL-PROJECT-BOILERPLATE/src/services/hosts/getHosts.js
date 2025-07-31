import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getHosts = async (name) => {
  if (!name) {
    throw Object.assign(new Error("Missing query parameter: name"), {
      statusCode: 400,
    });
  }

  const hosts = await prisma.host.findMany({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  return hosts;
};

export default getHosts;
