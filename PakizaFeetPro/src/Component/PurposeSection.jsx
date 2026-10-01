import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

/* ---------------- Data (nijer options diye replace koro) ---------------- */
const DEPARTMENTS = [
  { value: "operations", label: "Operations" },
  { value: "logistics", label: "Logistics" },
  { value: "maintenance", label: "Maintenance" },
  { value: "hr_admin", label: "HR & Admin" },
  { value: "finance", label: "Finance" },
  { value: "procurement", label: "Procurement" },
];

const PASSENGERS = [
  { value: "kamal", label: "Kamal Hossain" },
  { value: "rakib", label: "Rakib Islam" },
  { value: "tanvir", label: "Tanvir Ahmed" },
  { value: "sohel", label: "Sohel Rana" },
];

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

function SelectInput({ value, onChange, options, placeholder, disabled = false }) {
  return (
    <div className="relative">
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50 ${
          value ? "text-gray-800" : "text-gray-400"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

function TextArea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  );
}

/* ---------------- Main: Purpose & Load Details Section ---------------- */
export default function PurposeSection({ form, update }) {
  // props na dile nijer internal state (standalone o cholbe)
  const [local, setLocal] = useState({
    purpose: "",
    cargoNotes: "",
    department: "",
    passenger: "",
  });

  const data = form ?? local;
  const set = (key, value) =>
    update ? update(key, value) : setLocal((p) => ({ ...p, [key]: value }));

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <h2 className="text-sm font-semibold text-gray-900">
        Purpose &amp; Load Details <span className="text-red-500">*</span>
      </h2>
      <p className="mt-1 text-xs text-gray-500">
        What needs to move and who is traveling
      </p>

      <div className="mt-4 space-y-4">
        {/* Purpose/Reason */}
        <Field label="Purpose/Reason" required>
          <TextArea
            rows={4}
            value={data.purpose}
            onChange={(v) => set("purpose", v)}
            placeholder="Describe the purpose of this trip and any special requirements..."
          />
        </Field>

        {/* Cargo Notes */}
        <Field label="Cargo Notes" required>
          <TextArea
            rows={3}
            value={data.cargoNotes}
            onChange={(v) => set("cargoNotes", v)}
            placeholder="Fragile, oversized, pallets, number of packages, etc."
          />
        </Field>

        {/* Department + Passengers */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Search Department">
            <SelectInput
              value={data.department}
              onChange={(v) => {
                set("department", v);
                set("passenger", ""); // department change korle passenger reset
              }}
              placeholder="Select department..."
              options={DEPARTMENTS}
            />
          </Field>

          <Field label="Select Passengers">
            <SelectInput
              value={data.passenger}
              onChange={(v) => set("passenger", v)}
              placeholder={data.department ? "Select passenger" : "Select department first"}
              options={data.department ? PASSENGERS : []}
              disabled={!data.department}
            />
          </Field>
        </div>
      </div>
    </section>
  );
}