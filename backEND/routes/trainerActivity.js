// backend/routes/trainerActivity.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const trainerOnly = require("../middleware/trainerOnly");

router.post("/activity", trainerOnly, async (req, res) => {
  try {
    const { title, date, hour, description } = req.body;
    const trainer_id = req.session.userId;

    // Vérification des champs
    if (!title || !date || !hour || !description) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Insère l’activité, en liant trainer_id
    const [result] = await pool.execute(
      `INSERT INTO activities 
         (title, date, hour, description, trainer_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [title, date, hour, description, trainer_id]
    );

    res.status(201).json({
      message: "Activité créée avec succès.",
      activityId: result.insertId,
    });
  } catch (err) {
    console.error("Erreur création activité entraîneur:", err);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
