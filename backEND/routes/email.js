// routes/email.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mahhmoud004@gmail.com",
    pass: "hqof fvsl lslk xxoa",
  },
});

router.post("/send", async (req, res) => {
  const { subject, message, recipients } = req.body;
  if (!subject || !message || !recipients || recipients.length === 0) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }
  const mailOptions = {
    from: "mahhmoud004@gmail.com",
    to: recipients.join(","),
    subject,
    text: message,
  };
  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'envoi d'email :", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de l'envoi de l'email." });
    }
    res.status(200).json({ message: "Email envoyé avec succès." });
  });
});

module.exports = router;
