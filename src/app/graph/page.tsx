// app/graph/page.tsx
"use client";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export default function GraphPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("https://water-quality-api-drjx.onrender.com/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data.reverse()))
      .catch((err) => console.error("Failed to load logs:", err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center text-teal-800 mb-6">
        📈 Parameter Trends Over Time
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {["pH", "TDS", "Turbidity", "WaterTemp"].map((param, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-4 border">
            <h3 className="text-lg font-semibold mb-2 text-teal-700">{param} Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={logs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={param} stroke="#0d9488" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
