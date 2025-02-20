import React, { useState, useEffect } from "react";
import {
  getFoodItems,
  updateFoodItem,
  addFoodItem,
  deleteFoodItem,
} from "../../actions/AdminActions";

const MenuManagement = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

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

  const handleDeleteItem = async(_id) => {
    if (window.confirm("Are you sure you want to edit this item?")) {
      try{
        await deleteFoodItem(_id);

      }
      catch(error){
        console.error(error);
        setError(error);
      }

      setFoodItems((prev) => prev.filter((item) => item._id !== _id));
    }
  };

  const handleEditItem = (item) => {
    if (window.confirm("Are you sure you want to edit this item?")) {
      setCurrentItem(item);
      setEditedName(item.name);
      setEditedPrice(item.price);
      setEditedCategory(item.category);
      setIsModalOpen(true);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await updateFoodItem({
        _id: currentItem._id,
        name: editedName,
        price: editedPrice,
        category: editedCategory,
      });
      setFoodItems((prev) =>
        prev.map((item) =>
          item._id === currentItem._id
            ? {
                ...item,
                name: editedName,
                price: editedPrice,
                category: editedCategory,
              }
            : item
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleAddItem = () => {
    setIsModalOpen(true);
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>
      </div>

      <button
      onClick={() => handleAddItem()}
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
              <tr key={item._id} className="border-b">
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.price}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="px-4 py-2 bg-blue-100 text-black rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex items-center pb-3 border-b border-gray-300">
              <h3 className="text-gray-800 text-xl font-bold flex-1">
                Edit Item
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                viewBox="0 0 320.591 320.591"
                onClick={() => setIsModalOpen(false)}
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category:
              </label>
              <input
                type="text"
                id="category"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
