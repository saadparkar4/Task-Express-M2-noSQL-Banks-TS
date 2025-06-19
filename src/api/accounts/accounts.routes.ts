import express, { NextFunction, Request, Response } from "express";
const accountsRouter = express.Router();
import { accountsGet, accountUpdate, accountDelete, accountCreate, getAccountByUsername, getAccountById } from "./accounts.controller";
import { upload } from "../../middlewares/multer";
import { body } from "express-validator";

accountsRouter.get(
	"/",
	(req, res, next) => {
		console.log("Getting All Accounts", req.hostname);
		next();
	},
	accountsGet
);
// accountsRouter.get("/", accountsGet);
accountsRouter.get("/id/:accountId", getAccountById);
accountsRouter.get("/:username", getAccountByUsername);
accountsRouter.post(
	"/",
	upload.single("image"),
	(req: Request, res: Response, next: NextFunction) => {
		console.log(req.body);
		next();
	},
	body("username").isLength({ max: 4 }).withMessage("Length Exceeded"),

	accountCreate
);

accountsRouter.delete("/:accountId", accountDelete);

accountsRouter.put("/:accountId", accountUpdate);

export default accountsRouter;
