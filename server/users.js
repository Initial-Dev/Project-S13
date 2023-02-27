import db from '../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await db.query('SELECT * FROM users');
    const users = result.rows;
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
