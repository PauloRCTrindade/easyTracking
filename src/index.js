require("dotenv").config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

require('./app/controllers/index')(app);

app.listen(36300);
console.log('easy-tracking started');