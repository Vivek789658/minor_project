import Header from "../student-page/Header";
import SideBar from "../student-page/SideBar";
import SearchBar from "../student-page/SearchBar";
import ProfessorCard from "./ProfessorCard";
import { useEffect, useState } from "react";
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

const ProfessorPage = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const professorId = userData._id;
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects(professorId);
  }, []);

  const fetchSubjects = async (professorId) => {
    try {
      // Make a GET request to your backend API endpoint to fetch subjects
      const response = await fetch(
        `${BASE_URL}/api/v1/getSubjects/${professorId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }
      const data = await response.json();
      //console.log("Received subjects:", data.subjects);
      setSubjects(data.subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex md:p-3 bg-cyan-50 p-1">
        <SideBar />
        <div className="w-5/6 h-[calc(100vh-15vh)] overflow-y-auto">
          <SearchBar />
          <div className="flex flex-wrap px-5 py-2 justify-center sm:justify-evenly">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2 flex justify-center"
              >
                <ProfessorCard
                  subjectName={subject.subjectName}
                  subjectCode={subject.subjectCode}
                  semester={subject.semester}
                  course={subject.course}
                  section={subject.section}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorPage;
