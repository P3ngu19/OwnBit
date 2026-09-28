const pool = require("../config/db");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const walletResult = await pool.query(
      `
      SELECT
        balance,
        invested_amount
      FROM wallets
      WHERE user_id = $1
      `,
      [userId]
    );

    const portfolioResult = await pool.query(
      `
      SELECT
        COALESCE(SUM(i.tokens), 0) AS total_tokens,
        COUNT(DISTINCT i.property_id) AS properties_owned,
        COUNT(*) AS total_investments
      FROM investments i
      WHERE i.user_id = $1
        AND i.status = 'completed'
      `,
      [userId]
    );

    const recentResult = await pool.query(
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
      LIMIT 5
      `,
      [userId]
    );

    if (walletResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found.",
      });
    }

    res.json({
      success: true,
      wallet: walletResult.rows[0],
      portfolio: portfolioResult.rows[0],
      recent_transactions: recentResult.rows,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard.",
    });
  }
};

module.exports = {
  getDashboard,
};