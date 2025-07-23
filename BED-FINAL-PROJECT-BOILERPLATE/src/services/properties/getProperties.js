import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();

const getProperties = async (filters) => {
  const where = {};

  if (filters.location) {
    where.location = { contains: filters.location, mode: "insensitive" };
  }

  if (filters.pricePerNight) {
    where.pricePerNight = parseFloat(filters.pricePerNight);
  }

  const properties = await prisma.property.findMany({ where });
  return properties;
};

export default getProperties;
