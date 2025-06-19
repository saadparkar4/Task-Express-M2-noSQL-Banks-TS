import { NextFunction, Request, Response } from "express";
import { account } from "../../../accounts";
import { Account } from "../../models/Account";
import { validationResult } from "express-validator";

export const accountsGet = async (req: Request, res: Response) => {
	try {
		// const allaccount = await account.find();
		const allaccount = await Account.find().populate("locker", "lockerName").populate("privilege", "pName");
		res.status(200).json(allaccount);
	} catch (error) {
		console.log("Error: ", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// export const getaccount = async (req: Request, res: Response) => {
// 	try {
// 		const allaccount = await account.find();
// 		res.status(200).json(account);
// 	} catch (error) {
// 		console.log("Error: ", error);
// 	}
// };

export const accountCreate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, funds, image } = req.body;
		// console.log("val res: ", validationResult(req));  // to print the validation result
		const resval = validationResult(req); //Store Validation Result in variable
		if (!resval.isEmpty()) {
			//ensuring if the validation is not met then
			res.status(500).json(resval.array()); // throw the error to halt the process
		}
		// console.log(username);
		let imagePath;
		if (req.file) {
			imagePath = req.file.path;
		}
		// const allaccount = await Account.find();
		// const id = allaccount[allaccount.length - 1].id + 1;
		const newAccount = await Account.create({ username, funds, image: imagePath });
		// const newAccount = { ...req.body, funds: 0, id };
		// account.push(newAccount);
		res.status(201).json(newAccount);
	} catch (error) {
		console.log("Error: ", error);
		next(error);
		// res.status(500).json({ message: "Internal Server Error!" });
	}
};

export const getAccountByUsername = async (req: Request, res: Response) => {
	try {
		const { accountUsername } = req.params;
		const foundAccount = await Account.find({ accountUsername });
		if (foundAccount) {
			res.status(201).json(foundAccount);
		} else {
			res.status(404).json({ message: "Account not found" });
		}
	} catch (error) {
		console.log("Error: ", error);
		res.status(404).json({ message: "Account not found" });
	}
};

export const getAccountById = async (req: Request, res: Response) => {
	try {
		const { accountId } = req.params;
		const foundAccount = await Account.findById(accountId);
		if (foundAccount) {
			res.status(201).json(foundAccount);
		} else {
			res.status(404).json({ message: "Account not found" });
		}
	} catch (error) {
		console.log("Error: ", error);
		res.status(404).json({ message: "Account not found" });
	}
};

export const accountUpdate = async (req: Request, res: Response) => {
	try {
		const { accountId } = req.params;
		const { username, funds } = req.body;
		const foundAccount = await Account.findByIdAndUpdate(accountId, { funds, username });
		if (foundAccount) {
			// foundAccount.funds = req.body.funds;
			res.status(204).end();
		} else {
			res.status(404).json({ message: "Account not found" });
		}
	} catch (error) {
		console.log("Error: ", error);
		res.status(404).json({ message: "Account not found" });
	}
};

// 1. Extract `accountId` from `req.params`.
// 2. Use `Account.findById()` to find the account.
// 3. If found:
//     - Call `account.updateOne(req.body)`
//     - Return status `204`
// 4. If not found: return `404 Not Found`
// 5. Always use `try/catch` to handle unexpected issues.

export const accountDelete = async (req: Request, res: Response) => {
	try {
		const { accountId } = req.params;
		const { username, funds } = req.body;
		const foundAccount = await Account.findByIdAndDelete(accountId, { funds, username });
		if (foundAccount) {
			res.status(204).end();
		} else {
			res.status(404).json({ message: "Account not found" });
		}
	} catch (error) {
		console.log("Error: ", error);
		res.status(404).json({ message: "Account not found" });
	}
};
