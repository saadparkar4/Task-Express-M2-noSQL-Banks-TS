import express, { NextFunction, Request, Response } from "express";
import accountsRouter from "./api/accounts/accounts.routes";
import { nextTick } from "process";
import morgan, { format } from "morgan"; //Logger Addon
import cors from "cors"; // Cross Origin Resource Sharing Enabler
import { NotFound } from "./middlewares/NotFound";
import { ServerError } from "./middlewares/ServerError";
import { FormattedLogger, Logger } from "./middlewares/Logger";

export const app = express();
const PORT = 8000;

app.use(express.json());
app.use(morgan("dev")); // Defines Mogran Log Level
app.use(cors()); // Enables CORS in the app

app.use(FormattedLogger);
app.use(Logger);

app.use("/accounts", accountsRouter);

//404 Handler
app.use(NotFound);

//500 Handler
app.use(ServerError);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
