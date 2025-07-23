import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

const getHosts = async (name) => {
  const where = name
    ? { name: { contains: name, mode: "insensitive" } }
    : {};

  const hosts = await prisma.host.findMany({ where });
  return hosts;
};

export default getHosts;
