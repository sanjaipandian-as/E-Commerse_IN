import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function ProfileLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">
          <Sidebar />
          <main className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
