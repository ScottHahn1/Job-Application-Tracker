import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usersRouter from "./users/users.route";
import cookieParser from 'cookie-parser';
import applicationsRouter from "./applications/applications.route";

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
app.use("/api/applications", applicationsRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));