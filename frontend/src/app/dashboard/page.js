"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import TripCard from "@/components/TripCard";
import StatsCard from "@/components/StatsCard";

import { getTrips } from "@/services/tripService";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchTrips() {
      try {
        const data = await getTrips();

        if (isMounted) {
          setTrips(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrips();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-8">
        {/* Hero Section */}
        <div
          className="
          bg-gradient-to-r
          from-blue-600
          via-cyan-500
          to-teal-500
          rounded-3xl
          p-10
          mb-10
          shadow-2xl
        ">
          <h1 className="text-5xl font-extrabold mb-3">Welcome Back 👋</h1>

          <p className="text-lg text-slate-100">
            Plan, Explore and Discover the world with AI-powered travel
            planning.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <StatsCard title="Trips Created" value={trips.length} />

          <StatsCard
            title="Favorites"
            value={trips.filter((trip) => trip.favorite).length}
          />

          <StatsCard title="Destinations" value={trips.length} />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Trips</h2>

          <Link
            href="/create-trip"
            className="
              bg-cyan-500
              hover:bg-cyan-600
              transition
              px-6
              py-3
              rounded-xl
              font-semibold
              shadow-lg
            ">
            ✈️ Create Trip
          </Link>
        </div>

        {/* Empty State */}
        {trips.length === 0 ? (
          <div
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-2xl
              p-12
              text-center
            ">
            <h3 className="text-2xl font-bold mb-3">No Trips Yet</h3>

            <p className="text-slate-400 mb-6">
              Create your first AI-powered travel plan.
            </p>

            <Link
              href="/create-trip"
              className="
                bg-cyan-500
                px-6
                py-3
                rounded-xl
                font-semibold
              ">
              Create Trip
            </Link>
          </div>
        ) : (
          <div
            className="
              grid
              lg:grid-cols-3
              md:grid-cols-2
              gap-6
            ">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
