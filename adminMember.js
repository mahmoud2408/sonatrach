// backend/routes/adminMember.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const adminOnly = require("../middleware/adminOnly");
const bcrypt = require("bcrypt");

// Endpoint pour modifier un membre
// On met à jour les champs firstName, lastName, email et mobile pour l'utilisateur dont l'id est passé en paramètre.
router.put("/member/:id", adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, mobile } = req.body;
    const [result] = await pool.execute(
      "UPDATE users SET firstName = ?, lastName = ?, email = ?, mobile = ? WHERE id = ?",
      [firstName, lastName, email, mobile, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Membre non trouvé" });
    }
    res.status(200).json({ message: "Membre modifié avec succès" });
  } catch (error) {
    console.error("Erreur lors de la modification du membre :", error);
    res.status(500).json({ error: "Erreur lors de la modification du membre" });
  }
});

// Endpoint pour supprimer un membre
router.delete("/member/:id", adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Membre non trouvé ou déjà supprimé" });
    }
    res.status(200).json({ message: "Membre supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du membre :", error);
    res.status(500).json({ error: "Erreur lors de la suppression du membre" });
  }
});

module.exports = router;
