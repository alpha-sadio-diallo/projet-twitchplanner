const pool = require('../db/db');

exports.getProfile = async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT id, email, twitch_url, logo, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.rows[0]);

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};