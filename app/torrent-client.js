const WebTorrent = require('webtorrent');
const Torrent = require('./database/models/torrent.model');
var config = require('../client_conf.json');
var utils = require('../app/utils/torrent.utils');
var emo = require('node-emoji');
var logs = require('./utils/logs.utils');

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
        logs.warning(err.message);
    });
    logs.success("Client torrent démarré")
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
    Torrent.getAll(function (err, data) {
        if (err) {
            return null;
        }
        data.forEach(torrent => {
            client.add(config.torrent_location + torrent.filename, { path: torrent.location }, function (torrent) {
            });
        });
    });
}

function getTorrentByHash(hash) {
    client.torrents.forEach(torrent => {
        if (torrent.infoHash === hash) {
            return torrent;
        }
    })
}

module.exports = { init, getClient, getTorrentByHash }