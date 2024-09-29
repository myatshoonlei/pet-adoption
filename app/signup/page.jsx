"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number
  const [city, setCity] = useState(""); // New state for city
  const [message, setMessage] = useState(""); // State for success or error message
  const [error, setError] = useState(""); // State for error message
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/shelters/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phoneNumber, city }),
      });

      if (res.ok) {
        setMessage("Account Created!"); // Set success message
        setError(""); // Clear any error messages
      } else if (res.status === 409) {
        // Conflict due to duplicate email
        setError("Email already in use");
        setMessage(""); // Clear any success message
      } else {
        throw new Error("Failed to sign up");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
      setMessage(""); // Clear any success message
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded">
      <form onSubmit={handleSignup}>
        <label className="block mb-2 font-bold">Shelter Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="block w-full mb-4 p-2 border"
        />
        <label className="block mb-2 font-bold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="block w-full mb-4 p-2 border"
        />
        <label className="block mb-2 font-bold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="block w-full mb-4 p-2 border"
        />
        <label className="block mb-2 font-bold">Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
          className="block w-full mb-4 p-2 border"
        />
        <label className="block mb-2 font-bold">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
          className="block w-full mb-4 p-2 border"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">
          Sign Up
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center">
          <p className="text-green-500">{message}</p>
          <button
            onClick={() => router.push("/login")}
            className="text-blue-600 underline"
          >
            Login here
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="text-blue-600 underline"
          >
            Login here
          </button>
        </div>
      )}
    </div>
  );
}
