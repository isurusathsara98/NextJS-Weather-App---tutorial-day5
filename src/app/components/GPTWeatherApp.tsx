"use client";

import { useState } from "react";

type WeatherData = {
  name: string;
  sys: { country: string };
  main: { temp: number; feels_like: number; humidity: number; temp_min: number; temp_max: number };
  wind: { speed: number };
  weather: { description: string; icon: string }[];
};

// Dummy fallback data
const DUMMY_WEATHER: WeatherData = {
  name: "Stockholm",
  sys: { country: "SE" },
  main: {
    temp: 18,
    feels_like: 17,
    humidity: 52,
    temp_min: 16,
    temp_max: 21,
  },
  wind: { speed: 4.2 },
  weather: [
    { description: "partly cloudy", icon: "03d" },
  ],
};

export default function GPTWeatherApp() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Instead of calling the API, simulate a delay & show dummy data
  const getWeather = async () => {
    setLoading(true);
    setErr("");
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Randomize temperature slightly for fun
      const randomTemp = 15 + Math.floor(Math.random() * 10);
      const dummy = {
        ...DUMMY_WEATHER,
        name: city || "Stockholm",
        main: { ...DUMMY_WEATHER.main, temp: randomTemp },
      };
      setData(dummy);
    } catch {
      setErr("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center  bg-gradient-to-br from-sky-300 to-indigo-500 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Day 5: Weather App ☁️</h1>

        <div className="flex gap-2 mb-4">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            onClick={getWeather}
            className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-800 transition"
          >
            Search
          </button>
        </div>

        {loading && <p>Loading dummy data...</p>}
        {err && <p className="text-red-600">{err}</p>}

        {data && !loading && (
          <div className="mt-4 bg-slate-50 rounded-lg p-4 shadow">
            <h2 className="text-2xl font-semibold">
              {data.name}, {data.sys.country}
            </h2>
            <p className="text-4xl font-bold text-sky-700 mt-2">
              {Math.round(data.main.temp)}°C
            </p>
            <p className="capitalize text-slate-600 mt-1">
              {data.weather[0].description}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <p>Feels like: {data.main.feels_like}°C</p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Wind speed: {data.wind.speed} m/s</p>
              <p>
                Min/Max: {data.main.temp_min} – {data.main.temp_max}°C
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
