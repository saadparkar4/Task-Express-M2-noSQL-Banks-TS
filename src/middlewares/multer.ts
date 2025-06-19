import { extension } from "mime";
import { Callback } from "mongoose";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

		cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname).toLowerCase()); // use file extension without name
		// cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
	},
});

const fileTypeFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
	const allowedTypes = /png||jpg/; // Multiple file types

	const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeValid = allowedTypes.test(file.mimetype);
	if (extValid && mimeValid) {
		cb(null, true);
	} else {
		cb(new Error("Only .jpg or .png files are allowed"));
	}
};

export const upload = multer({
	storage: storage,
	fileFilter: fileTypeFilter,
});
