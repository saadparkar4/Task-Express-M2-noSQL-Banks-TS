import express from "express";
import accountsRouter from "./api/accounts/accounts.routes";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/accounts", accountsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});