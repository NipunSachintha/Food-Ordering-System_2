import React, { useState,useEffect } from "react";
import { getOrders } from "../actions/OrderActions";
const PreviousOrdersTab = () => {
    const [previousOrders, setPreviousOrders] = useState([]);
    const [error, setError] = useState(null);
    
      useEffect(() => {
        const fetchOrders = async () => {
          try {
            const data = await getOrders();
            //console.log(data);
            setPreviousOrders(data);
          } catch (error) {
            console.error(error);
            setError(error);
          }
        };
    
        fetchOrders();
      }, []);
    

      const handleCompleteOrder = (orderId) => {
        setPreviousOrders(previousOrders.filter((order) => order._id !== orderId));
      };
      

    

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
              <tr key={order._id} className="border-b">
                <td className="p-4 text-gray-600">{order._id}</td>
                <td className="p-4">{order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}</td>
                <td className="p-4">Rs.{order.total.toFixed(2)}</td>
                <td className="p-4">{order.status}</td>
                <td className="p-4">{order.time}</td>
                <td className="p-4">
                  <button
                  onClick={() => handleCompleteOrder(order._id)} 
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
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