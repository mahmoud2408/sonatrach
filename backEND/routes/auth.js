// routes/auth.js

const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");

// Route pour l'inscription
router.post("/profil", async (req, res) => {
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

    // Vérifier les champs obligatoires
    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !isOver16 ||
      !acceptTerms
    ) {
      return res.status(400).json({
        error: "Tous les champs obligatoires ne sont pas renseignés.",
      });
    }

    // Vérifier si l'utilisateur existe déjà (email ou username)
    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({
        error: "Un utilisateur avec cet email ou cet identifiant existe déjà.",
      });
    }

    // Hasher le mot de passe
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insérer l'utilisateur dans la base de données
    const [result] = await pool.execute(
      `INSERT INTO users (firstName, lastName, email, mobile, username, passwordHash, isOver16, acceptTerms, acceptNotifications)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      ]
    );

    // Initialiser la session

    res
      .status(201)
      .json({ message: "Profil créé avec succès.", userId: result.insertId });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res
      .status(500)
      .json({ error: "Erreur interne du serveur lors de l'inscription." });
  }
});

// Route pour la connexion
router.post("/login", async (req, res) => {
  try {
    const { login, password, rememberMe } = req.body;

    // Rechercher l'utilisateur par email ou username
    const [users] = await pool.execute(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [login, login]
    );
    if (users.length === 0) {
      return res.status(400).json({ error: "Utilisateur non trouvé." });
    }
    const user = users[0];

    // Comparer les mots de passe
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Mot de passe incorrect." });
    }

    // Initialiser la session
    req.session.userId = user.id;

    // Gérer l'option "remember me"
    if (rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 jours
    } else {
      req.session.cookie.expires = false;
    }

    res.status(200).json({ message: "Connexion réussie.", userId: user.id });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res
      .status(500)
      .json({ error: "Erreur interne du serveur lors de la connexion." });
  }
});

module.exports = router;
