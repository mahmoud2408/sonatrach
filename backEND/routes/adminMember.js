const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const adminOnly = require("../middleware/adminOnly");
const bcrypt = require("bcrypt");

router.post("/member", adminOnly, async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, username, password } = req.body;
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({ error: "Tous les champs obligatoires ne sont pas renseignés." });
    }
    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Un utilisateur avec cet email ou cet identifiant existe déjà." });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      `INSERT INTO users (firstName, lastName, email, mobile, username, passwordHash, isOver16, acceptTerms, acceptNotifications, role)
       VALUES (?, ?, ?, ?, ?, ?, 1, 1, 0, 'user')`,
      [firstName, lastName, email, mobile, username, passwordHash]
    );
    res.status(201).json({ message: "Membre ajouté", memberId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'ajout du membre" });
  }
});

router.put("/member/:id", adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, mobile, username } = req.body;
    await pool.execute(
      "UPDATE users SET firstName = ?, lastName = ?, email = ?, mobile = ?, username = ? WHERE id = ?",
      [firstName, lastName, email, mobile, username, id]
    );
    res.status(200).json({ message: "Membre modifié" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la modification du membre" });
  }
});

router.delete("/member/:id", adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).json({ message: "Membre supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression du membre" });
  }
});

router.put("/member/:id/renew", async (req, res) => {
  try {
    const { id } = req.params;
    // Mettez à jour la date d'abonnement ; assurez-vous que la colonne subscription_date existe
    await pool.execute("UPDATE users SET subscription_date = NOW() WHERE id = ?", [id]);
    res.status(200).json({ message: "Abonnement renouvelé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors du renouvellement de l'abonnement" });
  }
});

module.exports = router;
