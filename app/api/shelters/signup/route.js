import connectMongoDB from "@/libs/mongodb";
import Shelter from "@/models/Shelter";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectMongoDB();

    const { name, email, password, phoneNumber, city } = await request.json();
console.log({ name, email, password, phoneNumber, city }); // Log the data being received


    // Check if email already exists
    const existingShelter = await Shelter.findOne({ email });
    if (existingShelter) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new shelter with all required fields
    const newShelter = new Shelter({
      name,
      email,
      password: hashedPassword,
      phoneNumber, // Add phone number
      city, // Add city
    });

    // Save to the database
    await newShelter.save();

    return NextResponse.json(
      { message: "Shelter created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating shelter:", error);
    return NextResponse.json({ error: "Failed to create shelter" }, { status: 500 });
  }
}
