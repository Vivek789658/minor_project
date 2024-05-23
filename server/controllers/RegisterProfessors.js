const ProfessorsModel = require("../models/professorsScheema");
const SubjectsModel = require("../models/subjectsScheema");
const fs = require("fs");

const RegisterProfessors = async (req, res) => {
  // Function to parse csv file
  function parseCSV(filePath) {
    const csv = require("csv-parser");
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (err) => reject(err));
    });
  }

  // Function to convert CSV data to objects
  function convertCSVToObjects(csvData) {
    return csvData.map((data) => ({
      username: data.username,
      password: data.password,
      name: data.name,
      address: data.address,
      type: data.type,
    }));
  }
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file selected" });
    }

    // Read the uploaded CSV file
    const csvData = await parseCSV(req.file.path);

    // Convert CSV data to an array of objects suitable for MongoDB
    const formattedData = convertCSVToObjects(csvData);

    // Insert data into MongoDB using the UserModel
    await ProfessorsModel.insertMany(formattedData);

    res.json({
      message: "CSV data uploaded *and subjects assigned* successfully",
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading CSV data" });
  } finally {
    // Clean up the uploaded file (optional)
    fs.unlinkSync(req.file.path);
  }
};

module.exports = { RegisterProfessors };
