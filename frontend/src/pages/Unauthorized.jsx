import React from "react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
    const navigate = useNavigate();
    const handlelogin = () => {
      navigate("/");
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">401</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mt-2">Unauthorized Access</h2>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            <strong>Access Denied</strong>
            <p>You don't have permission to access this resource.</p>
          </div>
          <p className="text-gray-600 mt-4">This might be because:</p>
          <ul className="text-gray-600 list-disc list-inside mt-2">
            <li>Your session has expired</li>
            <li>You need additional permissions</li>
            <li>You're not logged in</li>
          </ul>
          <div className="mt-6 flex space-x-4">
            <button onClick={handlelogin} className="px-6 py-2 bg-blue-600 text-white mx-auto block rounded-lg hover:bg-blue-500">
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }
  