import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

const app = express();

config({
  path: "./config.env",
});

//Using Middleware
app.use(express.json()); //to post JSON data
app.use(cookieParser()); //to access data from cookies
app.use("/api/v1/users", userRouter); //to use user routes
app.use("/api/v1/task", taskRouter); //to use task routes
// use cors to access from the frontend URI
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(errorMiddleware);

mongoose
  .connect(process.env.MongoDB_URI)
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});

//This file becomes large so we use routes
