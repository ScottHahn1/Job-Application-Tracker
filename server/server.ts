import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8888;

const frontendUrl = process.env.NODE_ENV === "production" 
? "" 
: "http://localhost:5173";

app.use(express.json());
app.use(cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true
}));

app.listen(port, () => console.log(`Server is running on port: ${port}`));