const pool = require("../config/db");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        id,
        full_name,
        email,
        role,
        created_at
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name } = req.body;

    if (!full_name || !full_name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    const result = await pool.query(
      `
      UPDATE users
      SET full_name = $1
      WHERE id = $2
      RETURNING
        id,
        full_name,
        email,
        role,
        created_at
      `,
      [full_name.trim(), userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully.",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};