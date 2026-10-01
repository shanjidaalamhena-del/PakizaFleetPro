import { useEffect, useState } from "react";
import {
  Car, Route, ClipboardList, Fuel,
  Calendar, Building2, FileText, Package,
} from "lucide-react";
import FuelConsumption from "./FuelConsumption";
 import StatCard from "./StatCard";
import PendingRequisitions from "./PendingRequisitions";
 import ExpiryAlerts from "./ExpiryAlerts";
 import VehicleStatus from "./VehicleStatus";
const host = import.meta.env.VITE_API_URL

const API_URL = `${host}/dashboard/card-data`;

export default function Dashboard() {
  /* ---------- State ---------- */
  const [cardData, setCardData] = useState(null);

  /* ---------- API call ---------- */
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Card API:", data);
        setCardData(data);
      })
      .catch((err) => console.error("Card API Error:", err));
  }, []);

  /* ---------- Stat cards (API → fallback 0) ---------- */
  const d = cardData?.data ?? {};

  const stats = [
    { label: "Total Vehicles",       value: d.total_vehicles ?? 0,             icon: Car,           iconBg: "bg-teal-50",   iconColor: "text-teal-600" },
    { label: "Active Trips",         value: d.total_active_trip ?? 0,          icon: Route,         iconBg: "bg-teal-50",   iconColor: "text-teal-600" },
    { label: "Pending Requisitions", value: d.total_pending_requisitions ?? 0, icon: ClipboardList, iconBg: "bg-amber-50",  iconColor: "text-amber-600" },
    { label: "Monthly Fuel Cost",    value: `৳${d.monthly_fuel_cost ?? 0}`,    icon: Fuel,          iconBg: "bg-red-50",    iconColor: "text-red-600" },
    { label: "Upcoming Services",    value: d.total_upcoming_service ?? 0,     icon: Calendar,      iconBg: "bg-blue-50",   iconColor: "text-blue-600" },
    { label: "Rental Companies",     value: d.total_rental_companies ?? 0,     icon: Building2,     iconBg: "bg-blue-50",   iconColor: "text-blue-600" },
    { label: "Pending Estimations",  value: d.total_estimate_cost ?? 0,        icon: FileText,      iconBg: "bg-blue-50",   iconColor: "text-blue-600" },
    { label: "Pending Actual Cost",  value: d.total_actual_cost ?? 0,          icon: Package,       iconBg: "bg-orange-50", iconColor: "text-orange-600" },
  ];

  /* ---------- UI ---------- */
  return (
    <div className="space-y-5">
      {/* Top: 8 stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Middle: Requisitions + Expiry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PendingRequisitions />
        <ExpiryAlerts />
      </div>

      {/* Bottom: Chart + Vehicle status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
       <FuelConsumption/>
        <VehicleStatus />
      </div>
    </div>
  );
}