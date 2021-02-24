const WebTorrent = require('webtorrent');
const Torrent = require('./database/models/torrent.model');
var config = require('../client_conf.json');

var client = null;
var app = null;

/**
 * Client Initialization
 * @param {*} application
 * @returns null
 */
function init(application) {
    app = application;
    client = new WebTorrent();
    client.on('error', function (err) {
        console.log(err);
    });
    console.log("# Client torrent démarré #");
    startTorrents();
}

/**
 * Return the client
 * @returns client
 */
function getClient() {
    return client;
}

/**
 * Start all torrents saved in database
 * @returns null
 */
function startTorrents() {
    Torrent.getAll(function(err, data) {
        if(err){
            return null;
        }
        data.forEach(torrent => {
            client.add(app.locals.public + torrent.filename, { path: config.torrent_destination }, function (torrent) {
            });
        });
    });
}

module.exports = { init, getClient }