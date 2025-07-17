'use client';
import React, { useState } from 'react';

export default function WeatherMCPClient() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch('/api/llm-mcp-weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'ask',
          params: { query },
          id: '1'
        })
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setWeather(data.result);
      }
    } catch (err) {
      setError('Something went wrong');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Ask Weather (via Gemini + MCP with JSON-RPC)</h1>
      <input
        type="text"
        placeholder="e.g., Is it raining in Montreal?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={fetchWeather}
        disabled={loading || !query.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Loading...' : 'Ask Weather'}
      </button>

      {error && (
        <div className="mt-4 text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}

      {weather && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Summary for {weather.location}</h2>
          <p className="mb-4">{weather.summary}</p>

          <details className="cursor-pointer">
            <summary className="text-blue-700 underline">Raw Weather Data</summary>
            <div className="mt-2 text-sm text-gray-700">
              <p><strong>Temperature:</strong> {weather.raw.temp_c}°C</p>
              <p><strong>Condition:</strong> {weather.raw.condition}</p>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
