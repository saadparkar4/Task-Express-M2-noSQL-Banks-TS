import { model, Schema } from "mongoose";

const accountSchema = new Schema({
	// id: { type: String },
	username: { type: String, require: true, unique: true },
	funds: { type: Number, default: 0 },
	image: { type: String },
	locker: [{ type: Schema.Types.ObjectId, ref: "Locker" }], // Now it will store mutliple array of locker ids
	privilege: [{ type: Schema.Types.ObjectId, ref: "Privilege" }],
});

export const Account = model("Account", accountSchema);

const now = new Date(); // Create a Date object from the current timestamp

// Get date components
const day = String(now.getDate()).padStart(2, "0"); // DD
const month = String(now.getMonth() + 1).padStart(2, "0"); // MM (months are 0-indexed)
const year = now.getFullYear(); // YYYY

// Get time components
const hours = String(now.getHours()).padStart(2, "0"); // HH
const minutes = String(now.getMinutes()).padStart(2, "0"); // MM (for minutes)
const seconds = String(now.getSeconds()).padStart(2, "0"); // SS (for seconds)

// Format the date and time strings
export const formattedDate = `${day} ${month} ${year}`;
export const formattedTime = `${hours}:${minutes}:${seconds}`; // Changed to HH:MM:SS for clarity, assuming HH:SS was a typo for minutes
