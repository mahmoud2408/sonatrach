const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const adminOnly = require("../middleware/adminOnly");

router.post("/activity", adminOnly, async (req, res) => {
  try {
    const { title, date, hour, description } = req.body;
    const [result] = await pool.execute(
      "INSERT INTO activities (title, date, hour, description) VALUES (?, ?, ?, ?)",
      [title, date, hour, description]
    );
    res.status(201).json({ message: "Activité ajoutée", activityId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'activité" });
  }
});

router.put("/activity/:id", adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, hour, description } = req.body;
    await pool.execute(
      "UPDATE activities SET title = ?, date = ?, hour = ?, description = ? WHERE id = ?",
      [title, date, hour, description, id]
    );
    res.status(200).json({ message: "Activité modifiée" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la modification de l'activité" });
  }
});

router.delete("/activity/:id", adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute("DELETE FROM activities WHERE id = ?", [id]);
    res.status(200).json({ message: "Activité supprimée" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'activité" });
  }
});

module.exports = router;
