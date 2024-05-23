import Header from "./Header";
import SideBar from "./SideBar";
import SubjectCard from "./SubjectCard";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";

const StudentPage = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const studentId = userData ? userData._id : null;
  const [subjects, setSubjects] = useState([]);
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    fetchSubjects(studentId);
    fetchProfessors(studentId);
  }, []);

  const fetchSubjects = async (studentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/getSubjects/${studentId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }
      const data = await response.json();
      setSubjects(data.subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchProfessors = async (studentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/getProfessors/${studentId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Professors");
      }
      const data = await response.json();
      setProfessors(data.professorsTeachingSubjects);
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex md:p-3 bg-cyan-50 p-1">
        <SideBar />
        <div className="w-5/6 h-[calc(100vh-15vh)] overflow-y-auto">
          <SearchBar />
          <div className="flex flex-wrap px-5 py-2 justify-center sm:justify-evenly ">
            {subjects.length > 0 &&
              professors.length === subjects.length &&
              subjects.map((subject, index) => (
                <div
                  key={subject._id}
                  className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2 flex justify-center"
                >
                  <SubjectCard
                    subjectName={subject.subjectName}
                    subjectCode={subject.subjectCode}
                    professorName={professors[index].professorName}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
