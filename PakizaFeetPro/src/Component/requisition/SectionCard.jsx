import { useState } from "react";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

/* ---------------- Data ---------------- */
const VEHICLE_TYPES = [
  { value: "car", label: "Car" },
  { value: "suv", label: "SUV" },
  { value: "microbus", label: "Microbus" },
  { value: "pickup", label: "Pickup" },
  { value: "truck", label: "Truck" },
  { value: "covered_van", label: "Covered Van" },
  { value: "hiace", label: "Hiace" },
  { value: "private_car", label: "Private Car" },
  { value: "forklift", label: "Forklift" },
  { value: "bike", label: "Bike (Motorcycle)" },
  { value: "excavator", label: "Excavator" },
];

const UNITS = ["TON", "KG", "MT"];

/* ---------------- Small reusable pieces ---------------- */
function Field({ label, required = false, className = "", children }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function SelectInput({ value, onChange, options, icon = "down" }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {icon === "down" ? (
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      ) : (
        <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      )}
    </div>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  );
}

/* ---------------- Main: Vehicle & Fulfillment Section ---------------- */
export default function SectionCard({ form, update }) {
  // props na dile nijer internal state use korbe (standalone o cholbe)
  const [local, setLocal] = useState({
    vehicleType: "pickup",
    capacity: "",
    unit: "TON",
  });

  const data = form ?? local;
  const set = (key, value) =>
    update ? update(key, value) : setLocal((p) => ({ ...p, [key]: value }));

  return (
    <section className="-mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <h2 className="text-sm font-semibold text-gray-900">Vehicle &amp; Fulfillment</h2>
      <p className="mt-1 text-xs text-gray-500">
        Vehicle specifications and sourcing method
      </p>

      {/* Fields */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Field label="Vehicle Type" required>
          <SelectInput
            value={data.vehicleType}
            onChange={(v) => set("vehicleType", v)}
            options={VEHICLE_TYPES}
            icon="down"
          />
        </Field>

        <Field label="Capacity Required" required>
          <TextInput
            value={data.capacity}
            onChange={(v) => set("capacity", v)}
            placeholder="e.g. 2.5 / 5 / 6"
          />
        </Field>

        <Field label="Unit" required>
          <SelectInput
            value={data.unit}
            onChange={(v) => set("unit", v)}
            options={UNITS.map((u) => ({ value: u, label: u }))}
            icon="updown"
          />
        </Field>
      </div>
    </section>
  );
}