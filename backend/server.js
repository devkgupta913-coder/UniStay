const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

dotenv.config({ path: path.join(__dirname, ".env") });

// Connect to Database
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for frontend clients (Local, Vercel, and Render)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from localhost, custom domains, or any Vercel/Render deployment
      if (!origin || origin.includes("localhost") || origin.includes("127.0.0.1") || origin.endsWith(".vercel.app") || origin.endsWith(".onrender.com") || origin === process.env.CLIENT_URL) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Route files
const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "Healthy",
    service: "UniStay YMCA Student Accommodation API",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`UniStay API server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
});
