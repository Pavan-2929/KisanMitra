import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import cropRouter from "./routes/crop.routes.js";
import blogRouter from "./routes/blog.routes.js";
import reviewRouter from "./routes/review.routes.js";
import queryRouter from "./routes/query.routes.js";
import dealerRouter from "./routes/dealer.routes.js";
import session from "express-session";
import passport from "passport";
import "./passportConfig.js";

import MongoStore from "connect-mongo";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    // origin: "http://localhost:5000",
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_URL,
      touchAfter: 1000 * 60 * 60 * 24,
    }),

    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const connectionurl = process.env.MONGO_DB_URL;
mongoose
  .connect(connectionurl)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error(error));

app.use("/api/auth", userRouter);
app.use("/api/crops", cropRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/review", reviewRouter);
app.use("/api/query", queryRouter);
app.use("/api", dealerRouter);

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
