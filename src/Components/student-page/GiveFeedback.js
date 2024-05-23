import React, { useEffect, useState } from "react";
import Header from "./Header";
import FeedbackFormBody from "./FeedbackFormBody";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";

const GiveFeedback = () => {
  const { feedbackFormName } = useParams();
  //console.log(feedbackFormName);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetchFeedbackForm();
  }, [feedbackFormName]);

  const fetchFeedbackForm = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/feedback/${feedbackFormName}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch feedback form");
      }

      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching feedback form:", error);
    } finally {
    }
  };

  return (
    <div className="max-h-screen">
      <Header />
      <div className="flex md:p-3 bg-cyan-50 p-1">
        <SideBar></SideBar>
        <FeedbackFormBody feedbackFormData={formData} />
      </div>
    </div>
  );
};

export default GiveFeedback;
