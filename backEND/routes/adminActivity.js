// routes/adminActivity.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const adminOnly = require("../middleware/adminOnly");

/**
 * GET /api/admin/trainers
 * Récupère tous les utilisateurs ayant le rôle "entraineur"
 */
router.get("/trainers", adminOnly, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, firstName, lastName FROM users WHERE role = 'entraineur'"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des entraîneurs :", error);
    res.status(500).json({
      error: "Erreur interne lors de la récupération des entraîneurs.",
    });
  }
});

/**
 * POST /api/admin/activity
 * Crée une nouvelle activité en lui assignant un entraîneur.
 * Body attendu : { title, date, hour, description, trainerId }
 */
router.post("/activity", adminOnly, async (req, res) => {
  try {
    const { title, date, hour, description, trainerId } = req.body;

    // Validation minimale
    if (!title || !date || !hour || !description || !trainerId) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont requis, y compris trainerId." });
    }

    // Vérifier que l'entraîneur existe et a le bon rôle
    const [trainers] = await pool.execute(
      "SELECT id FROM users WHERE id = ? AND role = 'entraineur'",
      [trainerId]
    );
    if (trainers.length === 0) {
      return res
        .status(400)
        .json({ error: "Trainer non trouvé ou rôle invalide." });
    }

    // Insérer l'activité avec son trainer_id
    const [result] = await pool.execute(
      `INSERT INTO activities
        (title, date, hour, description, trainer_id)
       VALUES (?, ?, ?, ?, ?)`,
      [title, date, hour, description, trainerId]
    );

    res
      .status(201)
      .json({ message: "Activité ajoutée", activityId: result.insertId });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'activité :", error);
    res
      .status(500)
      .json({ error: "Erreur interne lors de l'ajout de l'activité." });
  }
});

/**
 * PUT /api/admin/activity/:id
 * Modifie une activité, y compris la possibilité de changer l'entraîneur.
 * Body attendu : { title, date, hour, description, trainerId }
 */
router.put("/activity/:id", adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, hour, description, trainerId } = req.body;

    // Validation minimale
    if (!title || !date || !hour || !description || !trainerId) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont requis, y compris trainerId." });
    }

    // Vérifier que l'entraîneur existe et a le bon rôle
    const [trainers] = await pool.execute(
      "SELECT id FROM users WHERE id = ? AND role = 'entraineur'",
      [trainerId]
    );
    if (trainers.length === 0) {
      return res
        .status(400)
        .json({ error: "Trainer non trouvé ou rôle invalide." });
    }

    // Mettre à jour l'activité
    await pool.execute(
      `UPDATE activities
       SET title = ?, date = ?, hour = ?, description = ?, trainer_id = ?
       WHERE id = ?`,
      [title, date, hour, description, trainerId, id]
    );

    res.status(200).json({ message: "Activité modifiée" });
  } catch (error) {
    console.error("Erreur lors de la modification de l'activité :", error);
    res
      .status(500)
      .json({ error: "Erreur interne lors de la modification de l'activité." });
  }
});

/**
 * DELETE /api/admin/activity/:id
 * Supprime une activité
 */
router.delete("/activity/:id", adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute("DELETE FROM activities WHERE id = ?", [id]);
    res.status(200).json({ message: "Activité supprimée" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'activité :", error);
    res
      .status(500)
      .json({ error: "Erreur interne lors de la suppression de l'activité." });
  }
});
// Ajoutez cette route si elle n'existe pas déjà
// Dans adminActivity.js (backend)
// Dans adminActivity.js
router.get("/activities", async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        activities.*,
        CONCAT(users.firstName, ' ', users.lastName) AS trainer_name
      FROM activities
      LEFT JOIN users ON activities.trainer_id = users.id
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur fetch activities:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
module.exports = router;
