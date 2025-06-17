import express, { NextFunction, Request, Response } from "express";

export const NotFound = (req: Request, res: Response, next: NextFunction) => {
	res.status(404).json(`404 - ${req.path} NOT FOUND`);
};
