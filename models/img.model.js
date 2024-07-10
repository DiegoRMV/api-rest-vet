import { db } from "../database/connection.database.js";

const create = async ({ ref, img }) => {
	const query = {
		text: `
        INSERT INTO images (ref, img)
        VALUES ($1, $2)
        RETURNING *
        `,
		values: [ref, img],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

const findAll = async () => {
	const query = {
		text: `
        SELECT * FROM images
        `,
	};
	const { rows } = await db.query(query);
	return rows;
};

const findOneByPid = async (id) => {
	const query = {
		text: `
        SELECT * FROM images
        WHERE id = $1
        `,
		values: [id],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const findOneByRef = async (ref) => {
	const query = {
		text: `
        SELECT * FROM images
        WHERE ref = $1
        `,
		values: [ref],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const removeRef = async (ref) => {
	const query = {
		text: `
    	DELETE FROM images
        WHERE ref = $1
        `,
		values: [ref],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

export const ImgModel = {
	create,
	findAll,
	removeRef,
	findOneByPid,
	findOneByRef,
};
