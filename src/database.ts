import { app } from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGODB_URL || "");
		console.log("Connected to DB");
	} catch (error) {
		console.log("Connection Failed", error);
	}
};
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
