const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/DataBase.js");
require("dotenv").config();

//Inscription
exports.register = (req, res, next) => {
  db.query(
    `SELECT * FROM groupomania.users WHERE email = ?`,
    [req.body.email],
    (err, results) => {
      //Verification mail//
      if (results.length > 0) {
        res.status(403).json({
          message: "Email existe déjà.",
        });
        //Si l'email est disponible
      } else {
        //Crypt password//

        bcrypt
          .hash(req.body.password, 10)
          .then((cryptedPassword) => {
            //Add to BDD +injection sql
            db.query(
              `INSERT INTO groupomania.users (username,  email, password, createdAt ) VALUES (?, ?, ?, NOW())`,
              [req.body.username, req.body.email, cryptedPassword],
              (err, fields) => {
                if (err) {
                  return res.status(400).json(err);
                }

                return res.status(201).json({
                  message: "Votre compte a bien été crée !",
                });
              }
            );
          })
          .catch((error) => res.status(500).json({ error }));
      }
    }
  );
};

exports.login = (req, res, next) => {
  //Search users in BDD + injection sql
  db.query(
    "SELECT * FROM groupomania.users WHERE email=?",
    [req.body.email],
    (err, results) => {
      console.log(req.body, results);
      //if users find//
      if (results) {
        //Password verification//
        bcrypt.compare(req.body.password, results[0].password).then((valid) => {
          //if not valid//
          if (!valid) {
            res.status(401).json({ message: "Mot de passe incorrect" });
            //if valid, token create//
          } else {
            res.status(200).json({
              userId: results[0].id,
              email: results[0].email,
              username: results[0].username,
              token: jwt.sign(
                { userId: results[0].id },
                "RANDOM_TOKEN_SECRET",
                {
                  expiresIn: "8h",
                }
              ),
            });
          }
        });
      } else {
        res.status(404).json({ message: "Utilisateur inconnu" });
      }
    }
  );
};

exports.getUserProfile = (req, res, next) => {
  console.log("getUserProfile", req.params.id);

  //injection sql

  db.query(
    "SELECT * FROM groupomania.users WHERE id=?",
    [req.params.id],
    (error, result, rows) => {
      console.log("error", error);
      console.log("result", result);
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json(result);
    }
  );
};

exports.deleteUserProfile = (req, res, next) => {
  //commande mysql
  console.log("Delete", req);

  //injection sql

  db.query(
    "DELETE FROM groupomania.users WHERE id=?",
    [req.params.id],
    (error, result) => {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json(result);
    }
  );
};
