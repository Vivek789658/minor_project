const csv = require("csv-parser");
const fs = require("fs");
const Professor = require("../models/professorsScheema");
const Subject = require("../models/subjectsScheema");

async function assignSubjects(req, res) {
  try {
    const filePath = req.file.path;
    const stream = fs.createReadStream(filePath);

    stream
      .pipe(csv())
      .on("data", async (row) => {
        const { username, subjectCodes } = row;

        try {
          const professor = await Professor.findOne({ username });

          if (professor) {
            const subjectSections = subjectCodes.split(",");
            const assignments = [];

            for (const subjectSection of subjectSections) {
              const [subjectCode, section] = subjectSection.split(":");
              const subject = await Subject.findOne({ subjectCode });

              if (subject) {
                assignments.push({
                  subject: subject._id,
                  section: section,
                });
              } else {
                console.log(`Subject ${subjectCode} not found.`);
              }
            }

            await Professor.findByIdAndUpdate(professor._id, {
              $set: { subjects: assignments },
            });
          } else {
            console.log(`Professor ${username} not found.`);
          }
        } catch (error) {
          console.error(
            `Error assigning subjects to professor ${username}:`,
            error
          );
        }
      })
      .on("end", () => {
        console.log("CSV file processed successfully.");
        res.status(200).json({ message: "Subjects assigned successfully" });
      });
  } catch (error) {
    console.error("Error processing CSV file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  assignSubjects,
};
