import ResetPassword from "../Component/ResetPassword";

export default function ResetpassPage() {
  return (
     <div>
        <div className="mt-0 text-center">
          <p className="mt-1 text-[18px] text-[#525f70]">
            Reset your Pakiza FleetPro Password
          </p>
        </div>
<div className=" mt-6">
        <ResetPassword /> 
      </div>

    </div>
  );
}