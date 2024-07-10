import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlware.js";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", verifyToken, UserController.profile);
router.put("/update", verifyToken, UserController.update);

router.get("/", verifyToken, verifyAdmin, UserController.findAll);
router.delete("/delete", verifyToken, verifyAdmin, UserController.remove);
router.put("/adminupdate", verifyToken, verifyAdmin, UserController.adminUpdate);

export default router;
