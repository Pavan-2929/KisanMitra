import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import cropRouter from "./routes/crop.routes.js";
import blogRouter from "./routes/blog.routes.js";
import session from "express-session";
import passport from "passport";
import "./passportConfig.js"

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cors());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const connectionurl = 'mongodb://localhost:27017/kishanmitra'
mongoose
  .connect(connectionurl)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error(error));

app.use("/api/auth", userRouter);
app.use("/api/crops", cropRouter);
app.use("/api/blogs", blogRouter);

app.use((err, req, res, next) => {
  console.log(err)
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//hiiiiii