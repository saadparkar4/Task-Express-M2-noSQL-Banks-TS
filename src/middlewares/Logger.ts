import express, { NextFunction, Request, Response } from "express";
import { formattedDate, formattedTime } from "../models/Account";

export const Logger = (req: Request, res: Response, next: NextFunction) => {
	console.log("Request Rcd at", req.method);
	console.log("Request Rcd at", req.path);
	next();
};
export const FormattedLogger = (req: Request, res: Response, next: NextFunction) => {
	console.log("Request Rcd at", Date().toLocaleString());
	console.log("Request Rcd at", formattedDate, formattedTime);
	// console.log("Request Rcd at", Date.now());
	next();
};
