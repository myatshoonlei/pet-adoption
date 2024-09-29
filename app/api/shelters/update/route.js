import { NextResponse } from "next/server";

export async function PUT(request) {
  const session = await getSession({ req: request });

  if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const email = session.user.email;
  const { name, phoneNumber, city } = await request.json();

  try {
    const shelter = await Shelter.findOneAndUpdate(
      { email },
      { name, phoneNumber, city },
      { new: true }
    );

    if (!shelter) return NextResponse.json({ message: "Shelter not found" }, { status: 404 });

    return NextResponse.json(shelter, { status: 200 });
  } catch (error) {
    console.error("Error updating shelter:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
