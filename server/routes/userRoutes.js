import express from "express";
import { getUserInfo, updateUser } from "../controllers/userControllers.js";

const router = express.Router();
//Creating route to get user info
router.get("/current", getUserInfo);
//Creating route to update user info
router.patch("/current", updateUser);

export default router;