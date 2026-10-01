import { useEffect, useState } from "react";
import { RefreshCw, Search, ChevronsUpDown } from "lucide-react";
const host = import.meta.env.VITE_API_URL

const API_URL = `${host}/requisition/list`;

export default function RequisitionHistory() {
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const [currentPage, setCurrentPage] = useState(1);

const ITEMS_PER_PAGE = 10;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const json = await res.json();

      console.log("MY REQUEST STATUS:", res.status);
console.log("MY REQUEST RESPONSE:", json);

      console.log("FULL RESPONSE:", json);
      console.log("DATA ONLY:", json.data);
// const raw =
//         json?.data?.data ??   
//         json?.data ??         
//         json ??               
//         [];

//       const list = Array.isArray(raw) ? raw : [];
     const list = json?.data?.list ?? [];

setRequests(list);
    } catch (err) {
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------- Search (safe access — null holew crash korbe na) ---------- */
  const filtered = requests.filter((r) => {
    if (!r) return false;
    const q = search.toLowerCase();
    const num = String(r.requisition_number ?? r.reqNumber ?? "").toLowerCase();
    const type = String(r.vehicle_type ?? r.vehicleType ?? "").toLowerCase();
    return num.includes(q) || type.includes(q);
  });

const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

const endIndex = startIndex + ITEMS_PER_PAGE;

const currentRequests = filtered.slice(startIndex, endIndex);
   
const handleNext = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePrevious = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

useEffect(() => {
  setCurrentPage(1);
}, [search]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Requisition History</h2>
        <button
          onClick={fetchData}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Search + Filter */}
      <div className="mt-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search requisition number or vehicle type..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="relative w-48">
          <select className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2.5 pr-9 text-sm outline-none focus:border-blue-500">
            <option>Pending &amp; Reviewed</option>
            <option>Pending</option>
            <option>Reviewed</option>
          </select>
          <ChevronsUpDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <table className="mt-4 w-full text-left">
        <thead>
          <tr className="bg-gray-50 text-xs text-gray-500">
            <th className="rounded-l-lg px-4 py-3 font-medium">Sl</th>
            <th className="px-4 py-3 font-medium">Requisition Number</th>
            <th className="px-4 py-3 font-medium">Vehicle Type</th>
            <th className="px-4 py-3 font-medium">Date &amp; Time</th>
            <th className="px-4 py-3 font-medium">Purpose</th>
            <th className="px-4 py-3 font-medium">Route</th>
            <th className="px-4 py-3 font-medium">Round Trip</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="rounded-r-lg px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={9} className="py-12 text-center text-sm text-gray-400">
                Loading...
              </td>
            </tr>
          )}

          {!loading && error && (
            <tr>
              <td colSpan={9} className="py-12 text-center text-sm text-red-500">
                {error}
              </td>
            </tr>
          )}
{!loading && !error && currentRequests.map((r, i) => (
          // {!loading && !error && filtered.map((r, i) => (
            <tr key={r.id ?? i} className="border-b border-gray-100 text-sm text-gray-700 hover:bg-gray-50">
              <td className="px-4 py-3">
                {startIndex+i + 1}</td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {r.requisition_number ?? r.reqNumber ?? "-"}
              </td>
              <td className="px-4 py-3">{r.vehicle_type ?? r.vehicleType ?? "-"}</td>
              <td className="px-4 py-3">{r.date_time ?? r.created_at ?? "-"}</td>
              <td className="max-w-[220px] truncate px-4 py-3">{r.purpose ?? "-"}</td>
              <td className="px-4 py-3">{r.route ?? "-"}</td>
              <td className="px-4 py-3">{r.round_trip ? "Yes" : "No"}</td>
              <td className="px-4 py-3">
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  {r.status ?? "-"}
                </span>
              </td>
              <td className="px-4 py-3">
                <button className="text-sm font-medium text-blue-600 hover:underline">View</button>
              </td>
            </tr>
          ))}

          {!loading && !error && filtered.length === 0 && (
            <tr>
              <td colSpan={9} className="py-12 text-center text-sm italic text-gray-400">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          {/* <button className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50">
            ‹ Previous</button> */}

            <button
  onClick={handlePrevious}
  disabled={currentPage === 1}
  className={`rounded-lg border px-3 py-1.5 ${
    currentPage === 1
      ? "cursor-not-allowed border-gray-200 text-gray-300"
      : "border-gray-200 text-gray-600 hover:bg-gray-50"
  }`}
>
  ‹ Previous
</button>

          <button className="h-8 w-8 rounded-lg border border-blue-200 bg-blue-50 text-sm font-medium text-blue-600">
            {currentPage}</button>
          {/* <button className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50">Next ›</button> */}
        <button
  onClick={handleNext}
  disabled={currentPage === totalPages || totalPages === 0}
  className={`rounded-lg border px-3 py-1.5 ${
    currentPage === totalPages || totalPages === 0
      ? "cursor-not-allowed border-gray-200 text-gray-300"
      : "border-gray-200 text-gray-600 hover:bg-gray-50"
  }`}
>
  Next ›
</button>
        </div>
        <span className="text-sm text-gray-500">🗂 {filtered.length} requests</span>
      </div>
    </div>
  );
}