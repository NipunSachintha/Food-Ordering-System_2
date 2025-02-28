
import React, { useState } from "react";
import NewOrderTab from "../components/NewOrderTab.jsx";
import PreviousOrdersTab from "../components/PreviousOrdersTab.jsx";
import Navbar from "../components/navbar.jsx";
function Pos() {
  const [activeTab, setActiveTab] = useState('new');
  


  return (
    <div className="max-w-7xl mx-auto p-8">
      <Navbar />
      <div className="mb-8">
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'new' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            New Order
          </button>
          <button
            onClick={() => setActiveTab('previous')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'previous' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Previous Orders
          </button>
        </div>
        {activeTab === 'new' ? <NewOrderTab /> : <PreviousOrdersTab />}
      </div>
    </div>
  );
}

export default Pos;
