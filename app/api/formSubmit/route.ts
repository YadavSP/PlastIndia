// pages/api/storeData.js

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, mobile, interest } = req.body;

    // Validate input
    if (!name || !email || !mobile || !interest) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO your_table_name (name, email, mobile, interest) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, mobile, interest]
      );

      return res.status(201).json({ message: 'Data inserted successfully', data: result.rows[0] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
