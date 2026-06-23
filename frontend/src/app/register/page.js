"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import api from "@/services/api";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      router.push("/login");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            ✈️ AI Travel Planner
          </h1>

          <p className="text-slate-400 mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Full Name"
            className="
            w-full
            p-3
            rounded-lg
            bg-slate-700
            border
            border-slate-600
            text-white
          "
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="
            w-full
            p-3
            rounded-lg
            bg-slate-700
            border
            border-slate-600
            text-white
          "
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="
            w-full
            p-3
            rounded-lg
            bg-slate-700
            border
            border-slate-600
            text-white
          "
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button
            className="
            w-full
            bg-cyan-600
            hover:bg-cyan-700
            py-3
            rounded-lg
            font-semibold
            text-white
          ">
            Create Account
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?
          <a href="/login" className="text-cyan-400 ml-2">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
