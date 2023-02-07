import express from "express";
import {
    createBook,
    getAllBooks,
    getOneBook,
    updateBook,
    removeBook,
} from "../controllers/bookControllers.js";

//Creating routes for books
const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getOneBook);
router.put("/:id", updateBook);
router.delete("/:id", removeBook);

export default router;
