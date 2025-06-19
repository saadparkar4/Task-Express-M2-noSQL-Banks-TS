import { Account } from "../../models/Account";
import Locker from "../../models/Locker";
import { NextFunction, Request, Response } from "express";

// Get Lockers
export const getAllLockers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const allLockers = await Locker.find();
		res.status(200).json(allLockers);
	} catch (error) {
		next(error);
	}
};

// Create Locker
export const createLockers = async (req: Request, res: Response) => {
	try {
		const { lockerName, type, accountId } = req.body;
		const newLocker = await Locker.create({ lockerName, type, account: accountId });
		const account = await Account.findByIdAndUpdate(accountId, { $push: { locker: newLocker._id } });

		res.status(201).json(newLocker);
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			error: `something is wrong: ${error}`,
		});
	}
};
