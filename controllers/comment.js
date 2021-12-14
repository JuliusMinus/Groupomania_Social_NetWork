const db = require('../models/DataBase.js');

// Création de nouveaux com //
exports.newComment = (req, res, next) => {
  db.query(`INSERT INTO groupomania.comment VALUES (?, ?, ?, NOW())`,
  [req.body.userId, req.params.id, req.body.content],
   (error, result, field) => {
      if (error) {
          return res.status(400).json({ error });
      }
      return res.status(200).json(result);
  });
};

// Affichage des com//
exports.getAllComments = (req, res, next) => {
  db.query(`SELECT user.id, user.nom, user.prenom, comment.id, comment.content, comment.userId, comment.date FROM groupomania.user INNER JOIN groupomania.comment ON user.id = comment.userID WHERE comment.postID = ${req.params.id} ORDER BY comment.date DESC`,
  
      (error, result) => {
          if (error) {
              return res.status(400).json({ error });
          }
          return res.status(200).json(result);
      });
};
// Suppression des com //
exports.deleteComment = (req, res, next) => {
  db.query(`DELETE FROM groupomania.comment WHERE comment.id = ?`,[req.params.id] ,
  (error, result, field) => {
      if (error) {
          return res.status(400).json({ error });
      }
      return res.status(200).json(result);
  });
};
