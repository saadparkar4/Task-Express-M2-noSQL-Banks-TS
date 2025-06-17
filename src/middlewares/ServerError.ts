import express, { NextFunction, Request, Response } from "express";

export const ServerError = (err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err.stack);
	res.status(err.status || 500).send(`500 - Something broke ${err}`);
};
