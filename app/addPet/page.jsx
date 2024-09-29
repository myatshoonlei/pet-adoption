"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPet() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Available"); // Default status

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send status in the request
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, breed, description, status }), // Include status
      });

      if (res.ok) {
        // Redirect to "/home" after successful pet creation
        router.push("/home");
      } else {
        throw new Error("Failed to create pet");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto border rounded">
      <label className="block mb-2 font-bold">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Pet Name"
        className="block w-full mb-4 p-2 border"
        required
      />

      <label className="block mb-2 font-bold">Breed</label>
      <select
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Pet Description"
        className="block w-full mb-4 p-2 border"
      />

      <label className="block mb-2 font-bold">Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="block w-full mb-4 p-2 border"
        required
      >
        <option value="Available">Available</option>
        <option value="Adopted">Adopted</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white p-2 mt-4">
        Add Pet
      </button>
    </form>
  );
}
