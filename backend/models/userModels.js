const pool = require("../config/db");

const createUser = async (fullName, email, hashedPassword) => {
  const query = `
    INSERT INTO users (full_name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, full_name, email, role, created_at;
  `;

  const values = [fullName, email, hashedPassword];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1;
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};