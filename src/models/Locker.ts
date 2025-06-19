import { Schema, model } from "mongoose";

const lockerSchema = new Schema({
	lockerName: { type: Number },
	type: { type: String, require: true },
	// availabilty: { type: Boolean, default: true },
	owner: { type: Schema.Types.ObjectId, ref: "Account" }, // creating a relation with document from another entity
});

const Locker = model("Locker", lockerSchema);
export default Locker;
