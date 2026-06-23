import Link from "next/link";

export default function TripCard({ trip }) {
  return (
    <Link href={`/trip/${trip._id}`}>
      <div
        className="
          bg-slate-800
          p-6
          rounded-xl
          shadow-lg
          hover:shadow-blue-500/20
          hover:scale-105
          cursor-pointer
          border
          border-slate-700
        ">
        <h2 className="text-2xl font-bold text-blue-400">
          🌍 {trip.destination}
        </h2>

        <p className="mt-3 text-slate-300">📅 {trip.days} Days</p>

        <p className="text-slate-300">💰 {trip.budgetType}</p>

        {trip.favorite && <span className="text-yellow-400">⭐ Favorite</span>}
      </div>
    </Link>
  );
}
