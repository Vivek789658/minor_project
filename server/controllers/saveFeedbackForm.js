const FeedbackForm = require("../models/FeedbackFormScheema");

const saveFeedbackForm = async (req, res) => {
  try {
    const formData = req.body.questions;

    // Create an array to store the questions
    const questions = [];

    // Loop through each question object and extract its fields
    formData.forEach((question) => {
      const { description, type, options } = question;
      questions.push({
        description,
        type,
        options,
      });
    });

    // Create a new instance of the FeedbackForm model
    const feedbackForm = new FeedbackForm({
      name: req.body.name,
      questions: questions,
      deadline: req.body.deadline,
      startTime: req.body.startTime,
    });

    // Save the feedback form to the database
    const savedFeedbackForm = await feedbackForm.save();

    res.status(201).json({
      message: "Feedback form saved successfully",
      feedbackForm: savedFeedbackForm,
    });
  } catch (error) {
    console.error("Error saving feedback form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { saveFeedbackForm };
