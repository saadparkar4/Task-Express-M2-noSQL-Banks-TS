import { Account } from "../../models/Account";
import Privilege from "../../models/Privilege";
import { NextFunction, Request, Response } from "express";

// Get privileges
export const getAllPrivileges = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const allPrivileges = await Privilege.find();
		res.status(200).json(allPrivileges);
	} catch (error) {
		next(error);
	}
};

// Create privilege
export const createPrivilege = async (req: Request, res: Response) => {
	try {
		const { pName, limit, accountId } = req.body;
		const newPrivilege = await Privilege.create({ pName, limit, account: accountId });
		const account = await Account.findByIdAndUpdate(accountId, { $push: { privilege: newPrivilege._id } });

		res.status(201).json(newPrivilege);
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			error: `something is wrong: ${error}`,
		});
	}
};

export const addPrivilegeToAccount = async (req: Request, res: Response) => {
	try {
		const { pId, accountId } = req.params;
		await Privilege.findByIdAndUpdate(pId, { $push: { account: accountId } });
		await Account.findByIdAndUpdate(accountId, { $push: { privilege: pId } });
		res.json("Added Privilege to Account");
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			error: `something is wrong: ${error}`,
		});
	}
};
