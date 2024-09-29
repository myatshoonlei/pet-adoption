"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen text-center fixed top-0 left-0 w-full">
      <div>
        {/* Increase font size for the welcome text */}
        <h1 className="text-4xl font-bold mb-8">Welcome to the Pet Adoption Platform</h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}