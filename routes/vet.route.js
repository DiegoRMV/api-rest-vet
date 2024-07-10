import { Router } from "express";
import { VetController } from "../controllers/vet.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlware.js";

const router = Router();

router.get("/", verifyToken, verifyAdmin, VetController.findAll);
router.post("/register", verifyToken, verifyAdmin, VetController.register);
router.delete("/delete", verifyToken, verifyAdmin, VetController.remove);
router.put("/update", verifyToken, verifyAdmin, VetController.update);

export default router;
