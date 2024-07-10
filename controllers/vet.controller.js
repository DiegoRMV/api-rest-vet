import { VetModel } from "../models/vet.model.js";

const register = async (req, res) => {
	try {
		const { name, email } = req.body;

		if (!name || !email) {
			return res
				.status(400)
				.json({ ok: false, msg: "Missing required fields: email, name" });
		}

		const vet = await VetModel.findOneByEmail(email);
		if (vet) {
			return res.status(409).json({ ok: false, msg: "Email already exists" });
		}

		const newVet = await VetModel.create({ name, email });

		return res.status(201).json({
			ok: true,
			msg: {
				vet: newVet,
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
		const vets = await VetModel.findAll();

		return res.json({ ok: true, msg: vets });
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
		const vet = await VetModel.findOneByVid(data.vid);

		if (!vet) {
			return res.status(404).json({ ok: false, msg: "Vet not found" });
		}

		await VetModel.remove(vet.vid);

		return res.json({ ok: true, msg: "Vet delete" });
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
		const { vid, name, email } = req.body;

		if (!vid || !name || !email) {
			return res.status(400).json({
				ok: false,
				msg: "Missing required fields: vid, email, name",
			});
		}

		const vet = await VetModel.findOneByVid(vid);

		if (!vet) {
			return res.status(404).json({ ok: false, msg: "Vet not found" });
		}

		const updateVet = await VetModel.update({
			vid: vet.vid,
			name,
			email,
		});

		return res.status(201).json({
			ok: true,
			msg: {
				vet: {
					vid: updateVet.vid,
					name: updateVet.name,
					email: updateVet.email,
				},
			},
		});
	} catch (error) {
		console.log("vet", error);
		return res.status(500).json({
			ok: false,
			msg: "Error server",
		});
	}
};

export const VetController = {
	register,
	findAll,
	remove,
	update,
};
