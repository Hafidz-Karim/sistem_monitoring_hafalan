import { Router } from 'express';
import pool from '../db/db';  // Assuming this is a connection pool

const router = Router();

// Get all records
router.get('/sistem_control_hafalan', async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM sistem_control_hafalan');
    res.json(results.rows);  // Return all rows
  } catch (error: any) {
    console.error('Error fetching data:', error.message); // Log the error
    res.status(500).json({ error: 'An error occurred' }); // Generic error message
  }
});

// Create a new record
router.post('/sistem_control_hafalan', async (req, res) => {
  const { nama, surah_for, ayat_for, surah_to, ayat_to, status, dibuat, diupdate } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO sistem_control_hafalan (nama, surah_for, ayat_for, surah_to, ayat_to, status, dibuat, diupdate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [nama, surah_for, ayat_for, surah_to, ayat_to, status, dibuat, diupdate]
    );
    res.json(result.rows[0]); // Return the newly created record
  } catch (error: any) {
    console.error('Error creating record:', error.message); // Log the error
    res.status(500).json({ error: 'An error occurred' }); // Generic error message
  }
});