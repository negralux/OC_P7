const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");

//inscription utilisateur
exports.signup = (req, res, next) => {

//protection des inputs
const pseudo = encodeURI(req.body.pseudo);
const email = encodeURI(req.body.email);
const level = encodeURI(req.body.level);


var sqlMetier = 'SELECT metier FROM fonction WHERE id='+level;  //on cherche le metier dans la base de donnée
mysqlConnection.query(sqlMetier, function(err, result1) {
  const metier = result1[0].metier //on recupere le metier de la premiere requete
  if (err) {
    throw err;
  } else { //résultats obtenu, poursuite

    bcrypt.hash(req.body.password, 10, function(err, hash) {
      var sql = "INSERT INTO membre (pseudo, email, password, level, metier,admin) VALUES ('"+pseudo+"','"+email+"','"+hash+"','"+req.body.level+"','"+metier+"',0)";

      mysqlConnection.query(sql, function(err, result2) {
        if (err) {
          throw err;
        } else {
          //res.sendStatus(200); 
          res.status(200).json({ id: result2.insertId});
        }
      });
    });
  }
})
}

//connexion utilisateur
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  var sql = 'SELECT * FROM membre WHERE email = "'+email+'" ';
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
      res.status(401).json({ error: 'Utilisateur non trouvé !' });
    } else {  //utilisateur trouve
      bcrypt.compare(password, result[0].password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        //parametres pour navigation sur le front: userId, userLevel et le token pour verifier les requetes vers le backend apres
        res.status(200).json({userId: result[0].id, userLevel: result[0].level, userPseudo: result[0].pseudo, token: jwt.sign( { userId: result[0].id },process.env.SECRET_CLE_TOKEN,{ expiresIn: '24h' }) }); // mettre "paramètre" .env pour RANDOM_TOKEN_SECRET
      
      })
      .catch(error => res.status(500).json({ error: "<- Erreur 500" }));
    }
  });
}

//afficher profil utilisateur
exports.getOneUser = (req, res, next) => {
  const idUser = encodeURI(req.params.userId);
  var sqlAllFromMembre = 'SELECT * FROM membre WHERE id ='+idUser;   //  -> on cherche tous du membre
  var sqlFonctionFromMembre = 'SELECT metier FROM fonction WHERE id= '+sqlAllFromMembre.level
  mysqlConnection.query(sqlAllFromMembre, function(err, result) {
    if (err) {
      throw err;
    } else { //recuperation infos sur le user requète suivante
      res.status(200).json(result);  
    }
  });

}

//suppression de l'utilisateur et de ses publications
exports.deleteOneUser = (req, res, next) => {
  const idUser = encodeURI(req.params.userId);
     
  var sql = 'DELETE wall, membre FROM membre INNER JOIN wall ON membre.id = wall.userId WHERE membre.id = '+idUser;   //  -> on cherche tous du membre
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      console.log(result)
      res.status(200).json(result);  
    }
  });
}
