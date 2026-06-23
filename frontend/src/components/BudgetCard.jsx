export default function BudgetCard({ budget }) {
  return (
    <div
      className="
      bg-slate-800
      rounded-xl
      p-6
      border
      border-slate-700
    ">
      <h2 className="text-xl font-bold mb-4">💰 Budget Estimate</h2>

      <p>
        Flights:
        {budget?.flights}
      </p>

      <p>
        Accommodation:
        {budget?.accommodation}
      </p>

      <p>
        Food:
        {budget?.food}
      </p>

      <p>
        Activities:
        {budget?.activities}
      </p>

      <p className="font-bold mt-3">
        Total:
        {budget?.total}
      </p>
    </div>
  );
}
