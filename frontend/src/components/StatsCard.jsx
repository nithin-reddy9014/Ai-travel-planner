export default function StatsCard({ title, value }) {
  return (
    <div
      className="
        bg-slate-800
        rounded-xl
        p-6
        border
        border-slate-700
      ">
      <h3 className="text-slate-400">{title}</h3>

      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}
