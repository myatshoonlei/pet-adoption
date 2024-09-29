import mongoose, { Schema } from "mongoose";

const petSchema = new Schema(
  {
    name: String,
    breed: String,
    description: String,
    status: {
      type: String,
      enum: ["Available", "Adopted"], // Status should be either "Available" or "Adopted"
      default: "Available", // Default to "Available"
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.models.Pet || mongoose.model("Pet", petSchema);

export default Pet;
