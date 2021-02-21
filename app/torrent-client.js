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

/**
 * Add a torrent
 * @param {Request} req 
 * @param {Result} name 
 */
function addTorrent(req, name) {
    this.client.add(req.app.locals.public + name, { path: 'C:\\Users\\Blazkowicz\\Projects' }, function (torrent) {
        torrent.on('done', function () {
            console.log("torrent done");
        })
    })
}

module.exports = { init, getClient, addTorrent }