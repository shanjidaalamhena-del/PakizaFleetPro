import React, { useState } from "react";
import SectionCard from "../Component/requisition/SectionCard";
import TripScheduleSection from "../Component/requisition/TripScheduleSection";
import ExtraPointsSection from "../Component/requisition/ExtraPointsSection";
import PurposeSection from "../Component/PurposeSection";
import ReqButton from "../Component/requisition/ReqButton";

export default function CreateRequisition() {
 
  const [form, setForm] = useState({
    // Vehicle & Fulfillment
    vehicleType: "pickup",
    capacity: "",
    unit: "TON",

    // Trip Schedule
    date: "2026-09-19",
    startTime: "",
    endTime: "",
    roundTrip: false,
isDriverNeeded: false,
    pickupLocation: "",
    destinationLocation: "",
    pickupFactory: "",
    destinationFactory: "",
 
    purpose: "",
    cargoNotes: "",
    department: "",
    passenger: "",
  });



  const [extraPoints, setExtraPoints] = useState([]);
  // Keu likhle ekhane update hobe
  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Pore Save button e eta call korba
  const handleSave = () => {
    console.log("Form Data:", form);
    // ekhane API call hobe
  };

  return (
    <div className="min-h-full bg-gray-50 p-4 md:p-5">
      <div className="mx-auto max-w-[1400px] space-y-4">
        <SectionCard form={form} update={update} />
        <TripScheduleSection form={form} update={update} />
      <ExtraPointsSection extraPoints={extraPoints} setExtraPoints={setExtraPoints} />
       <PurposeSection form={form} update={update} />

       <ReqButton form={form} 
        extraPoints={extraPoints}/>
      </div>
    </div>
  );
}