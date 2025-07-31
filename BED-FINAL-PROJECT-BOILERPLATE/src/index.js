import express from "express";
import "dotenv/config";
import * as Sentry from "@sentry/node";
import amenitiesRouter from "../src/routes/amenities.js";
import bookingsRouter from "../src/routes/bookings.js";
import hostsRouter from "../src/routes/hosts.js";
import propertiesRouter from "../src/routes/properties.js";
import reviewsRouter from "../src/routes/reviews.js";
import logMiddleware from "../src/middleware/logMiddleware.js";
import errorHandler from "../src/middleware/errorHandler.js";
import usersRouter from "../src/routes/users.js";
import loginRouter from "../src/routes/login.js";

const app = express();

Sentry.init({
  dsn: 'https://dev-iqt65ryq05bu3vl7.us.auth0.com/',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0, 
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(logMiddleware);

// Routes
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

  const html =
    "<h1>Booking-API</h1><h2>Welcome to our BOOKING_API</h2><p>By using: GET - POST - PUT & DELETE you can handle the bookings!</p>";
  res.send(html);
  res.send("Booking-API");
});

app.get("/about", (req, res) => {
  const html =
    "<h1>About bookings</h1><h2>Welcome to our BOOKING_API</h2><p>By using: GET - POST - PUT & DELETE you can handle the bookings!</p>";
  res.send(html);
});

// Tracing errors
app.use(Sentry.Handlers.errorHandler());

// Error handling
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
