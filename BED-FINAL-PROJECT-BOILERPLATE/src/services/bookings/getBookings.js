import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getBookings = async (userId) => {
  if (!userId) {
    throw Object.assign(new Error("Missing query parameter: userId"), {
      statusCode: 400,
    });
  }

  const bookings = await prisma.booking.findMany({
    where: { userId },
  });

  return bookings;
};

export default getBookings;

