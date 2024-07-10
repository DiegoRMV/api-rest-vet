import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlware.js";
import { uploadImage } from "../middlewares/storage.middleware.js";

const router = Router();

router.get("/", ProductController.findAll);
router.get("/:pid", ProductController.findOneByPid);
router.get("/name/:name", ProductController.findOneByName);

router.delete("/delete", verifyToken, verifyAdmin, ProductController.remove);
router.put("/update",verifyToken, verifyAdmin, uploadImage.array("images", 10), ProductController.update);
router.post("/register", verifyToken, verifyAdmin, uploadImage.array("images", 10), ProductController.register);

export default router;
