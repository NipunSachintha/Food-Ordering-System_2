import React, { useState,useEffect } from "react";
import  {getUsers} from "../../actions/AdminActions";
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);


      useEffect(() => {
        const fetchOrders = async () => {
          try {
            const data = await getUsers();
            setUsers(data);
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
                Add User
            </button>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Role</th>
                            <th className="text-left p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.email} className="border-b">
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">{user.role}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleDeleteUser(user.email)}
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
