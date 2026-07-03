import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://virtank-web.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);

// Default Route

app.get("/", (req, res) => {
  res.send("Social Media API Running");
});

export default app;