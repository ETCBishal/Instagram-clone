import express from "express";
import dotenv from "dotenv/config";
import authRoute from "../routes/auth.route.js";
import postRoute from "../routes/post.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "../lib/db.js";

const app = express();
const SERVER_PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://192.168.1.3:5173',
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running at PORT: ${SERVER_PORT}`);
  connectDb();
});
