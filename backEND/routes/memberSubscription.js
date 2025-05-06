// backend/routes/memberSubscription.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const sonatrachPool = require("../config/sonatrachDb");

// POST endpoint : Paiement d'abonnement
router.post("/payer-abonnement", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { user_id, categorie } = req.body;

    // Validation des données
    if (!user_id || !categorie) {
      return res.status(400).json({
        error: "Les champs user_id et categorie sont requis.",
      });
    }

    // Vérification de l'existence du membre
    const [existing] = await connection.execute(
      "SELECT id, categorie FROM membres WHERE user_id = ?",
      [user_id]
    );

    // Gestion des cas selon le statut existant
    if (existing.length > 0) {
      const currentCategory = existing[0].categorie.toLowerCase();
      const requestedCategory = categorie.toLowerCase();

      // Cas 1: Déjà Premium
      if (currentCategory === "premium") {
        return res.status(409).json({
          error: "Vous possédez déjà un abonnement Premium.",
        });
      }

      // Cas 2: Standard tentant autre chose qu'une amélioration
      if (currentCategory === "standard" && requestedCategory !== "ameliorer") {
        return res.status(409).json({
          error: "Vous ne pouvez que améliorer votre abonnement Standard.",
        });
      }
    } else {
      // Cas 3: Nouvel utilisateur tentant une amélioration
      if (categorie.toLowerCase() === "ameliorer") {
        return res.status(400).json({
          error: "Vous devez d'abord souscrire à un abonnement Standard.",
        });
      }
    }

    // ... (le reste du code reste inchangé jusqu'à la mise à jour/insertion)

    // Vérification de la réussite de l'opération
    let result;
    if (categorie === "ameliorer") {
      [result] = await connection.execute(
        `UPDATE membres SET 
          categorie = ?, 
          abonnement_expire = DATE_ADD(NOW(), INTERVAL 1 YEAR) 
        WHERE user_id = ?`,
        ["premium", user_id]
      );

      if (result.affectedRows === 0) {
        throw new Error("Échec de la mise à jour de l'abonnement");
      }
    } else {
      [result] = await connection.execute(
        `INSERT INTO membres 
          (user_id, nom, email, categorie, date_inscription, abonnement_expire) 
        VALUES (?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR))`,
        [user_id, nomComplet, email, categorie]
      );
    }

    // Mise à jour de la session
    req.session.isMembre = true;
    req.session.categorie = categorie;
    await req.session.save();

    res.status(200).json({
      message: "Abonnement mis à jour avec succès.",
      newCategorie: categorie,
      newExpiration: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  } catch (error) {
    console.error("Erreur critique:", error);
    res.status(500).json({
      error: "Échec du traitement de l'abonnement. Veuillez réessayer.",
    });
  } finally {
    connection.release();
  }
});

// GET endpoint : Récupération des informations membre
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.execute(
      `SELECT 
        id, 
        user_id, 
        nom, 
        email, 
        categorie, 
        DATE_FORMAT(date_inscription, '%Y-%m-%d') AS date_inscription,
        DATE_FORMAT(abonnement_expire, '%Y-%m-%d') AS abonnement_expire
      FROM membres 
      WHERE user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Profil membre introuvable." });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erreur de récupération:", error);
    res.status(500).json({
      error: "Impossible de charger les informations du membre.",
    });
  }
});

module.exports = router;
