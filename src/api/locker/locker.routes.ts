import express, { NextFunction, Request, Response } from "express";
const lockerRouter = express.Router();
import { getAllLockers, createLockers } from "./locker.controller";

lockerRouter.get("/", getAllLockers);
lockerRouter.post("/", createLockers);

export default lockerRouter;
