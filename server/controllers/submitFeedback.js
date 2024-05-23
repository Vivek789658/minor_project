const FeedbacksReceived = require("../models/FeedbacksReceived");

const submitFeedback = async (req, res) => {
  try {
    const { name, responses } = req.body;

    // Find the existing feedback document based on the name
    let feedback = await FeedbacksReceived.findOne({ name });

    // If the feedback document doesn't exist, create a new one
    if (!feedback) {
      feedback = new FeedbacksReceived({
        name,
        responses: responses.map(({ studentId, answers }) => ({
          studentId,
          answers,
        })),
      });
    } else {
      // Iterate over each response and update the answers array for each student
      responses.forEach(({ studentId, answers }) => {
        const index = feedback.responses.findIndex(
          (res) => res.studentId === studentId
        );
        if (index === -1) {
          feedback.responses.push({ studentId, answers });
        } else {
          feedback.responses[index].answers.push(...answers);
        }
      });
    }

    // Save the updated feedback document to the database
    await feedback.save();

    // Send a success response
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    // Send an error response
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};

module.exports = { submitFeedback };
