function adminOnly(req, res, next) {
    if (req.session.userId && req.session.role === 'admin') {
      return next();
    }
    return res.status(403).json({ error: "Accès refusé : administrateur uniquement." });
  }
  
  module.exports = adminOnly;
  