import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlware.js";

const router = Router();

router.get("/", verifyToken, CartController.findAllByIdUser);
router.post("/register", verifyToken, CartController.register);
router.delete("/delete", verifyToken, CartController.remove);

router.get("/all", verifyToken, verifyAdmin, CartController.findAll);

export default router;
