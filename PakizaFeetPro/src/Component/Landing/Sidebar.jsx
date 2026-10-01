import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart3, LayoutGrid, FileText, Database, Fuel, Route, Shield,
  Wrench, ClipboardCheck, Wallet, Receipt, Settings, MapPin,
  FileBarChart, Boxes, ChevronDown, ChevronUp,
  FilePlus2, ListChecks, LifeBuoy, Headphones,
} from "lucide-react";

const menuItems = [
  { name: "Management Dashboard", icon: BarChart3 },
  { name: "Dashboard", icon: LayoutGrid, path: "/landing" },
  {
    name: "Requisition",
    icon: FileText,
    dropdown: true,
    children: [
      { name: "Create Requisition", icon: FilePlus2, path: "/landing/requisition/create" },
      { name: "My Requests", icon: ListChecks,
        path: "/landing/requisition/my-requests"
      },
      { name: "Vehicle Support", icon: LifeBuoy },
      { name: "Support Queue", icon: Headphones },
    ],
  },
  { name: "Master Data", icon: Database, dropdown: true },
  { name: "Fuel & Expenses Management", icon: Fuel, dropdown: true },
  { name: "Trip Management", icon: Route, dropdown: true },
  { name: "Insurance", icon: Shield, dropdown: true },
  { name: "Maintenance", icon: Wrench, dropdown: true },
  { name: "Approval", icon: ClipboardCheck, dropdown: true },
  { name: "Expenses", icon: Wallet, dropdown: true },
  { name: "Billing", icon: Receipt, dropdown: true },
  { name: "Documents", icon: FileText },
  { name: "Settings", icon: Settings, dropdown: true },
  { name: "I Owe You", icon: FileText },
  { name: "Tracking", icon: MapPin , path: "/landing/tracking" },
  { name: "Reports", icon: FileBarChart, dropdown: true },
  { name: "ERP", icon: Boxes },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState("Requisition");

  return (
    <aside className="w-80 shrink-0 h-screen bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-100 shrink-0">
        <img src="/Feet.png" alt="Pakiza Fleet Pro" className="h-12 w-auto" />
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        <p className="px-4 pb-2 text-[11px] font-bold tracking-wider text-gray-400">
          NAVIGATION
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isOpen = openMenu === item.name;
          const hasActiveChild = item.children?.some(
            (c) => c.path && location.pathname === c.path
          );
          const selfActive = item.path && location.pathname === item.path;

          return (
            <div key={item.name}>
              {/* Parent item */}
              <button
                onClick={() => {
                  if (item.dropdown) setOpenMenu(isOpen ? null : item.name);
                  else if (item.path) navigate(item.path);
                }}
                className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left transition
                  ${hasActiveChild
                    ? "bg-blue-600 text-white font-semibold"
                    : selfActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"}`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={17}
                    className={hasActiveChild ? "text-white" : selfActive ? "text-blue-700" : "text-gray-400"} />
                  <span className="truncate">{item.name}</span>
                </span>
                {item.dropdown && (isOpen
                  ? <ChevronUp size={14} className="shrink-0" />
                  : <ChevronDown size={14} className="shrink-0" />)}
              </button>

              {/* Sub items */}
              {item.dropdown && isOpen && (
                <div className="pb-1">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    const active = child.path && location.pathname === child.path;
                    return (
                      <button
                        key={child.name}
                        onClick={() => child.path && navigate(child.path)}
                        className={`w-full flex items-center gap-3 pl-12 pr-4 py-2 text-[13px] text-left transition
                          ${active
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "text-gray-600 hover:bg-gray-50"}`}
                      >
                        {ChildIcon && (
                          <ChildIcon size={15}
                            className={active ? "text-blue-700" : "text-gray-400"} />
                        )}
                        <span className="truncate">{child.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}