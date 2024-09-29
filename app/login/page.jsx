"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle error message
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.ok) {
      router.push("/home");
    } else {
      // Display custom error message when login fails
      setError("Account does not exist. Sign up here.");
      console.error("Failed to sign in:", result.error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded">
      <form onSubmit={handleLogin}>
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

        <button type="submit" className="bg-blue-600 text-white p-2 w-full mt-4">
          Login
        </button>
      </form>

      {/* Display error message with sign up link */}
      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500">{error}</p>
          <a href="/signup" className="text-blue-600 underline">
            Sign up here
          </a>
        </div>
      )}
    </div>
  );
}
