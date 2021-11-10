const express = require('express');
var cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

const app = express();

dbConnection();

app.use(cors());

app.use( express.static('public') );

app.use( express.json() );

app.use('/api/auth', require('./routes/auth'));
app.use('/api/publications', require('./routes/publications'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});