import express from "express";
import authRoutes from "./authRoutes.js";
import bookRoutes from "./bookRoutes.js";
import userRoutes from "./userRoutes.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();
//Defining routes
router.use("/auth", authRoutes);
//make sure to check authentication before accessing bookRoutes and userRoutes
router.use("/books", checkAuth, bookRoutes);
router.use("/users", checkAuth, userRoutes);

export default router;