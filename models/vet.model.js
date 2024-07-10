import { db } from "../database/connection.database.js";

const create = async ({ name, email }) => {
	const query = {
		text: `
        INSERT INTO vets (name, email)
        VALUES ($1, $2)
        RETURNING name, email`,
		values: [name, email],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

const findOneByEmail = async (email) => {
	const query = {
		text: `
        SELECT * FROM vets
        WHERE email = $1
        `,
		values: [email],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const findOneByVid = async (vid) => {
	const query = {
		text: `
        SELECT * FROM vets
        WHERE vid = $1
        `,
		values: [vid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const update = async ({ vid, name, email }) => {
	const query = {
		text: `
        UPDATE vets
        SET 
        name = $1,
        email = $2
        WHERE vid = $3
        RETURNING *
        `,
		values: [name, email, vid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const findAll = async () => {
	const query = {
		text: `
        SELECT * FROM vets
        `,
	};
	const { rows } = await db.query(query);
	return rows;
};

const count = async () => {
	const query = {
		text: "SELECT COUNT(*) FROM vets",
	};
	const { rows } = await db.query(query);
	return parseInt(rows[0].count);
};

const remove = async (vid) => {
	const query = {
		text: `
    	DELETE FROM vets
        WHERE vid = $1
        `,
		values: [vid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

export const VetModel = {
	create,
	update,
	findOneByVid,
	findOneByEmail,
	findAll,
	count,
	remove,
};
