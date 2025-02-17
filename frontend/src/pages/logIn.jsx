import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/user/login',{username,password},{withCredentials:true})
        .then(result => {
          console.log(result.data)
          if(result.data.message === "Login Success"){
            //localStorage.setItem('token',result.data.access_token)
            Cookies.set('accessToken', result.data.access_token, { secure: true, sameSite: 'Strict' });
          }
          // user role navigation handling
          const role = result.data.role;
          if(role === "admin"){
            navigate('/admin');
          }else if(role === "cashier"){
            navigate('/pos');
            }else if(role === "chef"){
                navigate('/kitchen');
            }else{
                navigate('/');
            }
        })
        .catch(err => console.log(err))
        
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-group">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="form-group flex items-center">
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="showPassword" className="text-sm font-medium text-gray-700">Show Password</label>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;