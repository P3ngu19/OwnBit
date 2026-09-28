const pool = require("../config/db");

const getWallet = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        id,
        user_id,
        balance,
        invested_amount,
        created_at,
        updated_at
      FROM wallets
      WHERE user_id = $1
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found.",
      });
    }

    res.json({
      success: true,
      wallet: result.rows[0],
    });
  } catch (error) {
    console.error("Wallet error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch wallet.",
    });
  }
};

module.exports = {
  getWallet,
};