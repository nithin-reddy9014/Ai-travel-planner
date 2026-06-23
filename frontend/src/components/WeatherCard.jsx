export default function WeatherCard({ weather }) {
  const current = weather?.current_condition?.[0];

  if (!current) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold mb-4">🌤 Weather</h2>

        <p>No weather data available</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h2 className="text-xl font-bold mb-4">🌤 Current Weather</h2>

      <div className="space-y-2">
        <p>🌡 Temperature: {current.temp_C}°C</p>

        <p>🤗 Feels Like: {current.FeelsLikeC}°C</p>

        <p>💧 Humidity: {current.humidity}%</p>

        <p>☁️ Cloud Cover: {current.cloudcover}%</p>

        <p>🌦 Rain: {current.precipMM} mm</p>
      </div>
    </div>
  );
}
