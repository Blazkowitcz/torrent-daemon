const express = require('express');
const fileUpload = require('express-fileupload');
const client_torrent = require('./app/torrent-client');
const conf = require('./client_conf.json')
const bodyParser = require('body-parser');
const app = express();

var client = client_torrent;
app.locals.client = client;
app.locals.public = __dirname + '\\public\\files\\';
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/client.route")(app);
require("./app/routes/torrent.route")(app);

/**
 * App init
 */
app.listen(conf.port, function() {
    client.init(app);
    client.getClient();
})