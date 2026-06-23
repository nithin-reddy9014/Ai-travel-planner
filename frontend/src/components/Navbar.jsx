"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-8 py-4 flex justify-between items-center">
      <Link href="/dashboard" className="text-2xl font-bold text-blue-400">
        ✈️ AI Travel Planner
      </Link>

      <div className="flex gap-4 items-center">
        <Link
          href="/create-trip"
          className="
            bg-blue-600
            hover:bg-blue-700
            px-4
            py-2
            rounded-lg
            text-white
          ">
          Create Trip
        </Link>

        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="
            bg-red-500
            hover:bg-red-600
            px-4
            py-2
            rounded-lg
          ">
          Logout
        </button>
      </div>
    </nav>
  );
}
