// src/components/LoginForm.js
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { AuthContext } from "./AuthContext";
// import { useAuth } from "./AuthProvider";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(" in the login component");

  const handleLogin = async () => {
    try {
      // Call the login API
      const response = await axios.post(
        "http://localhost:8081/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data;
      // console.log(token);
      // localStorage.setItem("matchAI_token", JSON.stringify(token));
      // Extract user data from the response

      const userResponse = await axios.get("http://localhost:8081/user", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          // Bearer ${token}
        },
      });

      // Store the user data in localStorage or state
      const userData = userResponse.data;

      // Use the login function from AuthContext to update the state and localStorage
      login(token, userData);

      navigate("/");
    } catch (error) {
      setUsername("");
      setPassword("");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto rounded-lg shadow-lg p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border w-full rounded-lg p-2"
            placeholder="Enter your username"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full rounded-lg p-2"
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white rounded-lg p-2"
          >
            Login
          </button>
        </div>

        {/* Register Link */}
        <div className="flex justify-center">
          <span className="text-sm">Don't have an account? </span>
          <Link to="/register" className="text-blue-500 ml-1">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
