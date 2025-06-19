import express, { NextFunction, Request, Response } from "express";
import accountsRouter from "./api/accounts/accounts.routes";
import lockerRouter from "./api/locker/locker.routes";
import privilegeRouter from "./api/privilege/privilege.routes";
import { nextTick } from "process";
import morgan, { format } from "morgan"; //Logger Addon
import cors from "cors"; // Cross Origin Resource Sharing Enabler
import { NotFound } from "./middlewares/NotFound";
import { ServerError } from "./middlewares/ServerError";
import { FormattedLogger, Logger } from "./middlewares/Logger";
import path from "path";

export const app = express();
const PORT = 8000;

app.use(express.json());
app.use(morgan("dev")); // Defines Mogran Log Level
app.use(cors()); // Enables CORS in the app

app.use(FormattedLogger);
app.use(Logger);

app.use("/accounts", accountsRouter);
app.use("/lockers", lockerRouter);
app.use("/privilege", privilegeRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// the static code will be similar in case of storing files in another storage server or providers like S3 Bucket or Firebase

//404 Handler
app.use(NotFound);

//500 Handler
app.use(ServerError);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
