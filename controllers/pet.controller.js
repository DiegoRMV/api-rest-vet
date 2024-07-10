import { PetModel } from "../models/pet.model.js";

const register = async (req, res) => {
	try {
		const { name, species, breed, owner } = req.body;

		if (!name || !species || !breed || !owner) {
			return res.status(400).json({
				ok: false,
				msg: "Missing required fields: name, species, breed, owner",
			});
		}

		const pet = await PetModel.findOneByName(name);
		if (pet) {
			return res.status(409).json({ ok: false, msg: "Pet already exists" });
		}

		const newPet = await PetModel.create({
			name,
			species,
			breed,
			owner,
		});

		return res.status(201).json({
			ok: true,
			msg: {
				pet: newPet,
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
		const pets = await PetModel.findAll();

		return res.json({ ok: true, msg: pets });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error server",
		});
	}
};

const findAllPagination = async (req, res) => {
	try {
		let { limit = 5, page = 1 } = req.query;
		limit = +limit;
		page = +page;

		if (page < 1 || limit < 1 || limit > 100) {
			return res.status(400).json({ error: "Invalid queries" });
		}

		const count = await PetModel.count();
		const pets = await PetModel.findAllPagination({ limit, page });

		const baseUrl = `${req.protocol}://${req.get("host")}/api/v1/pets`;
		const baseUrlWithQueries = `${baseUrl}?limit=${limit}`;

		const totalPages = Math.ceil(count / limit);
		const nextPage =
			page + 1 > totalPages ? null : `${baseUrlWithQueries}&page=${page + 1}`;
		const prevPage =
			page - 1 < 1 ? null : `${baseUrlWithQueries}&page=${page - 1}`;

		return res.json({
			pagination: {
				count,
				totalPages,
				nextPage,
				prevPage,
				currentPage: page,
				limit,
			},
			pets,
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
		const pet = await PetModel.findOneByPid(data.pid);

		if (!pet) {
			return res.status(404).json({ ok: false, msg: "Pet not found" });
		}

		await PetModel.remove(pet.pid);

		return res.json({ ok: true, msg: "Pet delete" });
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
		const { pid, name, species, breed, owner } = req.body;

		if (!pid || !name || !species || !breed || !owner) {
			return res.status(400).json({
				ok: false,
				msg: "Missing required fields: pid, name, species, breed, owner",
			});
		}

		const pet = await PetModel.findOneByPid(pid);

		if (!pet) {
			return res.status(404).json({ ok: false, msg: "Pet not found" });
		}

		const updatePet = await PetModel.update({
			pid,
			name,
			species,
			breed,
			owner,
		});

		return res.status(201).json({
			ok: true,
			msg: {
				pet: updatePet,
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

export const PetController = {
	register,
	findAll,
	findAllPagination,
	remove,
	update,
};
