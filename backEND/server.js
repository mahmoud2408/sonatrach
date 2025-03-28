// server.js

const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const port = process.env.PORT || 5005;

app.use(
  cors({
    origin: "http://localhost:3000", // Autorise uniquement le frontend à cet URL
    credentials: true, // Pour permettre l'envoi des cookies (sessions)
  })
);
// Middleware pour parser le JSON
app.use(express.json());

// Configuration de la session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // En production, pensez à utiliser HTTPS et cookie.secure: true
  })
);

// Routes d'authentification
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
