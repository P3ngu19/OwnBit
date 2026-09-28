const pool = require("../config/db");

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        i.id,
        i.property_id,
        p.title AS property,
        i.tokens,
        i.amount,
        i.status,
        i.created_at
      FROM investments i
      JOIN properties p
        ON i.property_id = p.id
      WHERE i.user_id = $1
      ORDER BY i.created_at DESC
      `,
      [userId]
    );

    res.json({
      success: true,
      transactions: result.rows,
    });
  } catch (error) {
    console.error("Transactions error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions.",
    });
  }
};

module.exports = {
  getTransactions,
};