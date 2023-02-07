import express from "express";
// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";
import mongoose from "mongoose";
import "colors";

//create port
const PORT = process.env.PORT || 8000;
//initialize express
const app = express();

//connect to database
const connectDB = async () => {
    mongoose.set('strictQuery', false);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.brightMagenta.italic.underline);
    } catch (error) {
        console.log(error);
        process.exit(1);
    };
};

//listening on port
app.listen(PORT, () => {
    connectDB();
    console.log(`Running on port ${PORT}.`);
});
