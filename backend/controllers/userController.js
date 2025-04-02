const { createUser, getUserByEmail } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const userDetails = req.body;
  try {
    // Check if the email already exists
    const existingUser = await getUserByEmail(userDetails.email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user
    const user = await createUser(userDetails);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Return the token and user details (excluding the password)
    res.status(200).json({ token, user: { ...user, password: undefined } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login };