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
Router.post("/createFeedbackForm", saveFeedbackForm);
Router.get("/feedback/:feedbackFormName", getFeedbackFormByName);
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
Router.put("/professorQueries/:requestId/:status", handleStatusRequest);
Router.post("/contactUs", createContact);

module.exports = Router;
