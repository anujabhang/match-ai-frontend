import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("MALE");

  const handleRegister = async () => {
    const postData = {
      username,
      email,
      password,
      lookingForGender: gender,
    };

    try {
      await axios.post("http://localhost:8081/register", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate('/login');
      // console.log("done");
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto rounded-lg shadow-lg p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border w-full rounded-lg p-2"
            placeholder="Enter your username"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full rounded-lg p-2"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full rounded-lg p-2"
            placeholder="Enter your password"
          />
        </div>

        {/* Gender Dropdown */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium mb-2">Looking for Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border w-full rounded-lg p-2"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>

        {/* Register Button */}
        <div className="flex justify-end">
          <button
            onClick={handleRegister}
            className="bg-blue-500 text-white rounded-lg p-2"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
