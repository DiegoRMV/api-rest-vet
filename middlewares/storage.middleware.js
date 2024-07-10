import multer from "multer";
// import fs from "fs";
// import { promisify } from "util";
// const unlinkProm = promisify(fs.unlink);

export const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads/images");
	},
	filename: (req, file, cb) => {
		if (file !== null) {
			const ext = file.originalname.split(".").pop();
			cb(null, Date.now() + "." + ext);
		}
	},
});

// export const remove = async () => {
// 	try {
// 		const res = await unlinkProm(oldImagePath);
// 		res.send("udpated data");
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

export const filter = (req, file, cb) => {
	if (
		file &&
		(file.mimetype === "image/jpg" ||
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png")
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

export const uploadImage = multer({ storage: storage, fileFilter: filter });
