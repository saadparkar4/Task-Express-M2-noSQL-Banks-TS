import express, { NextFunction } from "express";
const accountsRouter = express.Router();
import { accountsGet, accountUpdate, accountDelete, accountCreate, getAccountByUsername, getAccountById } from "./accounts.controller";

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
accountsRouter.post("/", accountCreate);

accountsRouter.delete("/:accountId", accountDelete);

accountsRouter.put("/:accountId", accountUpdate);

export default accountsRouter;
