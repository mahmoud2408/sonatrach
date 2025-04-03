// backend/routes/publicActivity.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM activities');
    // Empêche la mise en cache de la réponse
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des activités :", error);
    res.status(500).json({ error: "Erreur interne lors de la récupération des activités." });
  }
});

module.exports = router;
