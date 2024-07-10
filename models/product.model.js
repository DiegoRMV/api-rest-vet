import { db } from "../database/connection.database.js";

const create = async ({ name, price, category, description, images }) => {
	const query = {
		text: `
        INSERT INTO products (name, price, category, description, images)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
		values: [name, price, category, description, images],
	};

	console.log(images);

	const { rows } = await db.query(query);
	return rows[0];
};

const update = async ({ pid, name, price, category, description, images }) => {
	const query = {
		text: `
        UPDATE products
        SET 
        name = $1,
        price = $2,
        category = $3,
        description = $4,
        images = $5
        WHERE pid = $6
        RETURNING *
        `,
		values: [name, price, category, description, images, pid],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

const findAllByCategory = async (category) => {
	const query = {
		text: `
        SELECT * FROM products
        WHERE category = $1
        `,
		values: [category],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const findAll = async () => {
	const query = {
		text: `
        SELECT * FROM products
        `,
	};
	const { rows } = await db.query(query);
	return rows;
};

const findOneByPid = async (pid) => {
	const query = {
		text: `
        SELECT * FROM products
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
        SELECT * FROM products
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
    	DELETE FROM products
        WHERE pid = $1
        `,
		values: [pid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

export const ProductModel = {
	create,
	findAllByCategory,
	findOneByPid,
	findOneByName,
	findAll,
	update,
	remove,
};
