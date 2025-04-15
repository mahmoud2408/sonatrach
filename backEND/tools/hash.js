const bcrypt = require("bcrypt");

const password = "mahmoud"; // Remplacez par votre mot de passe
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Hashed password:", hash);
  }
});
