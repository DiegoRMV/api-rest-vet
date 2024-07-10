import { Router } from "express";
import path from "path";

const router = Router();

const __dirname = import.meta.dirname;
const publicPath = path.join(__dirname, "../public");

router.get("/", (req, res) => {
	res.sendFile(publicPath + "/index.html");
});

router.get("/cart", (req, res) => {
	res.sendFile(publicPath + "/view/cart.html");
});

router.get("/pet", (req, res) => {
	res.sendFile(publicPath + "/view/pet.html");
});

router.get("/login", (req, res) => {
	res.sendFile(publicPath + "/view/login.html");
});

router.get("/register", (req, res) => {
	res.sendFile(publicPath + "/view/register.html");
});

router.get("/profile", (req, res) => {
	res.sendFile(publicPath + "/view/profile.html");
});

router.get("/admin/users", (req, res) => {
	res.sendFile(publicPath + "/view/users.html");
});
router.get("/admin/vets", (req, res) => {
	res.sendFile(publicPath + "/view/vets.html");
});
router.get("/admin/pets", (req, res) => {
	res.sendFile(publicPath + "/view/pets.html");
});
router.get("/admin/products", (req, res) => {
	res.sendFile(publicPath + "/view/products.html");
});
router.get("/admin/carts", (req, res) => {
	res.sendFile(publicPath + "/view/carts.html");
});

export default router;
