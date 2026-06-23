"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import BudgetCard from "@/components/BudgetCard";
import HotelCard from "@/components/HotelCard";
import WeatherCard from "@/components/WeatherCard";

import { getTripById } from "@/services/tripService";

export default function TripDetails() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await getTripById(id);

        console.log("TRIP DATA:", data);
        console.log("ITINERARY:", data.itinerary);

        setTrip(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchTrip();
    }
  }, [id]);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        ✈️ Loading Trip...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-2xl mb-8">
          <h1 className="text-5xl font-bold">🌍 {trip.destination}</h1>

          <p className="mt-3 text-lg">{trip.days} Day Adventure</p>
        </div>

        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <BudgetCard budget={trip.budgetEstimate} />

          <WeatherCard weather={trip.weather} />

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-bold mb-4">🧳 Packing List</h2>

            <div className="flex flex-wrap gap-2">
              {trip.packingList?.map((item, index) => (
                <span
                  key={index}
                  className="
                      bg-cyan-600
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    ">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hotels */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold mb-4">🏨 Recommended Hotels</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {trip.hotels?.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>
        </div>

        {/* Travel Tips */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold mb-4">💡 Travel Tips</h2>

          <div className="space-y-3">
            {trip.travelTips?.map((tip, index) => (
              <div
                key={index}
                className="
                    bg-slate-700
                    p-3
                    rounded-lg
                  ">
                {tip}
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-6">📅 Itinerary</h2>

          {trip.itinerary && Object.keys(trip.itinerary).length > 0 ? (
            Object.entries(trip.itinerary).map(([day, activities]) => (
              <div
                key={day}
                className="
                    mb-6
                    bg-slate-700
                    p-5
                    rounded-xl
                  ">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">
                  📍 {day}
                </h3>

                <div className="space-y-3">
                  {Array.isArray(activities) &&
                    activities.map((activity, index) => (
                      <div
                        key={index}
                        className="
                              bg-slate-600
                              p-4
                              rounded-lg
                            ">
                        {typeof activity === "string" ? (
                          <p>{activity}</p>
                        ) : (
                          <>
                            <p className="text-cyan-300 font-semibold">
                              {activity.time || "Any Time"}
                            </p>

                            <p>
                              {activity.activity || JSON.stringify(activity)}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-slate-700 p-4 rounded-lg">
              No itinerary generated yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
