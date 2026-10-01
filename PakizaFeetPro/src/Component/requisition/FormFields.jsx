import { useRef } from "react";
import { Calendar, Clock, ChevronDown } from "lucide-react";

/* ---------------- Label ---------------- */
export function Label({ required, children }) {
  return (
    <label className="mb-1.5 block text-[13px] font-medium text-gray-700">
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}

/* ---------------- Label + Control wrapper ---------------- */
export function Field({ label, required, children }) {
  return (
    <div>
      {label && <Label required={required}>{label}</Label>}
      {children}
    </div>
  );
}

/* ---------------- Text Input ---------------- */
export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
    />
  );
}

/* ---------------- Select ---------------- */
export function Select({ options = [], placeholder, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-9 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

/* ---------------- Textarea ---------------- */
export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
    />
  );
}

/* ---------------- Date Field (September 19th, 2026 format) ---------------- */
export function DateField({ name, value, onChange, label, required }) {
  const inputRef = useRef(null);

  const openPicker = () => {
    try { inputRef.current?.showPicker?.(); } catch (_) {}
  };

  const formatDisplay = (val) => {
    if (!val) return "";
    const d = new Date(val + "T00:00:00");
    const months = ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];
    const day = d.getDate();
    const s = ["th", "st", "nd", "rd"];
    const v = day % 100;
    const ordinal = day + (s[(v - 20) % 10] || s[v] || s[0]);
    return `${months[d.getMonth()]} ${ordinal}, ${d.getFullYear()}`;
  };

  return (
    <Field label={label} required={required}>
      <div
        onClick={openPicker}
        className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 transition hover:border-gray-400"
      >
        {formatDisplay(value) || <span className="text-gray-400">Select date</span>}
        <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </Field>
  );
}

/* ---------------- Time Field (No time selected) ---------------- */
export function TimeField({ name, value, onChange, label }) {
  const inputRef = useRef(null);

  const openPicker = () => {
    try { inputRef.current?.showPicker?.(); } catch (_) {}
  };

  const formatTime = (val) => {
    if (!val) return "";
    const [h, m] = val.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  return (
    <Field label={label}>
      <div
        onClick={openPicker}
        className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition hover:border-gray-400"
      >
        {value ? (
          <span className="text-gray-800">{formatTime(value)}</span>
        ) : (
          <span className="text-gray-400">No time selected</span>
        )}
        <Clock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="time"
          name={name}
          value={value}
          onChange={onChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </Field>
  );
}