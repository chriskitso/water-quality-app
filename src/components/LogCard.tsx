// src/components/LogCard.tsx
"use client";
import React from "react";

interface LogCardProps {
  log: {
    id: string;
    WaterTemp: number;
    Turbidity: number;
    pH: number;
    TDS: number;
    prediction: string;
    recommendation: string;
    timestamp: string;
  };
}

export const LogCard: React.FC<{ log: LogCardProps["log"] }> = ({ log }) => {
  return (
    <div className="border-2 border-slate-300 p-4 rounded-2xl bg-white shadow-md">
      <div className="flex justify-between items-center">
        <span
          className={`text-white px-2 py-1 rounded text-sm font-semibold ${
            log.prediction === "Safe" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {log.prediction}
        </span>
        <span className="text-xs text-gray-600">
          {new Date(log.timestamp).toLocaleString()}
        </span>
      </div>

      <ul className="mt-2 text-sm text-slate-700 space-y-1">
        <li>
          🌡️ Temp: {log.WaterTemp} °C{" "}
          {log.WaterTemp < 5 || log.WaterTemp > 25 ? (
            <span className="text-red-500 font-semibold">⚠️ Out of range!</span>
          ) : null}
        </li>
        <li>
          🔬 Turbidity: {log.Turbidity} NTU{" "}
          {log.Turbidity > 5 && (
            <span className="text-red-500 font-semibold">⚠️ High!</span>
          )}
        </li>
        <li>
          🧪 pH: {log.pH}{" "}
          {(log.pH < 6.5 || log.pH > 7.5) && (
            <span className="text-red-500 font-semibold">⚠️ Unbalanced!</span>
          )}
        </li>
        <li>
          💧 TDS: {log.TDS} ppm{" "}
          {log.TDS > 500 && (
            <span className="text-red-500 font-semibold">⚠️ Too high!</span>
          )}
        </li>
      </ul>

      <p className="mt-2 text-sm">{log.recommendation}</p>
    </div>
  );
};