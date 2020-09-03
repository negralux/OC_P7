//Imports
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");



exports.getAllTheWall = (req, res, next) => {
  var sql = 'SELECT * FROM wall ORDER BY id DESC';   //  -> mettre en fonction de l'utilisateur loguer
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      ///res.sendStatus(200); 
      res.status(200).json(result);  
    }
  });
};

exports.newPost = (req, res, next) => {
  // déclaration constantes
  const title =   encodeURI(req.body.title);
  const content = encodeURI(req.body.content);
  const userId = req.body.userId;
  const imageUrl = req.body.imageUrl;

  var sqlPseudo = 'SELECT pseudo FROM membre WHERE id='+userId;  //recherche métier dans BDD
  mysqlConnection.query(sqlPseudo, function(err, result1) {
    const pseudo = result1[0].pseudo //récuperation metier
    if (err) {
      throw err;
    } else { //j'ai le resultat je peux poursuivreok, poursuite
            var insertPost = "INSERT INTO wall (userId, userPseudo, title, content, urlImage, admin) VALUES ('"+userId+"','"+pseudo+"','"+title+"','"+content+"','"+imageUrl+"',0)";

            mysqlConnection.query(insertPost, function(err, result) {
              if (err) {
                throw err;
              } else {
                //res.sendStatus(200); 
                res.status(200).json({id: result.insertId});
              }
            });
          }
        })
};