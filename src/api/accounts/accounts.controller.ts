import { Request, Response } from "express";
import { account } from "../../../accounts";
import { Account } from "../../models/account";

export const accountsGet = async (req: Request, res: Response) => {
	try {
		// const allaccount = await account.find();
		const allaccount = await Account.find();
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

export const accountCreate = async (req: Request, res: Response) => {
	try {
		const { username, funds } = req.body;
		// const allaccount = await Account.find();
		// const id = allaccount[allaccount.length - 1].id + 1;
		const newAccount = await Account.create({ username, funds });
		// const newAccount = { ...req.body, funds: 0, id };
		// account.push(newAccount);
		res.status(201).json(newAccount);
	} catch (error) {
		console.log("Error: ", error);
		res.status(500).json({ message: "Internal Server Error!" });
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
