import { Map, Navigation, History } from "lucide-react";

export default function TrackingHeader({ activeTab, onTabChange }) {
  return (
    <div className="flex items-center justify-between">

      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <Map className="h-6 w-6 text-gray-800" />

          <h1 className="text-xl font-bold text-gray-900">
            Fleet Operations Hub
          </h1>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          Real-time telemetry and route backtracking
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1">

        {/* Live Tracking */}
        <button
          type="button"
          onClick={() => onTabChange("live")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeTab === "live"
              ? "border border-gray-200 bg-gray-50 text-gray-900 shadow-sm"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Navigation className="h-4 w-4" />
          Live Tracking
        </button>

        {/* Route History */}
        <button
          type="button"
          onClick={() => onTabChange("history")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeTab === "history"
              ? "border border-gray-200 bg-gray-50 text-gray-900 shadow-sm"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <History className="h-4 w-4" />
          Route History
        </button>

      </div>

    </div>
  );
}