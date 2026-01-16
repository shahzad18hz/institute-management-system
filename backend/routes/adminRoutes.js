import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
// import { addReceptionist } from "../controllers/adminController.js";

const router = express.Router();

router.post("/add-receptionist", protect(["admin"]), addReceptionist);

export default router;
