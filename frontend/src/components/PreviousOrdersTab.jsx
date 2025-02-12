import React, { useState } from "react";

const PreviousOrdersTab = () => {
    const [previousOrders, setPreviousOrders] = useState([{
        "id": "aekka8qyru4",
        "items": [
            {
                "id": 1,
                "name": "Original Recipe Chicken",
                "price": 3.99,
                "category": "Chicken",
                "quantity": 1
            },
            {
                "id": 2,
                "name": "Zinger Burger",
                "price": 4.99,
                "category": "Burgers",
                "quantity": 1
            },
            {
                "id": 3,
                "name": "Fries",
                "price": 1.99,
                "category": "Sides",
                "quantity": 1
            },
            {
                "id": 6,
                "name": "Veggie Burger",
                "price": 3.99,
                "category": "Burgers",
                "quantity": 4
            }
        ],
        "total": 26.93,
        "status": "Pending",
        "time": "07:19:44"
    }]);

    

    return(
        <div>
      <h2 className="text-2xl font-bold mb-4">Previous Orders</h2>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Order ID</th>
              <th className="text-left p-4">Items</th>
              <th className="text-left p-4">Total</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Time</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {previousOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-4 text-gray-600">{order.id}</td>
                <td className="p-4">{order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}</td>
                <td className="p-4">${order.total.toFixed(2)}</td>
                <td className="p-4">{order.status}</td>
                <td className="p-4">{order.time}</td>
                <td className="p-4">
                  <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                    Mark as Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
  };
export default PreviousOrdersTab;