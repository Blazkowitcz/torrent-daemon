const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const cors = require('cors');
const config = require('./config.json');
const database = require('./app/modules/database')
const client = require('./app/modules/client')

const app = express();

app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

require('./app/routes/torrent.route')(app);

app.listen(config.port, () => {
    console.log("### Local Server Started on port : " + config.port + " ###")
    client.init();
})