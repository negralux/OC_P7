//Importation 
const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');


router.get('/lastSignup/', auth, adminCtrl.getAllLastSignup); //recupere tous les derniers inscrits
router.get('/lastPosts/', auth, adminCtrl.getAllLastPost); //recupere tous les derniers post sur le wall
router.post('/moderation/:id', auth, adminCtrl.getPostToModerate);  // affiche toutes les discussions de l'utilisateur
router.put('/setupSignup/:id', auth, adminCtrl.setupSignup); // validation des derniers inscrits
router.put('/setupPost/:id', auth, adminCtrl.setupPost); // validation des derniers posts
router.delete('/deletePost/:id', auth, adminCtrl.deletePost); // supprimer un post

module.exports = router;