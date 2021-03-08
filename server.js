const express = require('express');
const fileUpload = require('express-fileupload');
const client_torrent = require('./app/torrent-client');
const conf = require('./client_conf.json')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
var logs = require('./app/utils/logs.utils');

var client = client_torrent;
app.locals.client = client;
app.locals.public = __dirname + '\\public\\files\\';
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require("./app/routes/torrent.route")(app);

/**
 * App init
 */
app.listen(conf.port, function() {
    client.init(app);
    client.getClient();
})