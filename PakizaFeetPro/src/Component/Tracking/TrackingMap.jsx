import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Simple vehicle icon
const vehicleIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 36px;
      height: 46px;
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    ">
      
      <!-- Gray location pin -->
      <div style="
        width: 36px;
        height: 36px;
        background: #6b7280;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        position: absolute;
        top: 0;
        left: 0;
      "></div>

      <!-- White round center -->
      <div style="
        width: 24px;
        height: 24px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 6px;
        left: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6b7280"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 17h14l1-5-2-5H6l-2 5 1 5Z"/>
          <path d="M7 17v2"/>
          <path d="M17 17v2"/>
          <circle cx="7.5" cy="14.5" r="3"/>
          <circle cx="16.5" cy="14.5" r="3"/>
        </svg>
      </div>

    </div>
  `,
  iconSize: [36, 46],
  iconAnchor: [18, 46],
});


// Zoom Control
function ZoomControl() {
  const map = useMap();

  return (
    <div className="absolute right-3 top-3 z-[1000] flex flex-col">
      <button
        onClick={() => map.zoomIn()}
        className="h-8 w-8 bg-white border border-gray-300 text-xl hover:bg-gray-100"
      >
        +
      </button>

      <button
        onClick={() => map.zoomOut()}
        className="h-8 w-8 bg-white border border-gray-300 text-xl hover:bg-gray-100"
      >
        −
      </button>
    </div>
  );
}


// Move map to selected vehicle
// function SelectedVehicle({ selectedVehicle }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!selectedVehicle) return;

//     map.setView(
//   [
//     Number(selectedVehicle.latitude),
//     Number(selectedVehicle.longitude),
//   ],
//   16
// );
//   }, [selectedVehicle, map]);

//   return null;
// }
// Make map follow moving vehicle
function MapFollower({ vehiclePosition }) {
  const map = useMap();

  useEffect(() => {
    if (!vehiclePosition) return;

    const [latitude, longitude] = vehiclePosition;

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }

    map.panTo(
      [latitude, longitude],
      {
        animate: true,
        duration: 0.4,
      }
    );
  }, [vehiclePosition, map]);

  return null;
}





function SelectedVehicle({ selectedVehicle }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedVehicle) return;

    const latitude = Number(selectedVehicle.latitude);
    const longitude = Number(selectedVehicle.longitude);

  //    console.log("SELECTED VEHICLE:", selectedVehicle.vehicle_number);
  // console.log("NEW LOCATION:", latitude, longitude);
  // console.log("MAP CENTERING...");

  console.log({
 vehicle: selectedVehicle.vehicle_number,
latitude: selectedVehicle.latitude,
longitude: selectedVehicle.longitude,
speed: selectedVehicle.speed,
timestamp: selectedVehicle.timestamp,
created_at: selectedVehicle.created_at,
updated_at: selectedVehicle.updated_at,
});

    if (!latitude || !longitude) return;

    map.setView(
      [latitude, longitude],
       map.getZoom(),
      //  16,
      {
        animate: true,
        duration: 1,
      }
    );
  }, [
    selectedVehicle?.latitude,
    selectedVehicle?.longitude,
    map,
  ]);

  return null;
}
 


// Smooth moving vehicle
function SmoothVehicleMarker({
  selectedVehicle,
  backtrackData,
  playbackIndex,
  speed,
  onPositionChange,
}) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!backtrackData?.length) return;

    const currentPoint = backtrackData[playbackIndex];
    const nextPoint = backtrackData[playbackIndex + 1];

    if (!currentPoint) return;

    // Last point
    if (!nextPoint) {
      setPosition([
        currentPoint.latitude,
        currentPoint.longitude,
      ]);

      onPositionChange?.([
  Number(currentPoint.latitude),
  Number(currentPoint.longitude),
]);
      return;
    }
    

    let animationFrame;

    const startTime = performance.now();

    // Speed অনুযায়ী duration
    const speedValue = parseFloat(speed) || 1;

    const duration = 500 / speedValue;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;

      let progress = elapsed / duration;

      if (progress > 1) {
        progress = 1;
      }

      // Smooth easing
      const smoothProgress =
        progress * progress * (3 - 2 * progress);

      const latitude =
        currentPoint.latitude +
        (nextPoint.latitude - currentPoint.latitude) *
          smoothProgress;

      const longitude =
        currentPoint.longitude +
        (nextPoint.longitude - currentPoint.longitude) *
          smoothProgress;

      setPosition([
        latitude,
        longitude,
      ]);

  onPositionChange?.([
  latitude,
  longitude,
]);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [backtrackData, playbackIndex, speed]);

  if (!position || !selectedVehicle) {
    return null;
  }

  return (
    <Marker
      position={position}
      icon={vehicleIcon}
    >
      <Popup>
        <div>
          <p className="font-semibold">
            {selectedVehicle.vehicle_number}
          </p>

          <p className="text-sm text-gray-500">
            Historical Route
          </p>
        </div>
      </Popup>
    </Marker>
  );
}


export default function TrackingMap({
  vehicleLocations,
  selectedVehicle,
  backtrackData,
  playbackIndex,
  speed,
}) {
  
    const [vehiclePosition, setVehiclePosition] = useState(null);
  return (
    <div className="flex-1 ml-3 min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={9}
        scrollWheelZoom={true}
        zoomControl={false}
        className="relative h-[calc(120vh-0px)] w-full"
      >

        <ZoomControl />

<MapFollower
  vehiclePosition={vehiclePosition}
/>
        <SelectedVehicle
          selectedVehicle={selectedVehicle}
        />

        <TileLayer
          attribution="OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* Historical Route */}
        {backtrackData?.length > 0 && (
          <Polyline
            positions={backtrackData.map((point) => [
             Number(point.latitude),
              Number(point.longitude),
            ])}
          />
        )}


        {/* Smooth Moving Vehicle */}
        {backtrackData?.length > 0 && (
          <SmoothVehicleMarker
            selectedVehicle={selectedVehicle}
            backtrackData={backtrackData}
            playbackIndex={playbackIndex}
            speed={speed}
            onPositionChange={setVehiclePosition}
          />
        )}

{(selectedVehicle
  ? [selectedVehicle]
  : vehicleLocations
).map((vehicle) => (
  <Marker
    key={vehicle.vehicle_number}
    position={[
      Number(vehicle.latitude),
      Number(vehicle.longitude),
    ]}
    icon={vehicleIcon}
  >
    <Popup>
      <div>
        <p className="font-semibold">
          Vehicle
        </p>

        <p className="text-sm">
          {vehicle.vehicle_number}
        </p>

        <p className="text-xs text-gray-500">
          Status:{" "}
          {Number(vehicle.speed) > 0
            ? "Moving"
            : "Idle"}
        </p>
      </div>
    </Popup>
  </Marker>
))}
        {/* Current Vehicle Markers */}
        {/* {vehicleLocations.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[
              vehicle.latitude,
              vehicle.longitude,
            ]}
            icon={vehicleIcon}
          >

            <Popup>

              <div>

                <p className="font-semibold">
                  Vehicle
                </p>

                <p className="text-sm">
                  {vehicle.vehicle_number}
                </p>

                <p className="text-xs text-gray-500">
                  Status:{" "}
                  {vehicle.speed > 0
                    ? "Moving"
                    : "Idle"}
                </p>

              </div>

            </Popup>

          </Marker>
        ))} */}

      </MapContainer>

    </div>
  );
}