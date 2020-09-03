//Philippe ABEILHOU OpenClassrooms P7 GROUPOMANIA AOUT 2020
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");
const axios = require('axios');


exports.getPostToModerate = (req, res, next) => {
  const id = encodeURI(req.params.id);

  var sql = 'SELECT * FROM wall WHERE id= "'+id+'" ';
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      const content = result[0].content //on recupere le content du post a moderer
      const moderationText = encodeURI(req.body.moderation);

      const newContentModerer = content +'<br/><h6>[MODERATION: '+moderationText+' ]</h6>'; // nouveau content avec le texte de moderation
          /// mise à jour du post
          var sqlUdatePost = 'UPDATE wall SET content = "'+newContentModerer+'" WHERE id= "'+id+'" ';   //  
          mysqlConnection.query(sqlUdatePost, function(err, result) {
            if (err) {
              throw err;
            } else {
              console.log("Ok content mis à jour");
              res.status(200).json(result);  
            }
          });
    }
  });
};

exports.getAllLastSignup = (req, res, next) => {
  var sql = 'SELECT * FROM membre WHERE admin= 0 ';     
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);  
    }
  });
};

exports.getAllLastPost = (req, res, next) => {
  var sql = 'SELECT * FROM wall WHERE admin= 0 ';     
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);  
    }
  });
};

//marque comme nouvel utilisateur
exports.setupSignup = (req, res, next) => {
  const id = req.params.id;
  var sql = 'UPDATE membre SET admin = 1 WHERE id= "'+id+'" ';   //  
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);  
    }
  });
};

//marque comme vu nouveau post
exports.setupPost = (req, res, next) => {
  const id = req.params.id;
  var sql = 'UPDATE wall SET admin = 1 WHERE id= "'+id+'" ';   //  
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);  
    }
  });
};

//supprimer un post avant validation
exports.deletePost = (req, res, next) => {
  const id = req.params.id;
  var sql = 'DELETE FROM wall WHERE id= "'+id+'" ';   //  
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);  
    }
  });
}; 