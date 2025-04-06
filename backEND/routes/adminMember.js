// backend/routes/adminMember.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const adminOnly = require("../middleware/adminOnly");

// Endpoint pour récupérer la liste des membres depuis la table "membres"
router.get("/members", adminOnly, async (req, res) => {
  try {
    const [members] = await pool.execute(
      "SELECT id, user_id, nom, email, categorie, date_inscription, abonnement_expire FROM membres"
    );
    console.log("Membres dans la table :", members);
    res.status(200).json(members);
  } catch (error) {
    console.error("Erreur lors de la récupération des membres :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des membres" });
  }
});

// Endpoint pour modifier un membre dans la table "membres"
// Ici, on suppose que seuls le nom, l'email et la catégorie sont modifiables.
router.put("/member/:id", adminOnly, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { nom, email, categorie } = req.body;
    await pool.execute(
      "UPDATE membres SET nom = ?, email = ?, categorie = ? WHERE id = ?",
      [nom, email, categorie, id]
    );
    res.status(200).json({ message: "Membre mis à jour" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du membre :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du membre" });
  }
});

// Endpoint pour supprimer un membre de la table "membres"
router.delete("/member/:id", adminOnly, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    console.log("Tentative de suppression pour l'id :", id);
    const [result] = await pool.execute("DELETE FROM membres WHERE id = ?", [
      id,
    ]);
    console.log("Résultat de la suppression :", result);
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
