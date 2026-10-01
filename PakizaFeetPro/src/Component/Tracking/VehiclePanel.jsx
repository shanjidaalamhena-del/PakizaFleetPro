import { useState } from "react";
import {
  Car,
  Search,
  Circle,
} from "lucide-react";

export default function VehiclePanel({
  vehicleLocations = [],
  onVehicleSelect,
}) {

  
  
//   const[search,setSearch]=useState("");

//  const [search, setSearch] = useState("all");
 

const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("all");

  const movingVehicles = vehicleLocations.filter(
  (vehicle) => vehicle.speed > 0
);




const idleVehicles = vehicleLocations.filter(
  (vehicle) => vehicle.speed <= 0
);


// const filteredVehicles = (vehicleLocations || []).filter((vehicle) =>
//     vehicle.vehicle_number?.toLowerCase().includes(search.toLowerCase())
//   ); 

const filteredVehicles = (vehicleLocations || []).filter((vehicle) => {
  const matchesSearch = vehicle.vehicle_number
    ?.toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "moving"
      ? vehicle.speed > 0
      : statusFilter === "idle"
      ? vehicle.speed <= 0
      : true;

  return matchesSearch && matchesStatus;
});


  return (
    <div className="w-[280px]  shrink-0 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">

      {/* Panel Header */}
      <div className="flex items-center justify-between">

        <div>
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-green-500 text-green-500" />

            <h2 className="text-sm font-semibold text-gray-900">
              Live Fleet
            </h2>
          </div>

          <p className="mt-1 text-xs text-gray-500">
            Real-time GPS vehicle tracking
          </p>
        </div>

        <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
          🚗 {vehicleLocations.length} Total
        </div>

      </div>

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-3 rounded-lg border border-gray-100 p-1">

  {/* All */}
  <button
    onClick={() => setStatusFilter("all")}
    className={`rounded-md py-2 text-xs font-medium ${
      statusFilter === "all" ? "bg-gray-100" : ""
    }`}
  >
    All
    <div className="font-bold">{vehicleLocations.length}</div>
  </button>

  {/* Moving */}
  <button
    onClick={() => setStatusFilter("moving")}
    className={`rounded-md py-2 text-xs ${
      statusFilter === "moving"
        ? "bg-green-50 text-green-600 font-medium"
        : "text-gray-500"
    }`}
  >
    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />
    Moving
    <div className="font-bold text-gray-700">
      {movingVehicles.length}
    </div>
  </button>

  {/* Idle */}
  <button
    onClick={() => setStatusFilter("idle")}
    className={`rounded-md py-2 text-xs ${
      statusFilter === "idle"
        ? "bg-gray-100 text-gray-700 font-medium"
        : "text-gray-500"
    }`}
  >
    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-gray-400" />
    Idle
    <div className="font-bold text-gray-700">
      {idleVehicles.length}
    </div>
  </button>

</div>





      {/* Search */}
      <div className="relative mt-3">

        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search vehicle number..."
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-blue-500"
        />

      </div>


      {/* All Vehicles */}
      <div className="mt-5 rounded-xl border border-gray-300 bg-gray-50 p-3">

        <div className="flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
            <Car className="h-4 w-4" />
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-800">
              All Vehicles
            </p>

            <p className="text-[10px] text-gray-500">
              Show entire fleet on map
            </p>
          </div>

          <span className="text-xs">◉</span>

        </div>

      </div>


      {/* Vehicle List */}
      <div className="mt-2 max-h-[520px] space-y-2 overflow-y-auto">

        {filteredVehicles.map((vehicle) => (

          <div
            key={vehicle.id}
              onClick={() => onVehicleSelect(vehicle)}
            className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 hover:bg-gray-50"
          >

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <Car className="h-4 w-4 text-gray-500" />
            </div>

            <div className="flex-1">

              <p className="text-xs font-semibold text-gray-800">
                {vehicle.vehicle_number}
              </p>

              <p className="text-[10px] text-gray-500">
                •  {vehicle.speed > 0 ? "Moving" : "Stationary"}
              </p>

            </div>

            <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] text-gray-500">
              {vehicle.speed > 0 ? "Moving" : "Idle"}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}