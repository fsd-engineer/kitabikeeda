import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import ProductRoutes from "./routes/productRoute.js";
import cors from "cors";
import * as path from "path"; // Update the import statement
import { fileURLToPath } from "url";

// Configure .env
dotenv.config();

// Database config
connectDB();

// ESM module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// REST object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files
app.use(express.static(path.join(__dirname, "client", "build")));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", ProductRoutes);

// REST API
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Port
const PORT = process.env.PORT || 8000;

// Run listen
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgCyan.white
  );
});
