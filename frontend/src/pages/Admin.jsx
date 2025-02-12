import React from 'react';
import { Settings, Users, BarChart } from 'lucide-react';
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Menu Management Card */}
        <div className="flex flex-col border rounded shadow p-4">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Menu Management</h2>
          </div>
          <div className="flex-1">
            <Link to="/admin/menuManagement" >
            <button className="bg-black text-white hover:bg-gray-800 py-2 px-4 rounded">
              Manage Menu
            </button>
            </Link>
          </div>
        </div>

        {/* User Management Card */}
        <div className="flex flex-col border rounded shadow p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" />
            <h2 className="text-xl font-semibold">User Management</h2>
          </div>
          <div className="flex-1">
            <Link to="/admin/userManagement">
            <button className="bg-black text-white hover:bg-gray-800 py-2 px-4 rounded">
              Manage Users
            </button>
            </Link>
          </div>
        </div>

        {/* Sales Reports Card */}
        <div className="flex flex-col border rounded shadow p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Sales Reports</h2>
          </div>
          <div className="flex-1">
            <Link to="/admin/salesReports">
            <button className="bg-black text-white hover:bg-gray-800 py-2 px-4 rounded">
              View Reports
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;