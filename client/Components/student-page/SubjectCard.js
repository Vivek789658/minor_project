import { Link } from "react-router-dom";

const SubjectCard = ({ subjectName, subjectCode, professorName }) => {
  const userDataString = localStorage.getItem("userData");
  const { section } = userDataString ? JSON.parse(userDataString) : {};
  const feedbackFormName = subjectCode + "_" + section;
  // console.log(feedbackFormName);
  const truncatedSubjectName =
    subjectName.length > 25
      ? subjectName.substring(0, 25) + "..."
      : subjectName;

  return (
    <div className="p-4 border-2 my-3 border-green-300 w-full max-w-sm mx-auto shadow-md rounded-lg hover:shadow-lg  bg-green-100 hover:shadow:lg transition-all duration-200 ease-in-out">
      <h2
        className="mb-2 text-center font-semibold text-xl md:text-2xl"
        title={subjectName}
      >
        {truncatedSubjectName}
      </h2>
      <h3 className="mb-2 text-center font-medium text-md md:text-lg">
        Sub Code: {subjectCode}
      </h3>
      <div className="flex justify-center mb-4">
        <Link
          to={`/giveFeedback/${feedbackFormName}`}
          className="flex items-center text-white border-2 border-green-700 py-2 px-4 bg-green-500 rounded-md hover:bg-green-600 hover:shadow-xl text-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-all duration-200 ease-in-out"
        >
          <span>Give Feedback</span>
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
      <p className="text-center text-gray-700">{professorName}</p>
    </div>
  );
};

export default SubjectCard;
