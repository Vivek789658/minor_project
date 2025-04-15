import React, { useState } from "react";
import axios from "axios";
require("dotenv").config();
const BASE_URL = "http://localhost:4000";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/login`, {
        username,
        password,
      });
      const userType = response.data.data.type;
      localStorage.setItem("userData", JSON.stringify(response.data.data));
      window.location.href = `/${userType}`;
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Network error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Panel - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">LOGIN</h1>
          <p className="text-gray-600 mb-8 text-center">How to get started with University Feedback Hub?</p>

          {errorMessage && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md mb-4 text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2.5">
                  <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-transparent border-none w-full focus:outline-none text-gray-700"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2.5">
                  <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent border-none w-full focus:outline-none text-gray-700"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-36 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors duration-300"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login Now"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-700 font-bold mb-4 text-center">Login with Others</p>

            <div className="space-y-3 flex flex-col items-center">
              <button className="flex items-center justify-center w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                <span>Login with Google</span>
              </button>

              <button className="flex items-center justify-center w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" className="w-5 h-5 mr-2" />
                <span>Login with Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Purple Background with Image */}
      <div className="hidden md:block md:w-1/2 bg-indigo-600 relative overflow-hidden">
        {/* Purple background with pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-700">
          {/* Curved patterns */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M39.7,159.4C13.2,122,8.7,54.1,35.8,23.6c27.1-30.5,85.9-23.4,142.5-5.5c56.6,17.9,111,46.7,125.1,86.9 c14.1,40.2-12.1,91.8-52.1,131.3c-39.9,39.5-93.6,66.9-134.9,57.3S66.2,196.8,39.7,159.4z" fill="#a78bfa" />
            </svg>
          </div>
        </div>

        {/* Centered lightbulb icon and student image */}
        <div className="relative h-full flex items-center justify-center">
          <div className="relative w-full max-w-lg px-6">
            {/* Glassmorphic card with rounded corners */}
            <div className="bg-white bg-opacity-10 rounded-[48px] w-full backdrop-blur-sm border border-white border-opacity-20 overflow-hidden relative">
              {/* Light bulb icon */}
              <div className="absolute bottom-1/4 left-0 transform -translate-x-1/2">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
              </div>

              {/* Professional business woman image */}
              <img
                src="https://img.freepik.com/free-photo/young-businesswoman-working-laptop-office_1303-22849.jpg"
                alt="Professional woman with laptop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
