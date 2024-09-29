import connectMongoDB from "@/libs/mongodb";
import Shelter from "@/models/Shelter";
import { NextResponse } from "next/server";

// Update shelter details
export async function PUT(request, { params }) {
  await connectMongoDB();

  const { id } = params;
  const { name, phoneNumber, city } = await request.json();

  try {
    const shelter = await Shelter.findByIdAndUpdate(
      id,
      { name, phoneNumber, city },
      { new: true } // Return the updated shelter object
    );

    if (!shelter) {
      return NextResponse.json({ message: "Shelter not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Shelter updated successfully", shelter }, { status: 200 });
  } catch (error) {
    console.error("Error updating shelter:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

// Fetch shelter details
export async function GET(request, { params }) {
  await connectMongoDB();

  const { id } = params;

  try {
    const shelter = await Shelter.findById(id);

    if (!shelter) {
      return NextResponse.json({ message: "Shelter not found" }, { status: 404 });
    }

    return NextResponse.json(shelter, { status: 200 });
  } catch (error) {
    console.error("Error fetching shelter:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

// Delete shelter account
export async function DELETE(request, { params }) {
  await connectMongoDB();

  const { id } = params;

  try {
    const shelter = await Shelter.findByIdAndDelete(id);

    if (!shelter) {
      return NextResponse.json({ message: "Shelter not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Shelter deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting shelter:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
