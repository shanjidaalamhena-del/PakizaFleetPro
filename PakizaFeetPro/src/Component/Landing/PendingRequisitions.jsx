import { Clock, ChevronRight } from "lucide-react";
import Card from "./Card";

export default function PendingRequisitions() {
  return (
    <Card className=" flex mt-5 flex-col">
      <div className="flex h-10 items-start justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
            <Clock size={19} className="text-amber-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Pending Requisitions</h3>
            <p className="text-xs text-gray-400">Awaiting your approval</p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mt-1">
          View All <ChevronRight size={15} />
        </button>
      </div>

      {/* Empty state */}
      <div className="flex-1  flex flex-col items-center justify-center pb-16 pt-4">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
          <Clock size={22} className="text-gray-400" />
        </div>
        <p className="mt-4 font-semibold text-gray-800">All caught up!</p>
        <p className="text-sm text-gray-400 mt-1">No pending requisitions at the moment</p>
      </div>
    </Card>
  );
}