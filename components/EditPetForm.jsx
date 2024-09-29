"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditPetForm({ id, name, breed, description, status }) {
  const [newName, setNewName] = useState(name || "");
  const [newBreed, setNewBreed] = useState(breed || "");
  const [newDescription, setNewDescription] = useState(description || "");
  const [newStatus, setNewStatus] = useState(status || "Available");

  const router = useRouter();

  // Ensure state updates if the props change (for async data)
  useEffect(() => {
    setNewName(name || "");
    setNewBreed(breed || "");
    setNewDescription(description || "");
    setNewStatus(status || "Available");
  }, [name, breed, description, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/pets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newBreed,
          newDescription,
          newStatus,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update pet details");
      }

      router.refresh();
      // Redirect to "/Home" after successful update
      router.push("/home");
    } catch (error) {
      console.log("Error updating pet:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto border rounded">
      <label className="block mb-2 font-bold">Name</label>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Pet Name"
        className="block w-full mb-4 p-2 border"
        required
      />

      <label className="block mb-2 font-bold">Breed</label>
      <select
        value={newBreed}
        onChange={(e) => setNewBreed(e.target.value)}
        className="block w-full mb-4 p-2 border"
        required
      >
        <option value="">Select breed</option>
        <option value="Cat">Cat</option>
        <option value="Dog">Dog</option>
        <option value="Bird">Bird</option>
      </select>

      <label className="block mb-2 font-bold">Description</label>
      <input
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Pet Description"
        className="block w-full mb-4 p-2 border"
      />

      <label className="block mb-2 font-bold">Status</label>
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="block w-full mb-4 p-2 border"
        required
      >
        <option value="Available">Available</option>
        <option value="Adopted">Adopted</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white p-2 mt-4">
        Update Pet
      </button>
    </form>
  );
}
