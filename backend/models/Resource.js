const pool = require("../config/db");

class Resource {
  static async createResource({ name, link, filePath }) {
    const query = `
      INSERT INTO resources (name, link, file_path)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, link, filePath];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async getAllResources() {
    const query = `
      SELECT * FROM resources;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = Resource;