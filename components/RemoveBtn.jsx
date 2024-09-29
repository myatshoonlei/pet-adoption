"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removePet = async () => {
    const confirmed = confirm("Are you sure you want to delete this pet?");

    if (confirmed) {
      try {
        // Send the DELETE request to the correct API endpoint
        const res = await fetch(`/api/pets/${id}`, {
          method: "DELETE", // Use DELETE method
        });

        if (!res.ok) {
          throw new Error("Failed to delete pet");
        }

        // Refresh the page or reroute as necessary after successful deletion
        router.refresh();
      } catch (error) {
        console.error("Error deleting pet:", error);
      }
    }
  };

  return (
    <button onClick={removePet} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}