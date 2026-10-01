import { useState } from "react";
import {
  Field,
  SelectInput,
  DatePickerInput,
  TimeInput,
} from "./TripInputs";

/* ---------------- Data (nijer options diye replace koro) ---------------- */
const LOCATIONS = [
  { value: "gulshan_depot", label: "Gulshan Depot, Dhaka" },
  { value: "banani", label: "Banani, Dhaka" },
  { value: "chattogram_port", label: "Chattogram Port" },
  { value: "sylhet_depot", label: "Sylhet Depot" },
  { value: "khulna_yard", label: "Khulna Yard" },
];

const FACTORIES = [
  { value: "factory_a", label: "Factory A - Gazipur" },
  { value: "factory_b", label: "Factory B - Narsingdi" },
  { value: "factory_c", label: "Factory C - Mymensingh" },
];

/* ---------------- Main Component ---------------- */
export default function TripScheduleSection({ form, update }) {
  // props na dile nijer internal state (standalone o cholbe)
  const [local, setLocal] = useState({
    date: "2026-09-19",
    startTime: "",
    endTime: "",
    roundTrip: false,
    pickupLocation: "",
    destinationLocation: "",
    pickupFactory: "",
    destinationFactory: "",
  });

  const data = form ?? local;
  const set = (key, value) =>
    update ? update(key, value) : setLocal((p) => ({ ...p, [key]: value }));

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <h2 className="text-sm font-semibold text-gray-900">Trip Schedule</h2>
      <p className="mt-1 text-xs text-gray-500">
        Date, time, and route for this requisition
      </p>

      {/* Row 1: Date / Start Time / End Time / Round Trip */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Field label="Date" required>
          <DatePickerInput value={data.date} onChange={(v) => set("date", v)} />
        </Field>

        <Field label="Start Time">
          <TimeInput value={data.startTime} onChange={(v) => set("startTime", v)} />
        </Field>

        <Field label="End Time">
          <TimeInput value={data.endTime} onChange={(v) => set("endTime", v)} />
        </Field>

        <div className="flex items-end pb-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={data.roundTrip}
              onChange={(e) => set("roundTrip", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 accent-blue-600"
            />
            Round Trip
          </label>
        </div>
      </div>

      {/* Row 2: Locations */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Pickup Location" required>
          <SelectInput
            value={data.pickupLocation}
            onChange={(v) => set("pickupLocation", v)}
            placeholder="Select Pickup Location"
            options={LOCATIONS}
          />
        </Field>

        <Field label="Destination Location" required>
          <SelectInput
            value={data.destinationLocation}
            onChange={(v) => set("destinationLocation", v)}
            placeholder="Select Destination Location"
            options={LOCATIONS}
          />
        </Field>
      </div>

      {/* Row 3: Factories */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Pickup Factory">
          <SelectInput
            value={data.pickupFactory}
            onChange={(v) => set("pickupFactory", v)}
            placeholder="Select Pickup Factory"
            options={FACTORIES}
          />
        </Field>

        <Field label="Destination Factory">
          <SelectInput
            value={data.destinationFactory}
            onChange={(v) => set("destinationFactory", v)}
            placeholder="Select Destination Factory"
            options={FACTORIES}
          />
        </Field>
      </div>
    </section>
  );
}