import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProperties = async (location, pricePerNight) => {
  if (!location && !pricePerNight) {
    throw Object.assign(
      new Error("Missing query parameter: location or pricePerNight"),
      { statusCode: 400 }
    );
  }

  const filters = {};
  if (location) {
    filters.location = {
      equals: location,
      mode: "insensitive",
    };
  }
  if (pricePerNight) {
    filters.pricePerNight = parseFloat(pricePerNight);
  }

  const properties = await prisma.property.findMany({
    where: filters,
  });

  return properties;
};

export default getProperties;
