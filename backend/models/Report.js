const pool = require("../config/db");

class Report {
  static async createReport({ name, email, message, anonymous }) {
    const query = `
      INSERT INTO reports (name, email, message, anonymous)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, email, message, anonymous];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = Report;