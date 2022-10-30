const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const cors = require('cors');
const config = require('./config.json');
const database = require('./app/utils/database.util')

const app = express();

app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());