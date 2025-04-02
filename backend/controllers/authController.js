const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  /**
   * Register a new user
   */
  async register(req, res) {
    try {
      const { email, password, name, surname } = req.body;

      // Validate input
      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }

      // Check if user exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Create new user
      const user = await User.create({ email, password, name, surname });
      const token = User.generateToken(user);

      // Return user data (excluding sensitive info)
      const userResponse = {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        createdAt: user.created_at
      };

      res.status(201).json({ 
        user: userResponse, 
        token 
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
  },

  /**
   * Login user
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await User.comparePassword(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = User.generateToken(user);

      // Return user data (excluding sensitive info)
      const userResponse = {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        contactInfo: user.contact_info,
        college: user.college,
        emergencyContact: user.emergency_contact,
        nextOfKin: user.next_of_kin,
        nextOfKinContact: user.next_of_kin_contact,
        expectedCompletionYear: user.expected_completion_year,
        program: user.program,
        campusStatus: user.campus_status,
        createdAt: user.created_at
      };

      res.json({ 
        user: userResponse, 
        token 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed. Please try again.' });
    }
  },

  /**
   * Get user profile
   */
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return user data (excluding sensitive info)
      const userResponse = {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        contactInfo: user.contact_info,
        college: user.college,
        emergencyContact: user.emergency_contact,
        nextOfKin: user.next_of_kin,
        nextOfKinContact: user.next_of_kin_contact,
        expectedCompletionYear: user.expected_completion_year,
        program: user.program,
        campusStatus: user.campus_status,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      };

      res.json(userResponse);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Failed to get profile' });
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(req, res) {
    try {
      // Validate input
      const { name, surname } = req.body;
      if (!name || !surname) {
        return res.status(400).json({ error: 'Name and surname are required' });
      }

      const updatedUser = await User.updateProfile(req.user.id, req.body);
      
      // Return updated user data (excluding sensitive info)
      const userResponse = {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        surname: updatedUser.surname,
        contactInfo: updatedUser.contact_info,
        college: updatedUser.college,
        emergencyContact: updatedUser.emergency_contact,
        nextOfKin: updatedUser.next_of_kin,
        nextOfKinContact: updatedUser.next_of_kin_contact,
        expectedCompletionYear: updatedUser.expected_completion_year,
        program: updatedUser.program,
        campusStatus: updatedUser.campus_status,
        updatedAt: updatedUser.updated_at
      };

      res.json(userResponse);
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  },

  /**
   * Change password
   */
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current and new password are required' });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      // Get user
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Verify current password
      const isMatch = await User.comparePassword(currentPassword, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [
        hashedPassword,
        req.user.id
      ]);

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ error: 'Failed to change password' });
    }
  }
};

module.exports = authController;