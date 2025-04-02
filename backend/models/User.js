const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const User = {
  // Find user by email
  async findByEmail(email) {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
  },

  // Create new user
  async create(userData) {
    const { email, password, name, surname } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { rows } = await db.query(
      `INSERT INTO users (email, password_hash, name, surname) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [email, hashedPassword, name, surname]
    );
    
    return rows[0];
  },

  // Compare password with hash
  async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  },

  // Generate JWT token
  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  },

  // Update user profile
  async updateProfile(userId, profileData) {
    const { rows } = await db.query(
      `UPDATE users 
       SET name = $1, surname = $2, contact_info = $3, college = $4, 
           emergency_contact = $5, next_of_kin = $6, next_of_kin_contact = $7,
           expected_completion_year = $8, program = $9, campus_status = $10, 
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $11 RETURNING *`,
      [
        profileData.name,
        profileData.surname,
        profileData.contactInfo,
        profileData.college,
        profileData.emergencyContact,
        profileData.nextOfKin,
        profileData.nextOfKinContact,
        profileData.expectedCompletionYear,
        profileData.program,
        profileData.campusStatus,
        userId
      ]
    );
    return rows[0];
  },

  // Find user by ID
  async findById(userId) {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    return rows[0];
  }
};

module.exports = User;