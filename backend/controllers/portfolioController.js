const pool = require("../config/db");

const getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        i.id,
        i.property_id,
        p.title AS property,
        p.location,
        p.image,
        i.tokens,
        i.amount AS invested_amount,
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

    const summaryResult = await pool.query(
      `
      SELECT
        COALESCE(SUM(amount), 0) AS total_invested,
        COALESCE(SUM(tokens), 0) AS total_tokens,
        COUNT(*) AS total_investments
      FROM investments
      WHERE user_id = $1
        AND status = 'completed'
      `,
      [userId]
    );

    res.json({
      success: true,
      summary: summaryResult.rows[0],
      investments: result.rows,
    });
  } catch (error) {
    console.error("Portfolio error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio.",
    });
  }
};

module.exports = {
  getPortfolio,
};