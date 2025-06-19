import { model, Schema } from "mongoose";

const privilegeSchema = new Schema({
	pName: { type: String },
	limit: { type: Number },
});

const Privilege = model("Privilege", privilegeSchema);
export default Privilege;
