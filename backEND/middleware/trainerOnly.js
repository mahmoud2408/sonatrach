// backend/middleware/trainerOnly.js
module.exports = function trainerOnly(req, res, next) {
  if (!req.session || req.session.role !== "entraineur") {
    return res
      .status(403)
      .json({ error: "Accès interdit : entraîneur uniquement." });
  }
  next();
};
