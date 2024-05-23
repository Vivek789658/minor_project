require("dotenv").config();
const PORT = process.env.PORT || 4000;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://univfeedbackhub.vercel.app/",
    credentials: true,
  })
);

mongoose
  .connect(process.env.DB_LINK, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const routes = require("./routes/routes");
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("server home");
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
