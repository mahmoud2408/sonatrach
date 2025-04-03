// backend/server.js
const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5005;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const authRoutes = require("./routes/auth");
const adminActivityRoutes = require("./routes/adminActivity");
const adminMemberRoutes = require("./routes/adminMember");
const publicActivityRoutes = require("./routes/publicActivity");
const memberSubscriptionRoutes = require("./routes/memberSubscription");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminActivityRoutes);
app.use("/api/admin", adminMemberRoutes);
app.use("/api/activities", publicActivityRoutes);
app.use("/api/members", memberSubscriptionRoutes);  // Ici se trouvent l'inscription et la récupération des membres

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
