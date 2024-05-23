import React, { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
require("dotenv").config();
const path = process.env.BASE_URL;

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const userDataString = localStorage.getItem("userData");
  const { type } = userDataString ? JSON.parse(userDataString) : { type: null };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${path}/api/v1/contactUs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }
    setTimeout(() => {
      navigate(`/${type}`);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Contact Us
        </h1>
        {submitted ? (
          <p className="text-green-500 text-center">
            Thank you for your message! We will get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                <FaUser className="inline mr-2" /> Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <FaEnvelope className="inline mr-2" /> Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                <FaCommentDots className="inline mr-2" /> Message
              </label>
              <textarea
                id="message"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
