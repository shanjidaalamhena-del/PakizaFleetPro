import RequisitionHistory from "../Component/MyRequest/RequisitionHistory";


export default function MyRequestPage() {
  return (
    <div className="min-h-full bg-gray-50 p-5">
      {/* Page header */}
      <h1 className="text-lg font-bold text-gray-900">My Requests</h1>
      <p className="mt-0.5 text-sm text-gray-500">View your vehicle requisitions</p>

      {/* Component */}
      <div className="mt-4">
        <RequisitionHistory/>
      </div>
    </div>
  );
}