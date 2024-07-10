import { db } from "../database/connection.database.js";

const create = async ({ email, password, username }) => {
	const query = {
		text: `
        INSERT INTO users (email, password, username)
        VALUES ($1, $2, $3)
        RETURNING email, username, uid, role_id
        `,
		values: [email, password, username],
	};

	const { rows } = await db.query(query);
	return rows[0];
};

const findOneByEmail = async (email) => {
	const query = {
		text: `
        SELECT * FROM users
        WHERE EMAIL = $1
        `,
		values: [email],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const findAll = async () => {
	const query = {
		text: `
        SELECT * FROM users
        `,
	};
	const { rows } = await db.query(query);
	return rows;
};

const findOneByUid = async (uid) => {
	const query = {
		text: `
        SELECT * FROM users
        WHERE uid = $1
        `,
		values: [uid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const remove = async (uid) => {
	const query = {
		text: `
    	DELETE FROM users
        WHERE uid = $1
        `,
		values: [uid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

const update = async ({ uid, email, password, username }) => {
	const query = {
		text: `
        UPDATE users
        SET 
        email = $1,
        password = $2,
        username = $3
        WHERE uid = $4
        RETURNING *
        `,
		values: [email, password, username, uid],
	};
	const { rows } = await db.query(query);
	return rows[0];
};

export const UserModel = {
	create,
	findOneByEmail,
	findOneByUid,
	findAll,
	update,
	remove,
};
