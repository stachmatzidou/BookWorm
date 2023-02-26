import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/routes.js";
import mongoose from "mongoose";
import path, {dirname} from "path";
import { fileURLToPath } from "url";
import "colors";

const __dirname = dirname(fileURLToPath(import.meta.url));
//create port
const PORT = process.env.PORT || 8000;
//initialize express
const app = express();

//adding middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

//routes
// All routes with an '/api' prefix
app.use("/api", allRoutes);
//error handler
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error.";

    return res.status(status).json({ message, stack: error.stack });
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,"../client", "dist", "index.html"));
    });
}

//connect to database
const connectDB = async () => {
    mongoose.set("strictQuery", false);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(
            `MongoDB Connected: ${conn.connection.host}`.brightMagenta.italic
                .underline
        );
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

//listening on port
app.listen(PORT, () => {
    connectDB();
    console.log(`Running on port ${PORT}.`);
});
