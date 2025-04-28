const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// POST /api/inscriptions
// Corps attendu : { nom, prenom, age, relation, activite }
router.post("/", async (req, res) => {
  try {
    const { nom, prenom, age, relation, activite } = req.body;
    const currentUserId = req.session.userId; // Assurez-vous que l'ID de l'utilisateur est disponible
    // Vérifier que l'utilisateur est connecté
    if (!currentUserId) {
      return res.status(401).json({ error: "Utilisateur non connecté." });
    }
    // Vérifier que l'utilisateur est un membre
    const [user] = await pool.execute(
      "SELECT * FROM membres WHERE user_id = ?",
      [currentUserId]
    );
    if (user.length === 0) {
      return res.status(403).json({ error: "Accès interdit." });
    }

    // Vérifier que l'utilisateur n'est pas déjà inscrit à l'activité
    const [existingInscription] = await pool.execute(
      "SELECT * FROM inscriptions WHERE user_id = ? AND activity_id = ?",
      [currentUserId, activite]
    );
    if (existingInscription.length > 0) {
      return res
        .status(409)
        .json({ error: "Vous êtes déjà inscrit à cette activité." });
    }
    // Vérifier la présence de tous les champs
    if (!nom || !prenom || !age || !relation || !activite) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }
    if (isNaN(age) || age < 0) {
      return res
        .status(400)
        .json({ error: "L'âge doit être un nombre valide." });
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
      `INSERT INTO inscriptions (user_id, nom, prenom, age, relation, activity_id)
 VALUES (?, ?, ?, ?, ?, ?)`,
      [currentUserId, nom, prenom, age, relation, activite]
    );
    // Incrémenter membersCount dans activities
    await connection.execute(
      "UPDATE activities SET membersCount = membersCount + 1 WHERE id = ?",
      [activite]
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
