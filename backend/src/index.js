import express from "express";
import dotenv from "dotenv/config";
import authRoute from "../routes/auth.route.js";
import postRoute from "../routes/post.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "../lib/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const SERVER_PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

if (process.env.NODE_ENV === "production") {
  console.log(
    "📦 Serving static files from:",
    path.join(__dirname, "../frontend/dist")
  );
  console.log("🌎 NODE_ENV =", process.env.NODE_ENV);

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(SERVER_PORT, () => {
  console.log(`Server is running at PORT: ${SERVER_PORT}`);
  connectDb();
});
