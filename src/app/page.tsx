"use client";

import { useEffect, useState } from "react";
import { LogCard } from "@/components/LogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type WaterLog = {
  id: string;
  pH: number;
  TDS: number;
  Turbidity: number;
  WaterTemp: number;
  Status: "Safe" | "Unsafe";
  timestamp: string;
  prediction: string;         // ✅ add this
  recommendation: string;     // ✅ add this
};


export default function Home() {
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://water-quality-api-drjx.onrender.com/logs");
        const data: WaterLog[] = await res.json();
        const sortedData = data.sort(
          (a: WaterLog, b: WaterLog) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setLogs(sortedData);

        const latest = sortedData[0];
        if (latest) {
          if (latest.pH < 6.5 || latest.pH > 7.5) toast.warn("⚠️ pH level is unbalanced!");
          if (latest.TDS > 500) toast.warn("⚠️ TDS exceeds safe limit!");
          if (latest.Turbidity > 5) toast.warn("⚠️ Turbidity is high!");
          if (latest.WaterTemp < 5 || latest.WaterTemp > 25)
            toast.warn("⚠️ Temperature is out of range!");
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

  const filteredLogs = logs.filter((log: WaterLog) => {
    const matchesSearch = searchTerm
      ? Object.values(log).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    const matchesFilter =
      filter === "safe"
        ? log.Status === "Safe"
        : filter === "unsafe"
        ? log.Status === "Unsafe"
        : filter === "alerts"
        ? log.Status === "Unsafe"
        : true;

    const matchesStartDate = startDate ? new Date(log.timestamp) >= startDate : true;
    const matchesEndDate = endDate ? new Date(log.timestamp) <= endDate : true;

    return matchesSearch && matchesFilter && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 mt-4 text-teal-800 flex items-center gap-2">
        💧 Live Water Quality Logs
      </h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "safe" ? "default" : "outline"}
          onClick={() => setFilter("safe")}
        >
          Safe
        </Button>
        <Button
          variant={filter === "unsafe" ? "default" : "outline"}
          onClick={() => setFilter("unsafe")}
        >
          Unsafe
        </Button>
        <Button
          variant={filter === "alerts" ? "default" : "outline"}
          onClick={() => setFilter("alerts")}
        >
          Alerts Only
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Input
          placeholder="Search pH, TDS, Temp..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <DatePicker date={startDate} onDateChange={setStartDate} placeholder="Start Date" />
        <DatePicker date={endDate} onDateChange={setEndDate} placeholder="End Date" />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLogs.map((log) => (
            <LogCard key={log.id} log={log} />
          ))}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
