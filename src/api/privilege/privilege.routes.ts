import express, { NextFunction, Request, Response } from "express";
const privilegeRouter = express.Router();
import { getAllPrivileges, createPrivilege, addPrivilegeToAccount } from "./privilege.controller";

privilegeRouter.get("/", getAllPrivileges);
privilegeRouter.post("/", createPrivilege);
privilegeRouter.post("/:pId/:accountId", addPrivilegeToAccount);

export default privilegeRouter;
