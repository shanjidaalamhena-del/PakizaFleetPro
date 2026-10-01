import { useNavigate } from "react-router-dom";
function ReqButton({form, extraPoints}) {
   const navigate = useNavigate();
const handleCreateRequisition = async () => {
  const host = import.meta.env.VITE_API_URL

 
const requestBody = {
  date: form.date,
  start_time: form.startTime,
  end_time: form.endTime,
  pick_up_location: form.pickupLocation,
  destination: form.destinationLocation,
  vehicle_type: form.vehicleType,
  capacity: `${form.capacity} ${form.unit}`,

  is_round_trip: form.roundTrip,
is_driver_needed:String(form.isDriverNeeded),

  purpose: form.purpose,

  cargo_notes: form.cargoNotes,
  passenger_count: Number(form.passenger),

 
  checkpoints: extraPoints.map((point) => ({
    location: point.location,
  })),
};
try { const token = localStorage.getItem("access_token");
   const response = await 
  fetch( `${host}/requisition/create`,
    // fetch( "https://vmsapi.criptonpro.com/api/v1/requisition/list",
     { method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`, 
      }, 
  body: JSON.stringify(requestBody), } );

const result = await response.json(); 
console.log("Status:", response.status); 
console.log("Response:", result);
 console.log("CREATE RESPONSE:", JSON.stringify(result, null, 2));
      
if (response.ok) 
  { 
    alert("Requisition created successfully!"); 
 navigate("/landing/requisition/my-requests");
  } 
  else { 
    alert(result.message || "Failed to create requisition"); 
  }
 }
  catch (error) { console.error("Create requisition error:", error); 
  alert("Something went wrong. Please try again."); } };
  
  return (
    <div  className="mt-6 flex justify-end">
       <button
    type="button"

    onClick={handleCreateRequisition}
    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
  >
    Create Requisition
  </button>

    </div>
  )
}

export default ReqButton