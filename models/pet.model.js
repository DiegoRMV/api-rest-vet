import { db } from "../database/connection.database.js";

const create = async ({ name, species, breed, owner }) => {
	const query = {
		text: `
        INSERT INTO pets (name, species, breed, owner)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
		values: [name, species, breed, owner],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

const count = async () => {
	const query = {
		text: "SELECT COUNT(*) FROM PETS",
	};
	const { rows } = await db.query(query);
	return parseInt(rows[0].count);
};

const findAll = async () => {
	const query = {
		text: `
        SELECT * FROM pets
        `,
	};
	const { rows } = await db.query(query);
	return rows;
};

const findAllPagination = async ({ limit = 5, page = 1 }) => {
	const offset = (page - 1) * limit;

	const query = {
		text: `
        SELECT * FROM PETS
        LIMIT $1
        OFFSET $2
        `,
		values: [limit, offset],
	};
	const { rows } = await db.query(query);
	return rows;
};

const findOneByPid = async (pid) => {
	const query = {
		text: `
        SELECT * FROM pets
        WHERE pid = $1
        `,
		values: [pid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const findOneByName = async (name) => {
	const query = {
		text: `
        SELECT * FROM pets
        WHERE name = $1
        `,
		values: [name],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const remove = async (pid) => {
	const query = {
		text: `
    	DELETE FROM pets
        WHERE pid = $1
        `,
		values: [pid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const update = async ({ pid, name, species, breed, owner }) => {
	const query = {
		text: `
        UPDATE pets
        SET 
        name = $1,
        species = $2,
        breed = $3,
        owner = $4
        WHERE pid = $5
        RETURNING *
        `,
		values: [name, species, breed, owner, pid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

export const PetModel = {
	create,
	findAll,
	findAllPagination,
	count,
	remove,
	findOneByPid,
	findOneByName,
	update,
};
