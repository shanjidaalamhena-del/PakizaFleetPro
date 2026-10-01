import { Menu, Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-5">
      {/* Hamburger icon */}
      <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute top-0 right-0 min-w-[17px] h-[17px] px-0.5 bg-red-500 text-white
            text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            2
          </span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50">
          <img
            src="https://i.pravatar.cc/72?img=12"
            alt="User"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="text-left leading-tight">
            <p className="text-sm font-semibold text-gray-800">Rajebul Hasan Rajon</p>
            <p className="text-xs text-gray-400">Head Office</p>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}