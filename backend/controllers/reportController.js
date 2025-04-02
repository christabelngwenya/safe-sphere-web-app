const Report = require("../models/Report");

const submitReport = async (req, res) => {
  const { name, email, message, anonymous } = req.body;

  try {
    if (!message.trim()) {
      return res.status(400).json({ error: "Please describe the abuse before submitting." });
    }

    if (!anonymous && !validateEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const newReport = await Report.createReport({ name, email, message, anonymous });
    res.status(201).json({ message: "Report submitted successfully!", report: newReport });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ error: "There was an error submitting your report. Please try again." });
  }
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

module.exports = { submitReport };