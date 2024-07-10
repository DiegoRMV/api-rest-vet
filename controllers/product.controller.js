import { ImgModel } from "../models/img.model.js";
import { ProductModel } from "../models/product.model.js";

const register = async (req, res) => {
	try {
		const { name, price, category, description } = req.body;
		const images = req.files;

		if (!name || !price || !category || !description || !images) {
			return res.status(400).json({
				ok: false,
				msg: "Missing required fields: name, price, category, description",
			});
		}

		if (images.length === 0) {
			return res.status(400).json({
				ok: false,
				msg: "Please upload images format jpg o png",
			});
		}

		const product = await ProductModel.findOneByName(name);
		if (product) {
			return res.status(409).json({ ok: false, msg: "Product already exists" });
		}

		let listImages = images.map((img) => img.filename);

		const newProduct = await ProductModel.create({
			name,
			price,
			category,
			description,
			images: listImages,
		});

		return res.status(201).json({
			ok: true,
			msg: {
				product: newProduct,
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

const update = async (req, res) => {
	try {
		const { pid, name, price, category, description, oldimages } = req.body;
		const images = req.files;

		// console.log(pid, name, price, category, description, oldimages);
		if (!pid || !name || !price || !category || !description) {
			return res.status(400).json({
				ok: false,
				msg: "Missing required fields: name, price, category, description, images",
			});
		}

		if (oldimages == "" && images.length === 0) {
			return res.status(400).json({
				ok: false,
				msg: "Please upload images format jpg o png",
			});
		}

		const product = await ProductModel.findOneByPid(+pid);

		if (!product) {
			return res.status(409).json({ ok: false, msg: "Product noy found" });
		}
		
		let listImages = await oldimages.split(",");
		if (images.length > 0) {
			console.log("yes file");
			listImages = images.map((img) => img.filename);
		}

		const updateProduct = await ProductModel.update({
			pid: +pid,
			name,
			price: +price,
			category,
			description,
			images: listImages,
		});

		return res.status(201).json({
			ok: true,
			msg: {
				product: updateProduct,
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

const findAll = async (req, res) => {
	try {
		const products = await ProductModel.findAll();

		return res.json({ ok: true, msg: products });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error server",
		});
	}
};

const findOneByPid = async (req, res) => {
	try {
		const { pid } = req.params;

		const product = await ProductModel.findOneByPid(pid);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		return res.json({
			ok: true,
			msg: product,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error server",
		});
	}
};
const findOneByName = async (req, res) => {
	try {
		const { name } = req.params;

		const product = await ProductModel.findOneByName(name);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		return res.json({
			ok: true,
			msg: product,
		});
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
		const product = await ProductModel.findOneByPid(data.pid);

		if (!product) {
			return res.status(404).json({ ok: false, msg: "Product not found" });
		}

		await ProductModel.remove(product.pid);

		return res.json({ ok: true, msg: "Product delete" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error server",
		});
	}
};

export const ProductController = {
	register,
	findAll,
	findOneByPid,
	findOneByName,
	remove,
	update,
};
