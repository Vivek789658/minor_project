const express = require("express");
const Router = express.Router();
const { RegisterUsers } = require("../../server/controllers/RegisterStudents");
const multer = require("multer");
const upload = multer({ dest: "TempUploads/" });
const { UserLogin } = require("../../server/controllers/UserLogin");
const { addSubjects } = require("../../server/controllers/addSubjects");
const {
  RegisterProfessors,
} = require("../../server/controllers/RegisterProfessors");
const { assignSubjects } = require("../../server/controllers/assignSubjects");
const { getSubjects } = require("../../server/controllers/getSubjects");
const { getProfessors } = require("../controllers/getProfessors");
const { saveFeedbackForm } = require("../controllers/saveFeedbackForm");
const { getFeedbackFormByName } = require("../controllers/getFeedbackForm");
const { getAllFeedbackForms } = require("../controllers/getAllFeedbackForms");
const { submitFeedback } = require("../controllers/submitFeedback");
const { getFeedbackData } = require("../controllers/getfeedbackResponses");
const { RegisterAdmins } = require("../controllers/RegisterAdmins");
const {
  checkSubmissionStatus,
} = require("../controllers/checkSubmissionStatus");
const { saveReplyData } = require("../controllers/professorReply");
const { getReplyData } = require("../controllers/getReply");
const { contactAdmin } = require("../controllers/contactAdmin");
const { showProfessorQuery } = require("../controllers/showProfessorQueries");
const { showProfNotifications } = require("../controllers/profNotification");
const { getStudentDetails } = require("../controllers/getStudentDetails");
const {
  handleStatusRequest,
} = require("../controllers/handleProfessorRequest");
const { createContact } = require("../controllers/contact");
const { getStudentsDetails } = require("../controllers/getStudentsDetails");
const FeedbackForm = require("../models/FeedbackFormScheema");
const Student = require("../models/StudentSchema");
const Notification = require("../models/NotificationSchema");
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
Router.post("/registerUser", upload.single("file"), RegisterUsers);
Router.post("/login", UserLogin);
Router.post("/addSubjects", upload.single("file"), addSubjects);
Router.post("/registerProfessors", upload.single("file"), RegisterProfessors);
Router.post("/assignSubjects", upload.single("file"), assignSubjects);
Router.get("/getSubjects/:studentId", getSubjects);
Router.get("/getProfessors/:studentId", getProfessors);
Router.post("/createFeedbackForm", async (req, res) => {
  try {
    console.log("Received feedback form data:", req.body);
    const result = await saveFeedbackForm(req, res);
    console.log("Feedback form creation result:", result);
  } catch (error) {
    console.error("Error in createFeedbackForm route:", error);
    res.status(500).json({
      message: "Internal server error while creating feedback form"
    });
  }
});
Router.get("/getAllFeedbackForms", getAllFeedbackForms);
Router.post("/submitFeedback", submitFeedback);
Router.get("/getfeedbackResponses/:feedbackFormName", getFeedbackData);
Router.post("/registerAdmins", upload.single("file"), RegisterAdmins);
Router.get("/checkSubmissionStatus", checkSubmissionStatus);
Router.post("/submitReply", saveReplyData);
Router.get("/getReply/:_id", getReplyData);
Router.post("/contactAdmin", contactAdmin);
Router.get("/professorQueries", showProfessorQuery);
Router.get("/professorQueries/:_id", showProfNotifications);
Router.get("/getStudentDetails/:studentId", getStudentDetails);
Router.post("/professorQueries/:requestId/:status", handleStatusRequest);
Router.post("/contactUs", createContact);
Router.get("/getFeedbackForm/:feedbackFormName", async (req, res) => {
  try {
    const { feedbackFormName } = req.params;
    console.log("Fetching feedback form:", feedbackFormName);

    const feedbackForm = await FeedbackForm.findOne({ name: feedbackFormName });
    console.log("Found feedback form:", feedbackForm);

    if (!feedbackForm) {
      return res.status(404).json({
        success: false,
        message: "Feedback form not found"
      });
    }

    res.json({
      success: true,
      feedbackForm: {
        name: feedbackForm.name,
        questions: feedbackForm.questions,
        startTime: feedbackForm.startTime,
        deadline: feedbackForm.deadline,
        subjectCode: feedbackForm.subjectCode,
        section: feedbackForm.section
      }
    });
  } catch (error) {
    console.error("Error fetching feedback form:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback form"
    });
  }
});

// Add new route for chart data
Router.get("/data", async (req, res) => {
  try {
    // This is sample data - in a real application, you would fetch this from your database
    const chartData = {
      "Excellent": 15,
      "Good": 25,
      "Average": 10,
      "Poor": 5,
      "Very Poor": 2
    };

    res.json(chartData);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chart data"
    });
  }
});

Router.delete("/deleteFeedbackForm/:formName", async (req, res) => {
  try {
    const { formName } = req.params;
    console.log("Deleting feedback form:", formName);

    const result = await FeedbackForm.deleteOne({ name: formName });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Feedback form not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback form deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting feedback form:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete feedback form"
    });
  }
});

// Get student notifications
Router.get("/getStudentNotifications/:studentId", async (req, res) => {
  try {
    const notifications = await Notification.find({ studentId: req.params.studentId })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Failed to fetch notifications" });
  }
});

// Get student completed feedback forms
Router.get("/getStudentSubmissions/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const FeedbackResponse = require("../models/FeedbackResponseScheema");
    const FeedbackForm = require("../models/FeedbackFormScheema");

    // Find all responses from this student
    const responses = await FeedbackResponse.find({ studentId }).sort({ submittedAt: -1 });

    // Get the form details for each submission
    const submissions = [];

    for (const response of responses) {
      const form = await FeedbackForm.findOne({ name: response.formName });
      if (form) {
        submissions.push({
          _id: response._id,
          formName: response.formName,
          submittedAt: response.submittedAt,
          formData: {
            name: form.name,
            subjectCode: form.subjectCode,
            section: form.section,
            questions: form.questions.length
          }
        });
      }
    }

    res.json({ success: true, submissions });
  } catch (error) {
    console.error("Error fetching student submissions:", error);
    res.status(500).json({ success: false, message: "Failed to fetch student submissions" });
  }
});

// Accept notification
Router.post("/acceptNotification/:notificationId", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }
    notification.accepted = true;
    await notification.save();
    res.json({ success: true, message: "Notification accepted" });
  } catch (error) {
    console.error("Error accepting notification:", error);
    res.status(500).json({ success: false, message: "Failed to accept notification" });
  }
});

// Add the new route after other route definitions
Router.post("/getStudentsDetails", getStudentsDetails);

// Update feedback form
Router.put("/updateFeedbackForm/:formName", async (req, res) => {
  try {
    const { formName } = req.params;
    const { questions, startTime, deadline } = req.body;

    console.log("Updating feedback form:", { formName, questions, startTime, deadline });

    // Find the feedback form
    const feedbackForm = await FeedbackForm.findOne({ name: formName });
    if (!feedbackForm) {
      return res.status(404).json({
        success: false,
        message: "Feedback form not found"
      });
    }

    // Update only allowed fields
    feedbackForm.questions = questions;
    feedbackForm.startTime = startTime;
    feedbackForm.deadline = deadline;

    // Save the updated form
    await feedbackForm.save();

    console.log("Feedback form updated successfully");

    res.status(200).json({
      success: true,
      message: "Feedback form updated successfully",
      feedbackForm
    });
  } catch (error) {
    console.error("Error updating feedback form:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update feedback form"
    });
  }
});

module.exports = Router;
