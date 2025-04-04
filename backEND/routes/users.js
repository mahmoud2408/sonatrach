const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/emails", async (req, res) => {
  try {
    const filter = req.query.filter; // Peut être "members", "non-members" ou "all" (ou non défini)
    let query = "SELECT email FROM users";
    // Selon le filtre, on modifie la requête SQL :
    if (filter === "members") {
      // Récupère uniquement les emails des utilisateurs qui sont membres
      query = `
        SELECT email
        FROM membres
      `;
    } else if (filter === "non-members") {
      // Récupère uniquement les emails des utilisateurs qui ne sont pas membres
      query = `
        SELECT email
        FROM users
        WHERE id NOT IN (SELECT user_id FROM membres)
      `;
    } else if (filter === "notif") {
      // Récupère uniquement les emails des utilisateurs qui sont membres
      query = `
        SELECT email
        FROM users
        WHERE acceptNotifications = 1
      `;
    }

    const [rows] = await pool.execute(query);
    const emails = rows.map((row) => row.email);
    res.status(200).json(emails);
  } catch (error) {
    console.error("Erreur lors de la récupération des emails :", error);
    res
      .status(500)
      .json({ error: "Erreur interne lors de la récupération des emails." });
  }
});

module.exports = router;
