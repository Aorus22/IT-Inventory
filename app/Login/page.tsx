"use client"
import React, { useState } from 'react';
import axios from 'axios';
import {useRouter} from "next/navigation";
import Cookies from 'universal-cookie';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await axios.post('/api/Login', { username, password });
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid username or password');
        }
    };

    return (
        <div className="fixed z-20 inset-0 flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-300">
            <div className="bg-[#2c3f79] px-20 pt-16 pb-20 rounded-3xl shadow-lg text-white w-[32rem]">
                <h2 className="text-2xl mb-6 text-center">Sign In</h2>
                <div className="mb-4">
                    <label className="block mb-2 text-sm">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 rounded-md text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded-md text-black"
                    />
                </div>
                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-sm">Remember me</label>
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Login;
