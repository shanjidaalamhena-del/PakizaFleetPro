import { Calendar, ChevronsUpDown, Clock } from "lucide-react";

/* ---------- Label wrapper ---------- */
export function Field({ label, required = false, className = "", children }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ---------- Dropdown (ChevronsUpDown icon soho) ---------- */
export function SelectInput({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
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

/* ---------- Date Picker (formatted text dekhay, click korle native picker khule) ---------- */
export function DatePickerInput({ value, onChange }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800">
        {value ? formatDate(value) : <span className="text-gray-400">Select date</span>}
        <Calendar className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
}

/* ---------- Time Picker (clock icon + "No time selected") ---------- */
export function TimeInput({ value, onChange }) {
  return (
    <div className="relative">
      <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          value ? "text-gray-800" : "text-transparent"
        }`}
      />
      {!value && (
        <span className="pointer-events-none absolute left-9 top-1/2 -translate-y-1/2 text-sm text-gray-400">
          No time selected
        </span>
      )}
    </div>
  );
}

/* ---------- Helper: "2026-09-19" → "September 19th, 2026" ---------- */
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";
  return `${d.toLocaleDateString("en-US", { month: "long" })} ${day}${suffix}, ${d.getFullYear()}`;
}