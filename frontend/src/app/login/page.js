"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import api from "@/services/api";

import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      login(res.data);

      router.push("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400">
            ✈️ AI Travel Planner
          </h1>

          <p className="text-slate-400 mt-2">Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            bg-blue-600
            hover:bg-blue-700
            py-3
            rounded-lg
            font-semibold
            text-white
          ">
            Login
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Don&apos;t have an account?
          <a href="/register" className="text-blue-400 ml-2">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
