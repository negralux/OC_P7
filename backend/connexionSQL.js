
const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST, // a changer en production par le contenu de .env
    user: process.env.DB_USER, // a changer en production par le contenu de .env
    password: process.env.DB_PASSWORD, // a changer en production par le contenu de .env
    database: process.env.DB_DATABASE, // a changer en production par le contenu de .env
    port: process.env.DB_PORT, // a changer en production par le contenu de .env
    multipleStatements: true
})

mysqlConnection.connect((err) =>{
    if(!err){
        console.log("Connected to SQL DATABASE !")
    }
    else{
        console.log("Connection to SQLDATABASE failed...")
    }
})

module.exports = mysqlConnection;