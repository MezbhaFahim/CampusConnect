const express = require('express');
const path = require("path");
const dotenv = require('dotenv');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');

dotenv.config({ path: './.env'});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({secret: '112484', resave: true, saveUninitialized: true}));
app.use('/auth', require('./auth'));
const db = require('./db');
db

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
