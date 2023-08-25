const express = require('express');
const connection = require('./connectdb');
const router = require('./routes')

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));
app.use(express.static('public'));

app.use(router);

app.listen(3001, ()=>{
    console.log('Server is running and listening on port 3001');
});


