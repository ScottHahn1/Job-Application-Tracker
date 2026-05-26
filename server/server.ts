import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const port = process.env.PORT ?? 8888;

const frontendUrl = process.env.NODE_ENV === "production" 
? "" 
: "http://localhost:5173";

app.use(cors({
  origin: frontendUrl,
  methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));