// backend/routes/trainers.js
const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const router = express.Router();

// POST /api/admin/trainers -> créer un user avec role 'entraineur'
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      username,
      password,
      isOver16,
      acceptTerms,
      acceptNotifications,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !isOver16 ||
      !acceptTerms
    ) {
      return res
        .status(400)
        .json({
          error: "Tous les champs obligatoires ne sont pas renseignés.",
        });
    }
    // vérification unicité
    const [exists] = await pool.execute(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (exists.length) {
      return res
        .status(400)
        .json({ error: "Email ou identifiant déjà utilisé." });
    }
    // hash du mot de passe
    const passwordHash = await bcrypt.hash(password, 10);
    // insertion
    const [result] = await pool.execute(
      `INSERT INTO users (firstName, lastName, email, mobile, username, passwordHash, isOver16, acceptTerms, acceptNotifications, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        email,
        mobile,
        username,
        passwordHash,
        isOver16,
        acceptTerms,
        acceptNotifications,
        "entraineur",
      ]
    );
    res
      .status(201)
      .json({
        message: "Entraîneur créé avec succès.",
        trainerId: result.insertId,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur interne lors de la création de l'entraîneur." });
  }
});

module.exports = router;
