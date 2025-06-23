"use client";

import { useEffect, useState } from "react";
import { LogCard } from "@/components/LogCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";

// Define the log type
type WaterLog = {
  id: string;
  pH: number;
  TDS: number;
  Turbidity: number;
  WaterTemp: number;
  Status: "Safe" | "Unsafe";
  timestamp: string;
  prediction: string;
  recommendation: string;
};

export default function Home() {
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://water-quality-api-drjx.onrender.com/logs");
        const data: WaterLog[] = await res.json();
        const sortedData = data.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setLogs(sortedData);

        // Show grouped alert for the latest log
        const latest = sortedData[0];
        if (latest) {
          const alerts: string[] = [];

          if (latest.pH < 6.5 || latest.pH > 7.5) alerts.push("⚠️ pH level is unbalanced");
          if (latest.TDS > 500) alerts.push("⚠️ TDS exceeds safe limit");
          if (latest.Turbidity > 5) alerts.push("⚠️ Turbidity is high");
          if (latest.WaterTemp < 5 || latest.WaterTemp > 25)
            alerts.push("⚠️ Temperature is out of range");

          if (alerts.length > 0) {
            toast.warn(alerts.join("\n"), {
              position: "top-right",
              autoClose: 8000,
              className: "whitespace-pre-line",
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch logs", error);
      }
      setLoading(false);
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 mt-4 text-teal-800 flex items-center gap-2">
        💧 Live Water Quality Logs
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {logs.map((log) => (
            <LogCard key={log.id} log={log} />
          ))}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2 text-teal-700">📈 View Graphs</h2>
        <Link href="/graph">
          <span className="inline-block bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            Go to Graphs
          </span>
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
}
