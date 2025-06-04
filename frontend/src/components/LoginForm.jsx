import React, { useState } from "react";
import { loginUser } from "../api/user.api.js";
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../store/slice/authSlice.js';
// import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  // UI state
  const [email, setEmail] = useState("someone@gmail.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Logic (commented)
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth);
  // console.log(auth);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      // dispatch(login(data.user));
      // navigate({ to: "/dashboard" });
      console.log("signin success", data);
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="cursor-pointer text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => state(false)}
              className="text-blue-500 hover:text-blue-700"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
