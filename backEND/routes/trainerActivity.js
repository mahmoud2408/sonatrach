// backend/routes/trainerActivity.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const trainerOnly = require("../middleware/trainerOnly");

// Créer une activité (déjà en place)
router.post("/activity", trainerOnly, async (req, res) => {
  try {
    const { title, date, hour, description } = req.body;
    const trainer_id = req.session.userId;
    if (!title || !date || !hour || !description) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }
    const [result] = await pool.execute(
      `INSERT INTO activities 
         (title, date, hour, description, trainer_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [title, date, hour, description, trainer_id]
    );
    res
      .status(201)
      .json({
        message: "Activité créée avec succès.",
        activityId: result.insertId,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Récupérer la liste des activités du coach connecté
router.get("/activities", trainerOnly, async (req, res) => {
  try {
    const trainer_id = req.session.userId;
    const [rows] = await pool.execute(
      "SELECT id, title, date, hour, description FROM activities WHERE trainer_id = ?",
      [trainer_id]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des activités." });
  }
});

// Modifier une de ses activités
router.put("/activity/:id", trainerOnly, async (req, res) => {
  try {
    const trainer_id = req.session.userId;
    const { id } = req.params;
    const { title, date, hour, description } = req.body;
    // S'assurer que l'activité appartient bien à ce coach
    const [check] = await pool.execute(
      "SELECT id FROM activities WHERE id = ? AND trainer_id = ?",
      [id, trainer_id]
    );
    if (check.length === 0) {
      return res
        .status(403)
        .json({ error: "Accès interdit ou activité introuvable." });
    }
    await pool.execute(
      "UPDATE activities SET title = ?, date = ?, hour = ?, description = ? WHERE id = ?",
      [title, date, hour, description, id]
    );
    res.status(200).json({ message: "Activité mise à jour." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
});

// Supprimer une de ses activités
router.delete("/activity/:id", trainerOnly, async (req, res) => {
  try {
    const trainer_id = req.session.userId;
    const { id } = req.params;
    const [check] = await pool.execute(
      "SELECT id FROM activities WHERE id = ? AND trainer_id = ?",
      [id, trainer_id]
    );
    if (check.length === 0) {
      return res
        .status(403)
        .json({ error: "Accès interdit ou activité introuvable." });
    }
    await pool.execute("DELETE FROM activities WHERE id = ?", [id]);
    res.status(200).json({ message: "Activité supprimée." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la suppression." });
  }
});

module.exports = router;
