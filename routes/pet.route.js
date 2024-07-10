import { Router } from "express";
import { PetController } from "../controllers/pet.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/jwt.middlware.js";

const router = Router();

router.get("/", verifyToken, PetController.findAll);

router.post("/register", verifyToken, verifyAdmin, PetController.register);
router.delete("/delete", verifyToken, verifyAdmin, PetController.remove);
router.put("/update", verifyToken, verifyAdmin, PetController.update);

// router.get("/pagination", verifyToken, PetController.findAllPagination);
export default router;
