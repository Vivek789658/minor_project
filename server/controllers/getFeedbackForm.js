const FeedbackForm = require("../models/FeedbackFormScheema");

const getFeedbackFormByName = async (req, res) => {
  try {
    const { feedbackFormName } = req.params;

    const feedbackForm = await FeedbackForm.findOne({ name: feedbackFormName });

    if (!feedbackForm) {
      return res.status(404).json({ message: "Feedback form not found" });
    }

    res.json({ feedbackForm });
  } catch (error) {
    console.error("Error fetching feedback form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getFeedbackFormByName };
