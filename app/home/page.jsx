"use client";

import Navbar from "@/components/Navbar";
import PetsList from "@/components/PetsList";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div>
        <PetsList />
      </div>
    </div>
  );
}
