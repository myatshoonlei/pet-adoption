"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Debugging: Print session to ensure it's being populated correctly
  console.log("Session data:", session);

  // Extract the shelterId from the session
  const shelterId = session?.user?.id;

  // Handle loading state while session is being fetched
  if (status === "loading") {
    return <nav className="p-4">Loading...</nav>;
  }

  return (
    <nav className="flex justify-between items-center bg-purple-900 px-8 py-3 h-16">
      {/* Updated "Shelter" text size */}
      <Link className="text-white font-bold text-2xl" href={"/"}>
        Shelter
      </Link>

      {/* Container for "Add Pet" and "Manage Shelter" buttons */}
      <div className="flex gap-4">
        {pathname !== "/addPet" && (
          <Link className="bg-white p-2 rounded-md" href={"/addPet"}>
            Add Pet
          </Link>
        )}
        {/* Only show this link if `shelterId` is available */}
        {shelterId && (
          <Link className="bg-white p-2 rounded-md" href={`/shelter/${shelterId}`}>
            Manage Shelter
          </Link>
        )}
      </div>
    </nav>
  );
}
