import { CartModel } from "../models/cart.model.js";
import { UserModel } from "../models/user.model.js";

// /api/v1/users/register
const register = async (req, res) => {
	try {
		const { idProduct, amount } = req.body;
		const email = req.email;

		const user = await UserModel.findOneByEmail(email);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const idUser = user.uid;

		if (!idUser || !idProduct || !amount) {
			return res.status(400).json({
				ok: false,
				msg: "Missing required fields: idUser, idProduct, amount",
			});
		}

		const newCart = await CartModel.create({
			idUser,
			idProduct,
			amount,
		});

		return res.status(201).json({
			ok: true,
			msg: {
				cart: newCart,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error server",
		});
	}
};

const findAllByIdUser = async (req, res) => {
	try {
		const email = req.email;

		const user = await UserModel.findOneByEmail(email);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const iduser = user.uid;
		const carts = await CartModel.findAllByIdUser(iduser);

		if (!carts) {
			return res.status(404).json({ error: "Carts not found" });
		}

		return res.json({
			ok: true,
			msg: carts,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error server",
		});
	}
};

const findAll = async (req, res) => {
	try {
		const carts = await CartModel.findAll();

		return res.json({ ok: true, msg: carts });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error server",
		});
	}
};

const remove = async (req, res) => {
	try {
		const { data } = req.body;
		const cart = await CartModel.findOneByCid(data.cid);

		if (!cart) {
			return res.status(404).json({ ok: false, msg: "Cart not found" });
		}

		await CartModel.remove(cart.cid);

		return res.json({ ok: true, msg: "Cart delete" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error server",
		});
	}
};

export const CartController = {
	register,
	findAll,
	findAllByIdUser,
	remove,
};
