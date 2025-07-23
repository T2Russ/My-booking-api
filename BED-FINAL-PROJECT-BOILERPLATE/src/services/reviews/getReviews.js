import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getReviews = async (filters = {}) => {
  const where = {};

  if (filters.propertyId) {
    where.propertyId = filters.propertyId;
  }

  if (filters.userId) {
    where.userId = filters.userId;
  }

  const reviews = await prisma.review.findMany({ where });
  return reviews;
};

export default getReviews;
