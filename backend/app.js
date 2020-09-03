//Importation
const express = require('express');
const bodyParser = require('body-parser');
//variable d'environnement (notgit)
require('dotenv').config();


// importation routes
const userRoutes = require('./routes/user');
const wallRoutes = require('./routes/wall');
const adminRoutes = require('./routes/admin');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/user', userRoutes); // chemins utilisateur
app.use('/api/wall',  wallRoutes); // chemin du wall Groupomania
app.use('/api/admin', adminRoutes); //chemin de la gestion Admin
 
// VERSION2
//app.use('/api/discussions', discRoutes); // chemins des discussions
module.exports = app;