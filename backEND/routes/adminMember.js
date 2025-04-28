// backend/routes/adminMember.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const adminOnly = require("../middleware/adminOnly");

// Récupérer tous les membres
router.get("/members", adminOnly, async (req, res) => {
  try {
    const [members] = await pool.execute(
      `SELECT id, user_id, nom, email,telephone, categorie, date_inscription, abonnement_expire FROM membres`
    );
    res.status(200).json(members);
  } catch (error) {
    console.error("Erreur lors de la récupération des membres :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des membres" });
  }
});

// Modifier un membre
router.put("/member/:id", adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, mobile, categorie, abonnement_expire } = req.body;
    const dateObj = new Date(abonnement_expire);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: "Date invalide" });
    }

    // Vérifier que le membre existe
    const [check] = await pool.execute("SELECT id FROM membres WHERE id = ?", [
      id,
    ]);
    if (check.length === 0) {
      return res.status(404).json({ error: "Membre non trouvé" });
    }

    // Mettre à jour le membre
    await pool.execute(
      `UPDATE membres
        SET nom = ?, email = ?,telephone = ?, categorie = ?, abonnement_expire = ?
       WHERE id = ?`,
      [
        nom,
        email,
        mobile,
        categorie,
        dateObj.toISOString().slice(0, 19).replace("T", " "),
        id,
      ]
    );

    res.status(200).json({ message: "Membre mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du membre :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la mise à jour du membre" });
  }
});

// Supprimer un membre
router.delete("/member/:id", adminOnly, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [result] = await pool.execute("DELETE FROM membres WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Membre non trouvé ou déjà supprimé." });
    }
    res.status(200).json({ message: "Membre supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du membre :", error);
    res.status(500).json({ error: "Erreur lors de la suppression du membre." });
  }
});

module.exports = router;
