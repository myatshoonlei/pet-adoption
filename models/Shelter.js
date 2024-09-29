import mongoose, { Schema } from "mongoose";

const shelterSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // Add phone number
  city: { type: String, required: true }, // Add city
});

mongoose.deleteModel(/^(?!.*__repl).*/); // Use this before defining the model
const Shelter = mongoose.models.Shelter || mongoose.model("Shelter", shelterSchema);

export default Shelter;