import React, { useState, useEffect } from "react";
import { getOrders } from "../actions/OrderActions";
import io from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;


const socket = io(backendUrl);

const Kitchen = () => {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchOrders();
    socket.on("newOrder", (order) => {
      setOrders((prevOrders) => [order, ...prevOrders]);
    });

    return () => {
      socket.off("newOrder");
    };
  }, []);

  if (error) {
    console.log('hi error');
    return <div>Error: {error.message}</div>;
  }

  const activeOrders = orders.filter((order) => order.status !== "completed");

  const aggregatedItems = activeOrders.reduce((acc, order) => {
    order.items.forEach((item) => {
      if (acc[item.name]) {
        acc[item.name] += item.quantity;
      } else {
        acc[item.name] = item.quantity;
      }
    });
    return acc;
  }, {});

  const handleCompleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: "completed" } : order
      )
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Kitchen View</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Items to Prepare</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="font-medium">Item</div>
          <div className="font-medium">Quantity</div>
          {Object.entries(aggregatedItems).map(([itemName, quantity]) => (
            <React.Fragment key={itemName}>
              <div>{itemName}</div>
              <div>{quantity}</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Active Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b">
              <h3 className="font-medium text-sm break-all">
                Order #{order._id}
              </h3>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="space-y-2 flex-grow">
                {order.items.map((item, index) => (
                  <div key={index} className="text-sm">
                    {item.name} x{item.quantity}
                  </div>
                ))}
                <div className="mt-4 space-y-1">
                  <div className="text-sm">Status: {order.isComplete ? 'Complete' : 'Pending'}</div>
                  <div className="text-sm">Time: {new Date(order.time).toLocaleTimeString()}</div>
                </div>
              </div>
              <button
                onClick={() => handleCompleteOrder(order._id)}
                className="mt-auto w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
              >
                Complete Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kitchen;