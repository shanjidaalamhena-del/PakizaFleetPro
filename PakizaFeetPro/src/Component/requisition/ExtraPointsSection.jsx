import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function ExtraPointsSection({ extraPoints, setExtraPoints }) {
  // props na dile nijer internal state (standalone o cholbe)
  const [local, setLocal] = useState([]);

  const points = extraPoints ?? local;
  const setPoints = setExtraPoints ?? setLocal;

  /* Notun row add */
  const addPoint = () =>
    setPoints([...points, { id: Date.now(), location: "", charge: "" }]);

  /* Row delete */
  const removePoint = (id) =>
    setPoints(points.filter((p) => p.id !== id));

  /* Row er field update */
  const updatePoint = (id, key, value) =>
    setPoints(points.map((p) => (p.id === id ? { ...p, [key]: value } : p)));

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header: title left + button right */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Extra Points / Charges
        </h2>

        <button
          type="button"
          onClick={addPoint}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Extra Point / Charges
        </button>
      </div>

      {/* Body: khali thakle dashed box, row thakle input gulo */}
      {points.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">
          No extra points added yet
        </div>
      ) : (
        <div className="space-y-3">
          {points.map((point, index) => (
            <div
              key={point.id}
              className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_240px_auto]"
            >
              {/* Location input */}
              <input
                type="text"
                value={point.location}
                placeholder={`Extra point ${index + 1} — location name`}
                onChange={(e) => updatePoint(point.id, "location", e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {/* Charge input */}
              <input
                type="text"
                value={point.charge}
                placeholder="Charge (৳)"
                onChange={(e) => updatePoint(point.id, "charge", e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {/* Delete button */}
              <button
                type="button"
                onClick={() => removePoint(point.id)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100 active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}