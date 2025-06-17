import express, { NextFunction, Request, Response } from "express";
import accountsRouter from "./api/accounts/accounts.routes";
import { nextTick } from "process";
import { formattedDate, formattedTime } from "./models/account";
import morgan, { format } from "morgan"; //Logger Addon
import cors from "cors"; // Cross Origin Resource Sharing Enabler

export const app = express();
const PORT = 8000;

app.use(express.json());
app.use(morgan("dev")); // Defines Mogran Log Level
app.use(cors()); // Enables CORS in the app

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log("Request Rcd at", Date().toLocaleString());
	console.log("Request Rcd at", formattedDate, formattedTime);
	// console.log("Request Rcd at", Date.now());
	next();
});
app.use((req: Request, res: Response, next: NextFunction) => {
	console.log("Request Rcd at", req.method);
	console.log("Request Rcd at", req.path);
	next();
});
app.use("/accounts", accountsRouter);

//404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(404).json(`404 - ${req.path} NOT FOUND`);
});

//404 Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(err.stack);
	res.status(500).send(`500 - Something broke`);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
