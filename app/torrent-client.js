const WebTorrent = require('webtorrent');
var client = null;

/**
 * Client Initialization
 */
function init() {
    this.client = new WebTorrent();
    this.client.on('error', function (err) {
        console.log(err);
    });
    console.log("# Client torrent démarré #");
}

/**
 * Return the client
 * @returns client
 */
function getClient() {
    return this.client;
}

module.exports = { init, getClient }