const pool = require("../config/db");

const getCertificates = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        i.id,
        i.property_id,
        p.title AS property,
        p.location,
        i.tokens,
        i.amount AS invested_amount,
        i.status,
        i.created_at
      FROM investments i
      JOIN properties p
        ON i.property_id = p.id
      WHERE i.user_id = $1
        AND i.status = 'completed'
      ORDER BY i.created_at DESC
      `,
      [userId]
    );

    const certificates = result.rows.map((investment) => ({
      certificate_id: `OBT-${new Date(
        investment.created_at
      ).getFullYear()}-${String(investment.id).padStart(4, "0")}`,

      investment_id: investment.id,

      property_id: investment.property_id,

      property: investment.property,

      location: investment.location,

      tokens: investment.tokens,

      invested_amount: investment.invested_amount,

      status: investment.status,

      issued_at: investment.created_at,
    }));

    res.json({
      success: true,
      certificates,
    });
  } catch (error) {
    console.error("Certificates error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch certificates.",
    });
  }
};

module.exports = {
  getCertificates,
};