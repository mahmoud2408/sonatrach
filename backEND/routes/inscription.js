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

// GET /api/inscriptions/user/:userId
// Renvoie les activités auxquelles l'utilisateur est inscrit
router.get("/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "ID utilisateur invalide" });
  }

  try {
    const [rows] = await pool.execute(
      `
      SELECT
        i.id AS inscriptionId,
        a.id AS activityId,
        a.title,
        a.date,
        a.hour,
        a.description,
        CONCAT(u.firstName, ' ', u.lastName) AS trainer, 
        i.nom,
        i.prenom,
        i.age,
        i.relation
      FROM inscriptions i
      JOIN activities a ON i.activity_id = a.id
      JOIN users u ON a.trainer_id = u.id 
      WHERE i.user_id = ?
      ORDER BY a.date, a.hour
      `,
      [userId]
    );

    const formatted = rows.map((r) => ({
      ...r,
      date: new Date(r.date).toISOString().split("T")[0],
      hour: r.hour.slice(0, 5),
      trainer: r.trainer, // On récupère le nom concaténé
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({
      error: "Erreur lors de la récupération des inscriptions",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

module.exports = router;
