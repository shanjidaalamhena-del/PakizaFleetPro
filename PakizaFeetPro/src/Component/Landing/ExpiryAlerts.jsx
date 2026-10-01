import { useEffect, useState } from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";
import Card from "./Card";

export default function ExpiryAlerts() {
  
  const [expiryList, setExpiryList] = useState([]);
  const host = import.meta.env.VITE_API_URL


  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch(
      `${host}/dashboard/document-expiry-list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json();
      })
      .then((result) => {
        console.log("Expiry API Response:", result);

        const data = result?.[0]?.data || [];

        setExpiryList(data);
      })
      .catch((error) => {
        console.error("Expiry fetch error:", error);

        // API error হলে No expiry alerts দেখাবে
        setExpiryList([]);
      });
  }, []);
  
  return (
    <Card className="mt-5 w-[600] flex flex-col">
      <div className="flex items-start justify-between p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={19} className="text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              Expiry Alerts
              </h3>
            <p className="text-xs text-gray-400">
              Document renewals
              </p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mt-1">
          View All 
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Empty state */}
           {expiryList.length === 0 ? (
      <div className="flex-1 flex items-center justify-center pb-24 pt-6">
        <p className="text-gray-500">
          No expiry alerts
          </p>

      </div>

      ) : (

        <div className="px-5 pb-6 space-y-3">

          {expiryList.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-100 py-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {item.document_name || item.document || "Document"}
                </p>

                <p className="text-xs text-gray-400">
                  {item.vehicle_name || item.vehicle || ""}
                </p>
              </div>

              <p className="text-xs text-red-500">
                {item.expiry_date || item.expiryDate || ""}
              </p>
            </div>
          ))}

        </div>

      )}
    </Card>
  );
}