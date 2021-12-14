const Sqldb = require('../models/DataBase.js');

// Création de nouveaux com //
exports.newComment = (req, res, next) => {
  Sqldb.query(`INSERT INTO user_groupomania.comment VALUES (?, ?, ?, NOW())`,
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
  Sqldb.query(`SELECT user.id, user.nom, user.prenom, comment.id, comment.content, comment.userId, comment.date FROM user_groupomania.user INNER JOIN user_groupomania.comment ON user.id = comment.userID WHERE comment.postID = ${req.params.id} ORDER BY comment.date DESC`,
  
      (error, result) => {
          if (error) {
              return res.status(400).json({ error });
          }
          return res.status(200).json(result);
      });
};
// Suppression des com //
exports.deleteComment = (req, res, next) => {
  Sqldb.query(`DELETE FROM user_groupomania.comment WHERE comment.id = ?`,[req.params.id] ,
  (error, result, field) => {
      if (error) {
          return res.status(400).json({ error });
      }
      return res.status(200).json(result);
  });
};
