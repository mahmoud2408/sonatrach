// routes/auth.js

const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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

router.post("/request-reset", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email requis." });
    }

    // Vérifier que l'email correspond à un utilisateur existant
    const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      return res.status(400).json({ error: "Utilisateur non trouvé." });
    }

    // Générer un code aléatoire à 4 chiffres
    const resetCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Enregistrer le code et éventuellement une date d'expiration dans la base ou dans un cache associé (ex: Redis)
    // Ici, pour simplifier, on peut l'enregistrer dans une table 'password_resets'
    // Vous devrez créer cette table avec des colonnes email, code, expiration (exemple : expiration TIMESTAMP)

    // Exemple d'insertion (à adapter selon votre structure)
    await pool.execute(
      `INSERT INTO password_resets (email, code, expiration)
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))
       ON DUPLICATE KEY UPDATE code = VALUES(code), expiration = VALUES(expiration)`,
      [email, resetCode]
    );

    // Envoyer le code par email (en utilisant nodemailer par exemple)
    const transporter = nodemailer.createTransport({
      // Configurez votre service d'envoi (ex: Gmail, SMTP, etc.)
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

// Dans routes/auth.js

router.post("/reset-password", async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Récupérer le code enregistré pour cet email
    const [rows] = await pool.execute(
      "SELECT * FROM password_resets WHERE email = ? AND code = ? AND expiration > NOW()",
      [email, code]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Code invalide ou expiré." });
    }

    // Hacher le nouveau mot de passe
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Mettre à jour le mot de passe de l'utilisateur
    await pool.execute("UPDATE users SET passwordHash = ? WHERE email = ?", [
      passwordHash,
      email,
    ]);

    // Optionnel : Supprimer la demande de réinitialisation
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

module.exports = router;
