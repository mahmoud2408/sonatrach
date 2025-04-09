const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// POST /api/inscriptions
// Corps attendu : { nom, prenom, age, relation, activite }
router.post("/", async (req, res) => {
  try {
    const { nom, prenom, age, relation, activite, currentUserId } = req.body;
    // Vérifier la présence de tous les champs
    if (!nom || !prenom || !age || !relation || !activite || !currentUserId) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }
    // Vérifier que l'activité existe
    const [acts] = await pool.execute(
      "SELECT id FROM activities WHERE id = ?",
      [activite]
    );
    if (acts.length === 0) {
      return res.status(404).json({ error: "Activité non trouvée." });
    }
    // Insérer l'inscription
    await pool.execute(
      `INSERT INTO inscriptions (nom, prenom, age, relation, activity_id, user_id)
       VALUES (?, ?, ?, ?, ?,?)`,
      [nom, prenom, age, relation, activite]
    );
    res
      .status(201)
      .json({ message: "Inscription à l'activité enregistrée avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'inscription à l'activité :", error);
    res
      .status(500)
      .json({ error: "Erreur interne lors de l'inscription à l'activité." });
  }
});

module.exports = router;
