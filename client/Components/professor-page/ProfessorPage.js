import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../student-page/Header";
import SideBar from "../student-page/SideBar";
import ChartVisualization from "./ChartVisualization";
import Alert from "../common/Alert";
require("dotenv").config();
const BASE_URL = "http://localhost:4000";

const ProfessorPage = () => {
  const [professorInfo, setProfessorInfo] = useState(null);
  const [showCharts, setShowCharts] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfessorInfo();
  }, []);

  const fetchProfessorInfo = async () => {
    setLoading(true);
    setError("");

    try {
      // Get professor ID from localStorage
      const userDataString = localStorage.getItem("userData");
      if (!userDataString) {
        throw new Error("User data not found. Please login again.");
      }

      const userData = JSON.parse(userDataString);
      if (!userData._id) {
        throw new Error("Invalid user data. Please login again.");
      }

      // Use getSubjects endpoint which can handle both students and professors
      const response = await fetch(`${BASE_URL}/api/v1/getSubjects/${userData._id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch professor info");
      }

      const data = await response.json();

      // Create professor info object based on what we have
      setProfessorInfo({
        name: userData.name || "Professor Name",
        department: "Department", // This could come from a different endpoint if needed
        email: userData.username || "professor@university.edu",
        subjectsTaught: data.subjects ? data.subjects.map(subject => `${subject.subjectName} (${subject.subjectCode})`) : []
      });

    } catch (error) {
      console.error("Error fetching professor info:", error);
      setError(error.message || "Failed to load professor information");
    } finally {
      setLoading(false);
    }
  };

  const handleShowCharts = () => {
    setShowCharts(true);
  };

  const handleBackToDashboard = () => {
    setShowCharts(false);
  };

  if (showCharts) {
    return (
      <div>
        <Header />
        <div className="flex md:p-3 bg-cyan-50 p-1">
          <SideBar />
          <div className="w-5/6 h-[calc(100vh-15vh)] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Chart Visualizations</h1>
              <button
                onClick={handleBackToDashboard}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
            <ChartVisualization />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex md:p-3 bg-cyan-50 p-1">
        <SideBar />
        <div className="w-5/6 h-[calc(100vh-15vh)] overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Professor Dashboard</h1>

          {error && (
            <Alert
              type="error"
              message={error}
              title="Error"
              className="mb-4"
              onClose={() => setError("")}
            />
          )}

          {loading ? (
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ) : professorInfo && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">{professorInfo.name}</h2>
              <p><strong>Department:</strong> {professorInfo.department}</p>
              <p><strong>Email:</strong> {professorInfo.email}</p>
              <p><strong>Subjects Taught:</strong> {professorInfo.subjectsTaught.length > 0 ?
                professorInfo.subjectsTaught.join(", ") : "No subjects assigned yet"}
              </p>
            </div>
          )}

          <button
            onClick={handleShowCharts}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors mb-6"
          >
            Visualize Feedback Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessorPage;
