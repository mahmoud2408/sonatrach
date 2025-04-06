// backend/routes/adminAdmin.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const adminOnly = require('../middleware/adminOnly');
const bcrypt = require('bcrypt');

// Endpoint pour créer un nouvel administrateur
router.post('/creer-admin', adminOnly, async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, username, password } = req.body;
    
    // Vérifier que tous les champs obligatoires sont fournis
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({ error: "Tous les champs obligatoires ne sont pas renseignés." });
    }
    
    // Vérifier si un utilisateur avec cet email ou cet identifiant existe déjà
    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Un utilisateur avec cet email ou cet identifiant existe déjà." });
    }
    
    // Hacher le mot de passe
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Insérer dans la table users avec role = 'admin'
    // Pour les champs isOver16 et acceptTerms, nous les forçons à 1 (true)
    // acceptNotifications est laissé à 0 par défaut
    const [result] = await pool.execute(
      `INSERT INTO users (firstName, lastName, email, mobile, username, passwordHash, isOver16, acceptTerms, acceptNotifications, role)
       VALUES (?, ?, ?, ?, ?, ?, 1, 1, 0, 'admin')`,
      [firstName, lastName, email, mobile, username, passwordHash]
    );
    
    res.status(201).json({ message: "Nouvel administrateur créé avec succès.", adminId: result.insertId });
  } catch (error) {
    console.error("Erreur lors de la création du nouvel administrateur :", error);
    res.status(500).json({ error: "Erreur interne lors de la création du nouvel administrateur." });
  }
});

module.exports = router;
