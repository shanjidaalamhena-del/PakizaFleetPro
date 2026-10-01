import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Landing/Sidebar";
import Header from "../Component/Landing/Header";

export default function LandingPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        {/* ⬇️ OUTLET EKHANE — route onujayi content ekhane change hobe */}
        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}