"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManageShelterForm({ id, name, email, phoneNumber, city }) {
  const [newName, setNewName] = useState(name || "");
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber || "");
  const [newCity, setNewCity] = useState(city || "");
  const [message, setMessage] = useState(""); // State for success message
  const router = useRouter();

  // Ensure state updates if props change (for async data)
  useEffect(() => {
    setNewName(name || "");
    setNewPhoneNumber(phoneNumber || "");
    setNewCity(city || "");
  }, [name, phoneNumber, city]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/shelters/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          phoneNumber: newPhoneNumber,
          city: newCity,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update shelter details");
      }

      // Show success message
      setMessage("Profile updated successfully!");

      setTimeout(() => {
        // Use `replace` to force a full navigation
        router.replace("/home");
      }, 1300); // Delay for 1.3 seconds
    } catch (error) {
      console.log("Error updating shelter:", error);
    }
  };

  const handleDelete = async () => {
    // Confirm before deleting the account
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/shelters/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete shelter");
      }

      // After successful deletion, redirect to the homepage
      alert("Account deleted successfully!");
      router.replace("/");
    } catch (error) {
      console.log("Error deleting shelter:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto border rounded">
      <label className="block mb-2 font-bold">Name</label>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Shelter Name"
        className="block w-full mb-4 p-2 border"
        required
      />

      <label className="block mb-2 font-bold">Email (Cannot be changed)</label>
      <input
        type="email"
        value={email}
        readOnly
        className="block w-full mb-4 p-2 border bg-gray-100"
      />

      <label className="block mb-2 font-bold">Phone Number</label>
      <input
        type="text"
        value={newPhoneNumber}
        onChange={(e) => setNewPhoneNumber(e.target.value)}
        placeholder="Phone Number"
        className="block w-full mb-4 p-2 border"
      />

      <label className="block mb-2 font-bold">City</label>
      <input
        type="text"
        value={newCity}
        onChange={(e) => setNewCity(e.target.value)}
        placeholder="City"
        className="block w-full mb-4 p-2 border"
      />

      {/* Show success message */}
      {message && <p className="text-green-500 mb-4">{message}</p>}

      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white p-2 mt-4">
          Update Profile
        </button>
        <button
          type="button"
          className="bg-red-600 text-white p-2 mt-4"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </form>
  );
}
