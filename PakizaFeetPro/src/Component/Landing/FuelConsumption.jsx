import { useEffect, useState } from "react";
import { Fuel } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";



function WaveIcon() {
  return (
    <svg width="14" height="9" viewBox="0 0 16 10">
      <path
        d="M1 5 Q 4 1, 8 5 T 15 5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FuelConsumption() {
 
  const [data, setData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const host = import.meta.env.VITE_API_URL


  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // console.log("Token:", token);

    fetch(
      `${host}/dashboard/last-six-months-fuel-usage`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log("Status:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json();
      })
      .then((result) => {
        console.log("Backend response:", result);

        if (result.data?.total_cost !== undefined) {
          setTotalCost(Number(result.data.total_cost));
        }

        if (result.data?.total_quantity !== undefined) {
          setTotalConsumption(Number(result.data?.total_quantity));
        }
        // Backend যদি chart data দেয়, তখন সেটা ব্যবহার করবে
        if (result.data?.list && result.data.list.length > 0) {
          setData(result.data.list);
        }

       else{
        setData([]);
       }
      })
      .catch((error) => {
        console.error("Fuel data fetch error:", error);

  setData([]);
  setTotalCost(0);
  setTotalConsumption(0);
        
      });
  }, []);

  return (
    <Card className="mt-5 flex flex-col p-4">

      {/* Header */}
      <div className="flex items-start justify-between mb-3">

        {/* Left */}
        <div className="flex items-center gap-2.5">
          <Fuel size={16} className="text-gray-700" />

          <div>
            <h3 className="text-[14px] font-semibold text-gray-800 leading-tight">
              Fuel Consumption
            </h3>

            <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
              Last 6 months trend
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="text-right">

          <p className="text-[14px] font-bold text-gray-900 leading-tight">
            Total Cost: ৳{totalCost.toLocaleString()}
          </p>

          <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
            Total Consumption: {totalConsumption.toLocaleString()} L
          </p>

        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>

        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 5,
            left: 0,
            bottom: 0,
          }}
        >

          <defs>

            <linearGradient
              id="blueFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#3b82f6"
                stopOpacity={0.3}
              />

              <stop
                offset="100%"
                stopColor="#3b82f6"
                stopOpacity={0.02}
              />
            </linearGradient>

            <linearGradient
              id="greenFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#22c55e"
                stopOpacity={0.4}
              />

              <stop
                offset="100%"
                stopColor="#22c55e"
                stopOpacity={0.03}
              />
            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#eef2f7"
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 11,
            }}
            dy={6}
          />

          {/* Consumption */}
          <YAxis
            yAxisId="left"
            domain={[0, 3800]}
            ticks={[0, 950, 1900, 2850, 3800]}
            tickFormatter={(v) => `${v} L`}
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 11,
            }}
            width={50}
          />

          {/* Cost */}
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 300000]}
            ticks={[0, 75000, 150000, 225000, 300000]}
            tickFormatter={(v) => `৳${v / 1000}k`}
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 11,
            }}
            width={50}
          />

          <Tooltip
            formatter={(value, name) =>
              name === "Consumption"
                ? [`${value.toLocaleString()} L`, name]
                : [`৳${value.toLocaleString()}`, name]
            }
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
            }}
          />

          {/* Blue: Consumption */}
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="consumption"
            name="Consumption"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#blueFill)"
          />

          {/* Green: Cost */}
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="cost"
            name="Cost"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#greenFill)"
          />

        </AreaChart>

      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-1">

        <span className="flex items-center gap-1 text-[13px] text-blue-600 font-medium">
          <WaveIcon />
          Consumption
        </span>

        <span className="flex items-center gap-1 text-[13px] text-green-600 font-medium">
          <WaveIcon />
          Cost
        </span>

      </div>

    </Card>
  );
}