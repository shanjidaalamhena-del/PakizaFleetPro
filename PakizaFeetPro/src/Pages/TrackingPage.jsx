import { useEffect, useState } from "react";
import TrackingHeader from '../Component/Tracking/TrackingHeader'
import VehiclePanel from '../Component/Tracking/VehiclePanel'
import TrackingMap from '../Component/Tracking/TrackingMap'
import RouteHistoryPanel from "../Component/Tracking/RouteHistoryPanel";

export default function TrackingPage() {
const [selectedVehicle, setSelectedVehicle] = useState(null);
 const [vehicleLocations, setVehicleLocations] = useState([]);
const [activeTab, setActiveTab] = useState("live");
const [speed, setSpeed] = useState("1x");
const [backtrackData, setBacktrackData] = useState([]);
const [playbackIndex, setPlaybackIndex] = useState(0);

 const host = import.meta.env.VITE_API_URL

  useEffect(() => {
    const getVehicleLocations = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(
          `${host}/master-data/vehicle/location`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        console.log("Vehicle Location Response:", result);

        // if (response.ok) {
        //   setVehicleLocations(result.data || []);
        // } else {
        //   console.error(
        //     result.message || "Failed to get vehicle locations"
        //   );
        // }
  if (response.ok && Array.isArray(result.data)) {
        setVehicleLocations(result.data);

        // Selected vehicle-এর নতুন location update
        setSelectedVehicle((currentSelected) => {
          if (!currentSelected) return null;

          const updatedVehicle = result.data.find(
            (vehicle) =>
              vehicle.vehicle_number ===
              currentSelected.vehicle_number
          );
//           console.log(
//   "SELECTED VEHICLE LOCATION:",
//   updatedVehicle?.vehicle_number,
//   updatedVehicle?.latitude,
//   updatedVehicle?.longitude
// );
console.log(
  "SELECTED VEHICLE:",
  updatedVehicle?.vehicle_number,
  "LAT:",
  updatedVehicle?.latitude,
  "LONG:",
  updatedVehicle?.longitude,
  "SPEED:",
  updatedVehicle?.speed,
  "TIMESTAMP:",
  updatedVehicle?.timestamp
);
// console.log("FULL SELECTED VEHICLE:", updatedVehicle);
          return updatedVehicle || currentSelected;
        });
      }
      } catch (error) {
        console.error("Vehicle location error:", error);
      }
    };

    getVehicleLocations();
const interval = setInterval(() => {
    getVehicleLocations();
  }, 3000);

  return () => clearInterval(interval);
}, [host]);


  return (
    <div>

       <TrackingHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-3 flex flex-row">
        {/* LEFT PANEL: tab onujayi switch */}
        {activeTab === "live" ? (
          <VehiclePanel
            vehicleLocations={vehicleLocations}
            onVehicleSelect={setSelectedVehicle}
          />

        ) : (
         <RouteHistoryPanel
  vehicleLocations={vehicleLocations}
  onVehicleSelect={setSelectedVehicle}
  backtrackData={backtrackData}
  setBacktrackData={setBacktrackData}
  playbackIndex={playbackIndex}
  setPlaybackIndex={setPlaybackIndex}
   speed={speed}
  setSpeed={setSpeed}
  
/>
        )}

        {/* MAP — always dekhabe */}
        <TrackingMap
          vehicleLocations={vehicleLocations}
          selectedVehicle={selectedVehicle}
        backtrackData={backtrackData}
       playbackIndex={playbackIndex}
        speed={speed}
  
       />
      </div>
    </div>
  )
}
