import React, { useState, useEffect } from "react";
import { getFoodItems } from "../../actions/AdminActions";
const MenuManagement = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getFoodItems();
        setFoodItems(data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteUser = (email) => {
    setUsers((prev) => prev.filter((user) => user.email !== email));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Add Item
      </button>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.price}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">
                  <button
                    
                    className="px-4 py-2 bg-blue-100 text-black rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.email)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuManagement;
