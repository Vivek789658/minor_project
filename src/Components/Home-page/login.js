import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/v1/login", {
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
        setErrorMessage("Network error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <form
        onSubmit={handleLogin}
        className=" w-9/12 bg-violet-50 rounded-lg shadow-lg border-2 px-5 py-8 xl:w-6/12 border-blue-100"
      >
        <h2 className=" font-bold mb-4 text-center text-2xl">Login</h2>
        <div className="mb-3">
          <label
            htmlFor="username"
            className="block mb-1 text-lg font-semibold"
          >
            Username:
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className=" border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-1 text-lg font-semibold"
          >
            Password:
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {errorMessage && (
        <p className="error-message text-xl text-red-500 p-2 font-bold mb-2">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Login;
