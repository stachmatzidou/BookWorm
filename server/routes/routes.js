import express from "express";
import authRoutes from "./authRoutes.js";
import bookRoutes from "./bookRoutes.js";
import userRoutes from "./userRoutes.js";


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/books", bookRoutes);
router.use("/users", userRoutes);

export default router;