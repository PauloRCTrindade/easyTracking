require("dotenv").config();

const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

require('./app/controllers/index')(app);

app.listen(36300);
console.log("servidor ok")