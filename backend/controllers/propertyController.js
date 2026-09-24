const pool = require("../config/db");

// Get all properties
const getProperties = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM properties ORDER BY id"
    );

    res.json({
      success: true,
      properties: result.rows,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM properties WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.json({
      success: true,
      property: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching property:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
    });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
};