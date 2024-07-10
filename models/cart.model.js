import { db } from "../database/connection.database.js";

const create = async ({ idUser, idProduct, amount }) => {
	const query = {
		text: `
        INSERT INTO carts (idUser, idProduct, amount)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
		values: [idUser, idProduct, amount],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

const findAllByIdUser = async (iduser) => {
	const query = {
		text: `
        SELECT * FROM carts
        WHERE iduser = $1
        `,
		values: [iduser],
	};
	const { rows } = await db.query(query);
	return rows;
};

const findAll = async () => {
	const query = {
		text: `
        SELECT * FROM carts
        `,
	};
	const { rows } = await db.query(query);
	return rows;
};

const findOneByCid = async (cid) => {
	const query = {
		text: `
        SELECT * FROM carts
        WHERE cid = $1
        `,
		values: [cid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const update = async ({ cid, idUser, idProduct, amount }) => {
	const query = {
		text: `
        UPDATE carts
        SET 
        name = $1,
		idProduct = $2,
		amount = $3
        WHERE cid = $4
        RETURNING *
        `,
		values: [idUser, idProduct, amount, cid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const remove = async (cid) => {
	const query = {
		text: `
    	DELETE FROM carts
        WHERE cid = $1
        `,
		values: [cid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

export const CartModel = {
	create,
	findAllByIdUser,
	findOneByCid,
	findAll,
	update,
	remove,
};
