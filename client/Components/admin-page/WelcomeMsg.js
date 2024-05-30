import React from "react";

const WelcomeMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg shadow-md p-8">
      <svg
        className="w-20 h-20 mb-6 text-white"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 11v3l3-3m0 0l3 3v-3m-12 4v4l12-12m0 0l12 12v-4z"
        />
      </svg>
      <h2 className="text-3xl font-bold mb-4">Ready to Administer?</h2>
      <p className="text-lg leading-relaxed text-center">
        Take control and manage your Students, Subjects, Professors and more
        with ease.
      </p>
    </div>
  );
};

export default WelcomeMessage;
