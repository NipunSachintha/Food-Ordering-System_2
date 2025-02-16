
import React, { useState,useEffect } from "react";
import {placeOrder} from "../actions/OrderActions";
import {getFoodItems} from "../actions/FoodActions";

const NewOrderTab = () => {
    const [menuItems,setMenuItems] = useState([]);

      const [currentOrder, setCurrentOrder] = useState([]);
      const totalPrice = currentOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const [error, setError] = useState(null);



      useEffect(() => {
          const fetchFoodItems = async () => {
            try {
              const data = await getFoodItems();
              setMenuItems(data);
            } catch (error) {
              console.error(error);
              setError(error);
            }
          };
      
          fetchFoodItems();
          
        }, []);

      const submitOrder = async () => {
        if (currentOrder.length === 0) return;
    
        const newOrder = {
          items: currentOrder,
          total: totalPrice,
          isComplete:false,
          time: new Date(),
        };
    
        try {
          await placeOrder(newOrder);
          setCurrentOrder([]);
        } catch (error) {
          setError(error);
          //console.error(error);
        }
      };

      const addToOrder = (item) => {
        const existingItem = currentOrder.find((orderItem) => orderItem._id === item._id);
        if (existingItem) {
          setCurrentOrder(
            currentOrder.map((orderItem) =>
              orderItem._id === item._id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
            )
          );
        } else {
          setCurrentOrder([...currentOrder, { ...item, quantity: 1 }]);
        }
      };

      const removeFromOrder = (itemId) => {
        setCurrentOrder(currentOrder.filter((item) => item._id !== itemId));
      };
    
      
    


    return(
        <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div key={item._id} className="card cursor-pointer border p-4 rounded shadow hover:bg-gray-100" onClick={() => addToOrder(item)}>
            <div className="card-header mb-2">
              <h2 className="card-title text-lg font-semibold">{item.name}</h2>
            </div>
            <div className="card-content">
              <p className="text-gray-700">Rs.{item.price.toFixed(2)}</p>
            </div>
          </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-80">
        <h2 className="text-2xl font-bold mb-4">Current Order</h2>
        <div className="bg-white rounded-lg shadow p-4  ">
          {currentOrder.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-2 ">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Rs.{(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  onClick={() => removeFromOrder(item._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="font-bold flex justify-between">
              <span>Total:</span>
              <span>Rs.{totalPrice.toFixed(2)}</span>
            </div>
            <button 
              onClick={submitOrder}
              className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Submit Order
            </button>
          </div>
        </div>
        {error && <div className="text-red-500 mt-4">{error.message}</div>}
      </div>
    </div>
    )
  };


export default NewOrderTab;

