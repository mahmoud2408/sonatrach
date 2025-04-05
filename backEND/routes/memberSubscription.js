// backend/routes/memberSubscription.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// POST endpoint : Simuler le paiement et inscrire l'utilisateur dans la table membres
router.post("/payer-abonnement", async (req, res) => {
  try {
    const { user_id, categorie } = req.body;
    if (!user_id || !categorie) {
      return res
        .status(400)
        .json({ error: "user_id et categorie sont requis." });
    }
    // Vérifier si l'utilisateur est déjà membre
    const [existing] = await pool.execute(
      "SELECT id FROM membres WHERE user_id = ?",
      [user_id]
    );
    if (existing.length > 0) {
      return res
        .status(400)
        .json({ error: "Cet utilisateur est déjà membre." });
    }
    // Récupérer les informations de l'utilisateur depuis la table users
    const [userRows] = await pool.execute(
      "SELECT firstName, lastName, email FROM users WHERE id = ?",
      [user_id]
    );
    if (userRows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    const { firstName, lastName, email } = userRows[0];
    // Insérer l'utilisateur dans la table membres
    await pool.execute(
      "INSERT INTO membres (user_id, nom, email, categorie, date_inscription, abonnement_expire) VALUES (?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR))",
      [user_id, `${firstName} ${lastName}`, email, categorie]
    );
    res
      .status(201)
      .json({ message: "Abonnement payé et membre ajouté avec succès." });
  } catch (error) {
    console.error("Erreur lors du paiement de l'abonnement :", error);
    res
      .status(500)
      .json({ error: "Erreur interne lors du paiement de l'abonnement." });
  }
});

// GET endpoint : récupérer la liste des membres inscrits
// Cette route répondra à GET /api/members
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM membres");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des membres :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des membres." });
  }
});

module.exports = router;
