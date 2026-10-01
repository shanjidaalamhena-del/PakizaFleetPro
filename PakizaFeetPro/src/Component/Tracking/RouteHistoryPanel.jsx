import { useState, useEffect } from "react";
import {
  Car,
  Clock,
  Calendar,
  Play,
  RotateCcw,
  Flag,
  X,
  Triangle,
  AlertCircle,
} from "lucide-react";

const DURATIONS = ["10 min", "30 min", "1h", "2h", "12h", "1d", "2d", "7d"];
const SPEEDS = ["0.5x", "1x", "2x", "4x"];

export default function RouteHistoryPanel({
  vehicleLocations = [],
  onVehicleSelect,
  backtrackData,
  setBacktrackData,
  playbackIndex,
  setPlaybackIndex,
  speed,
  setSpeed,
}) {
  const [duration, setDuration] = useState("1d");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [playing, setPlaying] = useState(false);

  const [vehicleSearch, setVehicleSearch] = useState("");
  const [showVehicles, setShowVehicles] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredVehicles = vehicleLocations.filter((vehicle) =>
    vehicle.vehicle_number
      ?.toLowerCase()
      .includes(vehicleSearch.toLowerCase())
  );

  const getBacktrack = async () => {
    console.log("GET BACKTRACK CALLED");

    if (!selectedVehicle) {
      console.log("NO VEHICLE SELECTED");
      alert("Please select a vehicle");
      return false;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");
      const host = import.meta.env.VITE_API_URL;

      console.log(
        "Selected vehicle:",
        selectedVehicle.vehicle_number
      );

      console.log("Duration:", duration);

      const response = await fetch(
        `${host}/master-data/vehicle/backtrack?vehicle_number=${encodeURIComponent(
          selectedVehicle.vehicle_number
        )}&duration=${duration}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log("BACKTRACK RESPONSE:", result);
      console.log("BACKTRACK DATA:", result.data);

      if (response.ok) {
        setBacktrackData(result.data || []);
        return true;
      } else {
        console.error(
          result.message || "Failed to get backtrack data"
        );
        return false;
      }
    } catch (error) {
      console.error("Backtrack error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Playback controller
  useEffect(() => {
    if (!playing || !backtrackData?.length) {
      return;
    }

    const speedValue = parseFloat(speed) || 1;

    const interval = setInterval(() => {
      setPlaybackIndex((currentIndex) => {
        if (currentIndex >= backtrackData.length - 1) {
          setPlaying(false);
          return currentIndex;
        }

        return currentIndex + 1;
      });
    }, 1000 / speedValue);

    return () => clearInterval(interval);
  }, [
    playing,
    backtrackData,
    speed,
    setPlaybackIndex,
  ]);

  return (
    <aside className="w-80 shrink-0 overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

      {/* Title */}
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-gray-700" />

        <h2 className="text-sm font-semibold text-gray-900">
          Route History
        </h2>
      </div>

      <p className="mt-0.5 text-xs text-gray-500">
        Select vehicle and range.
      </p>

      {/* Select Vehicle */}
      <p className="mt-4 text-xs font-medium text-gray-600">
        Select Vehicle
      </p>

      <div className="relative mt-1.5">

        {/* Search box */}
        <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={vehicleSearch}
          onChange={(e) => {
            setVehicleSearch(e.target.value);
            setShowVehicles(true);
          }}
          onFocus={() => setShowVehicles(true)}
          placeholder="Search vehicle..."
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-8 text-sm outline-none focus:border-blue-500"
        />

        {/* Clear vehicle */}
        {vehicleSearch && (
          <button
            type="button"
            onClick={() => {
              setVehicleSearch("");
              setSelectedVehicle(null);
              setBacktrackData([]);
              setPlaybackIndex(0);
              setPlaying(false);
              setShowVehicles(false);
              onVehicleSelect(null);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Vehicle list */}
        {showVehicles && filteredVehicles.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">

            {filteredVehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => {
                  setSelectedVehicle(vehicle);
                  setBacktrackData([]);
                  setPlaybackIndex(0);
                  setPlaying(false);

                  onVehicleSelect(vehicle);

                  setVehicleSearch(vehicle.vehicle_number);
                  setShowVehicles(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <Car className="h-4 w-4 text-gray-400" />

                {vehicle.vehicle_number}
              </button>
            ))}

          </div>
        )}

      </div>

      {/* Quick Duration */}
      <div className="mt-4 flex items-center justify-between">

        <p className="flex items-center gap-1 text-xs font-medium text-gray-600">
          <Clock className="h-3.5 w-3.5" />
          Quick Duration
        </p>

        <button
          onClick={() => setDuration("")}
          className="text-xs text-gray-500 hover:text-gray-800"
        >
          Clear
        </button>

      </div>

      <div className="mt-2 grid grid-cols-4 gap-2">

        {DURATIONS.map((d) => (
          <button
            key={d}
            onClick={() => setDuration(d)}
            className={`rounded-lg border px-1 py-2 text-xs font-medium transition ${
              duration === d
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {d}
          </button>
        ))}

      </div>

      {/* Custom Date Range */}
      <p className="mt-4 flex items-center gap-1 text-xs font-medium text-gray-600">
        <Calendar className="h-3.5 w-3.5" />
        Custom Date Range
      </p>

      <label className="mt-1.5 block text-[11px] text-gray-500">
        From
      </label>

      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />

      <label className="mt-2 block text-[11px] text-gray-500">
        To
      </label>

      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />

      {/* Route Playback */}
      <p className="mt-4 text-xs font-medium text-gray-600">
        Route Playback
      </p>

      <div className="mt-2 flex items-center gap-2">

        <button
          className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-700"
        >
          <Flag className="h-3 w-3" />
          Skip Stops
        </button>

        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
              speed === s
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {s}
          </button>
        ))}

      </div>

      {/* Play controls + progress */}
      <div className="mt-3 flex items-center gap-3">

        {/* Play / Pause */}
        <button
          // 
          onClick={async () => {
  console.log("PLAY CLICKED");

  if (!selectedVehicle) {
    console.log("NO SELECTED VEHICLE");
    alert("Please select a vehicle");
    return;
  }

  // Backtrack data না থাকলে আগে API call হবে
  if (!backtrackData?.length) {
    const success = await getBacktrack();

    if (success) {
      setPlaybackIndex(0);
      setPlaying(true);
    }

    return;
  }

  // Route শেষ হয়ে গেলে আবার শুরু হবে
  if (playbackIndex >= backtrackData.length - 1) {
    setPlaybackIndex(0);
    setPlaying(true);
    return;
  }

  // Play / Pause
  setPlaying(!playing);
}}
          disabled={loading}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            "..."
          ) : playing ? (
            "❚❚"
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>

        {/* Reset */}
        <button
          onClick={() => {
            setPlaying(false);
            setPlaybackIndex(0);
          }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        {/* Progress */}
        <div className="flex-1">

          <p className="text-[11px] text-gray-500">
            Point{" "}
            {backtrackData.length > 0
              ? playbackIndex + 1
              : 0}
            /{backtrackData.length}
          </p>

          <div className="mt-1 h-1.5 rounded-full bg-gray-200">

            <div
              className="h-1.5 rounded-full bg-gray-900"
              style={{
                width:
                  backtrackData.length > 0
                    ? `${((playbackIndex + 1) /
                        backtrackData.length) *
                        100}%`
                    : "0%",
              }}
            />

          </div>

        </div>

        {/* Percentage */}
        <span className="text-[11px] text-gray-500">
          {backtrackData.length > 0
            ? `${Math.round(
                ((playbackIndex + 1) /
                  backtrackData.length) *
                  100
              )}%`
            : "0%"}
        </span>

      </div>

      {/* Stats */}
      <div className="mt-4 space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-3">

        {/* Row 1: Speed + Stops */}
        <div className="grid grid-cols-2 gap-3">

          <div>
            <p className="text-[11px] text-gray-500">
              Current Speed
            </p>

            <p className="mt-0.5 flex items-center gap-1 text-sm font-semibold text-gray-800">
              <Triangle className="h-3 w-3 fill-gray-900 text-gray-900" />
              21 km/h
            </p>
          </div>

          <div>
            <p className="text-[11px] text-gray-500">
              Total Stops
            </p>

            <p className="mt-0.5 flex items-center gap-1 text-sm font-semibold text-black-600">
              <AlertCircle className="h-4 w-4 fill-red-400 text-white" />
              5 stops
            </p>
          </div>

        </div>

        {/* Row 2: Timestamp */}
        <div>
          <p className="text-[11px] text-gray-500">
            Timestamp
          </p>

          <p className="mt-0.5 text-sm font-semibold text-gray-800">
            9/27/2026, 7:40:43 AM
          </p>
        </div>

        {/* Row 3: Status */}
        <div>
          <p className="text-[11px] text-gray-500">
            Status
          </p>

          <p className="mt-0.5 text-sm font-semibold text-emerald-600">
            Moving
          </p>
        </div>

      </div>

    </aside>
  );
}