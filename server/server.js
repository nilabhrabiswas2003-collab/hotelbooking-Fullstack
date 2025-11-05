// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import userRouter from "./routes/userRoutes.js";
// import hotelRouter from "./routes/hotelRoutes.js";
// import roomRouter from "./routes/roomRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";
// import clerkWebhooks from "./controllers/clerkWebhooks.js";
// import connectCloudinary from "./configs/cloudinary.js";
// import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// connectDB();
// connectCloudinary();

// const app = express();
// app.use(cors({ origin: "*" })); // Enable Cross-Origin Resource Sharing

// // API to listen to Stripe Webhooks
// app.post("/api/stripe",express.raw({ type: "application/json" }),stripeWebhooks);

// // Middleware to parse JSON
// app.use(express.json());
// app.use(clerkMiddleware());

// // API to listen to Clerk Webhooks
// app.use("/api/clerk", clerkWebhooks);

// app.get("/", (req, res) => res.send("API is working"));
// app.use("/api/user", userRouter);
// app.use("/api/hotels", hotelRouter);
// app.use("/api/rooms", roomRouter);
// app.use("/api/bookings", bookingRouter);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// export default app;

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import connectCloudinary from "./configs/cloudinary.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

const app = express();

// ✅ Configure CORS properly for your frontend
app.use(
  cors({
    origin: [
      "https://hotelbooking-fullstack-6aki.vercel.app", // your frontend
      "https://hotelbooking-fulls-git-dc2e66-nilabhra-biswas-projects-e83596be.vercel.app" // maybe your preview domain
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// Stripe webhooks (must be before express.json)
app.post("/api/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// JSON parsing middleware
app.use(express.json());

// Clerk authentication
app.use(clerkMiddleware());

// Clerk webhooks
app.use("/api/clerk", clerkWebhooks);

// Test route
app.get("/", (req, res) => res.send("API is working"));

// Other routes
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// ✅ Important: EXPORT app (don’t use app.listen)
export default app;
