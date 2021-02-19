const express = require('express');
const client_torrent = require('./app/torrent-client');
const conf = require('./client_conf.json')
const app = express();

/**
 * App init
 */
app.listen(conf.port, function() {
    client_torrent.init();
})