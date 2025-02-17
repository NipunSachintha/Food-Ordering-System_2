import React, { useState, useEffect } from "react";
import { getUsers } from "../../actions/AdminActions";
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUsers();
        //console.log(data);
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteUser = (_id) => {
    setUsers((prev) => prev.filter((user) => user._id !== _id));
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
        Add User
      </button>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-4">{user._id}</td>
                <td className="p-4">{user.username}</td>

                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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

export default UserManagement;
