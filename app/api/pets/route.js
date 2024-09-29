import connectMongoDB from "@/libs/mongodb";
import Pet from "@/models/Pet";
import { NextResponse } from "next/server";

// GET request: Fetch all pets from the database
export async function GET() {
  try {
    await connectMongoDB();
    const pets = await Pet.find({});
    console.log("Pets fetched from database:", pets); // Debugging log
    return NextResponse.json({ pets }, { status: 200 });
  } catch (error) {
    console.log("Error fetching pets:", error);
    return NextResponse.json({ error: "Failed to fetch pets" }, { status: 500 });
  }
}

// POST request: Add a new pet to the database
export async function POST(request) {
  const { name, breed, description, status } = await request.json();
  console.log({ name, breed, description, status }); // Add this log
  await connectMongoDB();
  const newPet = await Pet.create({ name, breed, description, status });
  console.log("New pet created:", newPet); // Verify the creation log
  return NextResponse.json({ message: "Pet Created" }, { status: 201 });
}

export default async function handler(req, res) {
  try {
    await connectMongoDB();
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pets" });
  }
}