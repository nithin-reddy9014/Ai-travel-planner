"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import { createTrip } from "@/services/tripService";

export default function CreateTrip() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    destination: "",
    days: 1,
    budgetType: "Medium",
    interests: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const trip = await createTrip({
        ...form,
        interests: form.interests.split(",").map((item) => item.trim()),
      });

      router.push(`/trip/${trip._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white px-4 py-10">
        {/* Header */}
        <div
          className="
            max-w-4xl
            mx-auto
            mb-8
            bg-gradient-to-r
            from-blue-600
            via-cyan-500
            to-teal-500
            rounded-3xl
            p-8
            shadow-2xl
          ">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            ✈️ Create Your AI Trip
          </h1>

          <p className="text-slate-100 text-lg">
            Tell us where you want to go and our AI will generate a complete
            itinerary, budget estimate, hotels, packing list and travel tips.
          </p>
        </div>

        {/* Form */}
        <div
          className="
            max-w-3xl
            mx-auto
            bg-slate-800
            p-8
            rounded-3xl
            border
            border-slate-700
            shadow-2xl
          ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold mb-2">Trip Details</h2>

            {/* Destination */}
            <div>
              <label className="block mb-2 font-medium text-slate-300">
                Destination
              </label>

              <input
                type="text"
                placeholder="e.g. Tokyo, Japan"
                value={form.destination}
                onChange={(e) =>
                  setForm({
                    ...form,
                    destination: e.target.value,
                  })
                }
                required
                className="
                  w-full
                  p-4
                  rounded-xl
                  bg-slate-700
                  border
                  border-slate-600
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              />
            </div>

            {/* Days */}
            <div>
              <label className="block mb-2 font-medium text-slate-300">
                Number of Days
              </label>

              <input
                type="number"
                min="1"
                max="30"
                value={form.days}
                onChange={(e) =>
                  setForm({
                    ...form,
                    days: Number(e.target.value),
                  })
                }
                required
                className="
                  w-full
                  p-4
                  rounded-xl
                  bg-slate-700
                  border
                  border-slate-600
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block mb-2 font-medium text-slate-300">
                Budget Type
              </label>

              <select
                value={form.budgetType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    budgetType: e.target.value,
                  })
                }
                className="
                  w-full
                  p-4
                  rounded-xl
                  bg-slate-700
                  border
                  border-slate-600
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                ">
                <option value="Low">💰 Low Budget</option>

                <option value="Medium">💳 Medium Budget</option>

                <option value="High">💎 Luxury Budget</option>
              </select>
            </div>

            {/* Interests */}
            <div>
              <label className="block mb-2 font-medium text-slate-300">
                Interests
              </label>

              <input
                type="text"
                placeholder="Food, Culture, Shopping, Adventure"
                value={form.interests}
                onChange={(e) =>
                  setForm({
                    ...form,
                    interests: e.target.value,
                  })
                }
                required
                className="
                  w-full
                  p-4
                  rounded-xl
                  bg-slate-700
                  border
                  border-slate-600
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                "
              />
            </div>

            {/* Info Box */}
            <div
              className="
                bg-slate-700
                border
                border-slate-600
                rounded-xl
                p-4
              ">
              <h3 className="font-bold text-cyan-400 mb-2">
                🤖 AI Will Generate
              </h3>

              <ul className="space-y-1 text-slate-300">
                <li>✅ Day-by-Day Itinerary</li>
                <li>✅ Budget Estimation</li>
                <li>✅ Hotel Recommendations</li>
                <li>✅ Packing Suggestions</li>
                <li>✅ Travel Tips</li>
              </ul>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                hover:from-blue-700
                hover:to-cyan-600
                transition
                py-4
                rounded-xl
                font-bold
                text-lg
                shadow-xl
                disabled:opacity-50
              ">
              {loading ? "Generating Your AI Trip..." : "🚀 Generate AI Trip"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
