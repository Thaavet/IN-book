import express, { json } from "express";

import { verifyAdmin, verifyUser } from "../verifyToken.js";

import {getBooks,deleteBook,createBook,getBook,updateBook} from "../controller/BookController.js";
const router = express.Router();


//UPDATE
router.put("/:id", verifyAdmin, updateBook);

//DELETE
router.delete("/:id", verifyAdmin, deleteBook);

//GET
router.get("/:id", getBook);

//GET ALL
router.get("/", getBooks);

//CREATE
router.post("/", verifyAdmin, createBook);


export default router;