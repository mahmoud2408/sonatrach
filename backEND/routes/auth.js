const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Route pour l'inscription (le rôle est forcé à "user")
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

    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({
        error: "Un utilisateur avec cet email ou cet identifiant existe déjà.",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

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
        "user",
      ]
    );

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
    const [users] = await pool.execute(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [login, login]
    );
    if (users.length === 0) {
      return res.status(400).json({ error: "Utilisateur non trouvé." });
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Mot de passe incorrect." });
    }

    req.session.userId = user.id;
    req.session.role = user.role; // On stocke le rôle

    if (rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      req.session.cookie.expires = false;
    }

    res.status(200).json({
      message: "Connexion réussie.",
      userId: user.id,
      role: user.role,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res
      .status(500)
      .json({ error: "Erreur interne du serveur lors de la connexion." });
  }
});

// Route pour la déconnexion
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erreur lors de la déconnexion:", err);
      return res.status(500).json({ error: "Erreur lors de la déconnexion." });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Déconnexion réussie." });
  });
});

// Route pour demander une réinitialisation de mot de passe
router.post("/request-reset", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email requis." });
    }
    const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      return res.status(400).json({ error: "Utilisateur non trouvé." });
    }
    const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
    await pool.execute(
      `INSERT INTO password_resets (email, code, expiration)
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))
       ON DUPLICATE KEY UPDATE code = VALUES(code), expiration = VALUES(expiration)`,
      [email, resetCode]
    );
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mahhmoud004@gmail.com",
        pass: "hqof fvsl lslk xxoa",
      },
    });
    const mailOptions = {
      from: "mahhmoud004@gmail.com",
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      text: `Votre code de réinitialisation est : ${resetCode}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Code envoyé par email." });
  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation :", error);
    res.status(500).json({
      error:
        "Erreur interne du serveur lors de la demande de réinitialisation.",
    });
  }
});

// Route pour réinitialiser le mot de passe
router.post("/reset-password", async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }
    const [rows] = await pool.execute(
      "SELECT * FROM password_resets WHERE email = ? AND code = ? AND expiration > NOW()",
      [email, code]
    );
    if (rows.length === 0) {
      return res.status(400).json({ error: "Code invalide ou expiré." });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    await pool.execute("UPDATE users SET passwordHash = ? WHERE email = ?", [
      passwordHash,
      email,
    ]);
    await pool.execute("DELETE FROM password_resets WHERE email = ?", [email]);
    res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation du mot de passe :",
      error
    );
    res.status(500).json({
      error:
        "Erreur interne du serveur lors de la réinitialisation du mot de passe.",
    });
  }
});

// Dans routes/auth.js

// Endpoint pour vérifier la session de l'utilisateur
router.get("/me", async (req, res) => {
  try {
    if (req.session && req.session.userId) {
      // Vous pouvez également renvoyer d'autres informations de l'utilisateur en effectuant une requête SQL
      return res.status(200).json({ userId: req.session.userId });
    }
    return res.status(200).json({}); // Pas connecté
  } catch (error) {
    console.error("Erreur lors de la vérification de la session:", error);
    res
      .status(500)
      .json({ error: "Erreur interne lors de la vérification de la session." });
  }
});

// Dans routes/auth.js

// Endpoint pour vérifier la session de l'utilisateur
router.get("/me", async (req, res) => {
  try {
    if (req.session && req.session.userId) {
      // Vous pouvez également renvoyer d'autres informations de l'utilisateur en effectuant une requête SQL
      return res.status(200).json({ userId: req.session.userId });
    }
    return res.status(200).json({}); // Pas connecté
  } catch (error) {
    console.error("Erreur lors de la vérification de la session:", error);
    res
      .status(500)
      .json({ error: "Erreur interne lors de la vérification de la session." });
  }
});

module.exports = router;
