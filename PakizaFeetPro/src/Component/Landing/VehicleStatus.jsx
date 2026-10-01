import { useEffect, useState } from "react";
import { Car } from "lucide-react";
import Card from "./Card";

const defaultVehicles = [
  { label: "Available", value: 22, pct: 100, color: "#22c55e" },
  { label: "On Trip", value: 0, pct: 0, color: "#2563eb" },
  { label: "Under Maintenance", value: 0, pct: 0, color: "#f59e0b" },
];


// function Donut() {
  function Donut({ vehicles, total }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  let acc = 0;

  return (
    <svg viewBox="0 0 140 140" className="w-40 h-40 pl-10 -rotate-90 shrink-0">
      <circle cx="70" cy="70" r={R} fill="none" stroke="#f3f4f6" strokeWidth="24" />
      {vehicles.map((s) => {
        const len = (s.value / total) * C;
        const el = (
          <circle key={s.label} cx="70" cy="70" r={R} fill="none"
            stroke={s.color} strokeWidth="24"
            strokeDasharray={`${len} ${C - len}`}
            strokeDashoffset={-acc} />
        );
        acc += len;
        return el;
      })}
    </svg>
  );
}

export default function VehicleStatus() {

const [vehicles, setVehicles] = useState(defaultVehicles);
const [total, setTotal] = useState(22);
const host = import.meta.env.VITE_API_URL


   useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch(
      `${host}/dashboard/vehicle-status-count`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json();
      })
      .then((result) => {
        console.log("Vehicle Status API Response:", result);

        // আপাতত response দেখার জন্য
      })
      .catch((error) => {
        console.error("Vehicle Status fetch error:", error);
      });

  }, []);

  return (
    <Card className=" mt-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center pl-5 gap-3 mt-3">
        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
          <Car size={25} className="text-gray-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Vehicle Status</h3>
          <p className="text-xs text-gray-400">Fleet distribution</p>
        </div>
      </div>

      {/* Donut + Legend */}
      <div className="flex-1 lg:col-span-2 pl-5 pt-15 flex items-center gap-8">
        {/* <Donut /> */}
        <Donut vehicles={vehicles} total={total} />
        <div className="flex-1 mb-10 space-y-4">
          {vehicles.map((v) => (
            <div key={v.label} className="flex items-center mr-10 justify-between gap-4">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: v.color }} />
                {v.label}
              </span>
              <span className="text-sm whitespace-nowrap">
                <b className="text-gray-800">{v.value}</b>
                <span className="text-gray-400 ml-1">({v.pct}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 bg-gray-50 rounded-lg py-4 text-center">
        <p className="text-2xl -mt-10 font-bold text-gray-900">{total}</p>
        <p className="text-xs text-gray-400 mt-0.5">Total Vehicles</p>
      </div>
    </Card>
  );
}