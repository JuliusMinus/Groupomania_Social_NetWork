const db = require('../models/DataBase');

// Afficher tout les paper //
exports.getAllPapers = (req, res, next) => {
    db.query('SELECT p.*, u.nom, u.prenom, u.imgURL FROM groupomania.paper p INNER JOIN groupomania.user u  ON u.id = p.userID ORDER BY date DESC', 
    (error, results) => {
        if (error) {
            return res.status(400).json({ error });
        }
        
        return res.status(200).json(results);
    });
};
// Créer un paper //
exports.newPaper = (req, res, next) => {
   
    const imgUrl = 'file' in req ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    db.query(`INSERT INTO groupomania.paper (content, date, userID, imgPaper) VALUES ( ?, NOW(), ?, ?)`,
    [req.body.content, req.body.userID , imgUrl],
    (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(201).json({
            message: 'Votre paper à été publié !'
        })
    });
};
// Afficher un paper //
exports.getOnePaper = (req, res, next) => {
    db.query('SELECT p.*, u.nom, u.prenom FROM groupomania.paper p inner join groupomania.user u on u.id = p.userID WHERE p.id = ?',
    [req.params.id],
     (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        console.log(result)
        return res.status(200).json(result);
    });
};
// Efacer un paper//
exports.deleteOnePaper = (req, res, next) => {
    db.query('DELETE FROM groupomania.paper WHERE paper.id = ?',
    [req.params.id], 
    (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};
// Modifier le paper utilisateur // 
exports.modifyOnePaper = (req, res, next) => {
    db.query(`UPDATE groupomania.paper SET content = ? WHERE paper.id = ?`,
    [req.body.content] ,
    [req.params.id], 
    (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};
// Afficher les papers d'un utilisateur //
exports.getUserPapers = (req, res, next) => {
    db.query(`SELECT * FROM groupomania.paper WHERE paper.userID = ?`,
    [req.params.id], 
    (error, result) => {
        if (error) {
            return res.status(400).json({ error });
        }
        console.log(result)
        return res.status(200).json(result);
    });
};

