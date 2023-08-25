const mongoose = require('mongoose');

const dbUrl = "mongodb+srv://toygb55:passer1234@cluster0.zlvx9on.mongodb.net/?retryWrites=true&w=majority";

const ConnectMongoDB = mongoose
    .connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((cnx) =>{
        console.log(`Database connected : ${cnx.connection.host}`);
    })
    .catch((error)=>{
        console.log(`Database connection error : ${error}`);
    });

module.exports = ConnectMongoDB;
