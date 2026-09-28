const pool = require("../config/db");

const createInvestment = async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = req.user.id;
    const { property_id, tokens } = req.body;

    if (!property_id || !tokens) {
      return res.status(400).json({
        success: false,
        message: "Property ID and token quantity are required.",
      });
    }

    if (!Number.isInteger(Number(tokens)) || Number(tokens) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Token quantity must be a positive whole number.",
      });
    }

    await client.query("BEGIN");

    // Get property
    const propertyResult = await client.query(
      "SELECT * FROM properties WHERE id = $1 FOR UPDATE",
      [property_id]
    );

    if (propertyResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    const property = propertyResult.rows[0];
    const tokenQuantity = Number(tokens);
    const tokenPrice = Number(property.token_price);
    const availableTokens = Number(property.available_tokens);

    if (tokenQuantity > availableTokens) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        success: false,
        message: "Not enough tokens available.",
      });
    }

    const investmentAmount = tokenQuantity * tokenPrice;

    // Get user's wallet
    const walletResult = await client.query(
      "SELECT * FROM wallets WHERE user_id = $1 FOR UPDATE",
      [userId]
    );

    if (walletResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Wallet not found.",
      });
    }

    const wallet = walletResult.rows[0];
    const balance = Number(wallet.balance);

    if (balance < investmentAmount) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        success: false,
        message: "Insufficient wallet balance.",
        required: investmentAmount,
        available: balance,
      });
    }

    // Create investment
    const investmentResult = await client.query(
      `INSERT INTO investments
       (user_id, property_id, tokens, amount, status)
       VALUES ($1, $2, $3, $4, 'completed')
       RETURNING *`,
      [userId, property_id, tokenQuantity, investmentAmount]
    );

    // Deduct wallet balance
    await client.query(
      `UPDATE wallets
       SET balance = balance - $1,
           invested_amount = invested_amount + $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $2`,
      [investmentAmount, userId]
    );

    // Reduce available property tokens
    await client.query(
      `UPDATE properties
       SET available_tokens = available_tokens - $1
       WHERE id = $2`,
      [tokenQuantity, property_id]
    );

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Investment successful.",
      investment: investmentResult.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Investment error:", error);

    res.status(500).json({
      success: false,
      message: "Investment failed.",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  createInvestment,
};