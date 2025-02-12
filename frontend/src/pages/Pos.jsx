
import React, { useState } from "react";
import NewOrderTab from "../components/NewOrderTab.jsx";
import PreviousOrdersTab from "../components/PreviousOrdersTab.jsx";
function Pos() {
  const [activeTab, setActiveTab] = useState('new');
  

  const [currentOrder, setCurrentOrder] = useState([]);
  

  

  const removeFromOrder = (itemId) => {
    setCurrentOrder(currentOrder.filter((item) => item.id !== itemId));
  };

  const totalPrice = currentOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);

 
 
  

  return (
    <div className="max-w-7xl mx-auto p-8">
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

/*

import React, { useState } from "react";

function Pos() {
  const [menuItems] = useState([
    { id: 1, name: "Original Recipe Chicken", price: 3.99, category: "Chicken" },
    { id: 2, name: "Zinger Burger", price: 4.99, category: "Burgers" },
    { id: 3, name: "Fries", price: 1.99, category: "Sides" },
    { id: 4, name: "Spicy Wings", price: 4.49, category: "Chicken" },
    { id: 5, name: "Chicken Popcorn", price: 2.99, category: "Chicken" },
    { id: 6, name: "Veggie Burger", price: 3.99, category: "Burgers" },
    { id: 7, name: "Coleslaw", price: 1.49, category: "Sides" },
    { id: 8, name: "Mashed Potatoes", price: 1.99, category: "Sides" },
    { id: 9, name: "Gravy", price: 0.99, category: "Sides" },
    { id: 10, name: "Soft Drink", price: 1.49, category: "Drinks" },
    { id: 11, name: "Milkshake", price: 2.99, category: "Drinks" },
  ]);

  const [currentOrder, setCurrentOrder] = useState([]);

  const addToOrder = (item) => {
    const existingItem = currentOrder.find((orderItem) => orderItem.id === item.id);
    if (existingItem) {
      setCurrentOrder(
        currentOrder.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
        )
      );
    } else {
      setCurrentOrder([...currentOrder, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrder = (itemId) => {
    setCurrentOrder(currentOrder.filter((item) => item.id !== itemId));
  };

  const totalPrice = currentOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const submitOrder = () => {
    if (currentOrder.length === 0) return;

    const newOrder = {
      items: currentOrder,
      status: "pending",
      total: totalPrice,
    };
    console.log(newOrder);

    // Add order logic here
    setCurrentOrder([]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="tabs">
        <div className="tab-list flex space-x-4 mb-4">
          <button className="tab px-4 py-2 bg-blue-500 text-white rounded">New Order</button>
          <button className="tab px-4 py-2 bg-gray-200 text-gray-700 rounded">Previous Orders</button>
        </div>
        <div className="tab-content">
          <div className="tab-panel">
            <div className="flex">
              <div className="w-2/3 pr-4">
                <h1 className="text-2xl font-bold mb-4">Menu</h1>
                <div className="grid grid-cols-3 gap-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="card cursor-pointer border p-4 rounded shadow hover:bg-gray-100" onClick={() => addToOrder(item)}>
                      <div className="card-header mb-2">
                        <h2 className="card-title text-lg font-semibold">{item.name}</h2>
                      </div>
                      <div className="card-content">
                        <p className="text-gray-700">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/3">
                <h2 className="text-xl font-bold mb-4">Current Order</h2>
                <div className="max-h-96 overflow-y-auto">
                  {currentOrder.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-2 p-2 border rounded shadow">
                      <span className="text-gray-700 truncate w-1/2">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-gray-700 w-1/4 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/4 ml-2" onClick={() => removeFromOrder(item.id)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <strong className="text-lg">Total: ${totalPrice.toFixed(2)}</strong>
                </div>
                <button className="btn btn-primary mt-4 w-full bg-black text-white py-2 rounded" onClick={submitOrder}>
                  Submit Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pos;




*/