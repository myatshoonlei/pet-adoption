import connectMongoDB from "@/libs/mongodb";
import Pet from "@/models/Pet";
import { NextResponse } from "next/server";

// Handle GET request to fetch a single pet by ID
export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    
    // Fetch the pet by its ID
    const pet = await Pet.findById(params.id);

    // If no pet found, return 404
    if (!pet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    // Return the pet data
    return NextResponse.json(pet, { status: 200 });
  } catch (error) {
    console.error("Error fetching pet by ID:", error);
    return NextResponse.json({ error: "Failed to fetch pet" }, { status: 500 });
  }
}

// Handle DELETE request to remove a pet by ID
export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();
    
    // Delete the pet by its ID
    const deletedPet = await Pet.findByIdAndDelete(params.id);

    // If no pet found to delete, return 404
    if (!deletedPet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    // Return success message
    return NextResponse.json({ message: "Pet deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting pet:", error);
    return NextResponse.json({ error: "Failed to delete pet" }, { status: 500 });
  }
}

// Handle PUT request to update a pet by ID
export async function PUT(request, { params }) {
  try {
    const { newName, newBreed, newDescription, newStatus } = await request.json();
    await connectMongoDB();

    // Find the pet by ID and update its details
    const updatedPet = await Pet.findByIdAndUpdate(
      params.id,
      {
        name: newName,
        breed: newBreed,
        description: newDescription,
        status: newStatus,
      },
      { new: true } // Return the updated document
    );

    // If no pet found to update, return 404
    if (!updatedPet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    // Return the updated pet data
    return NextResponse.json(updatedPet, { status: 200 });
  } catch (error) {
    console.error("Error updating pet:", error);
    return NextResponse.json({ error: "Failed to update pet" }, { status: 500 });
  }
}
