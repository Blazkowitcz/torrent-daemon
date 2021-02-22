var Torrent = require('../database/models/torrent.model');
var config = require('../../client_conf.json');

const db = require('../database/');

/**
 * Add a torrent
 * @param {Request} req 
 * @param {Result} res 
 */
exports.addTorrent = (req, res) => {
    var file = req.files.file;
    var filename = new Date().getTime() + '.torrent';
    var path = __dirname + '\\..\\..\\public\\files\\' + filename;
    file.mv(path, (err) => {
        if (err) {
            res.send("Error while adding torrent");
        }
        try {
            client = req.app.locals.client.client
            client.add(req.app.locals.public + filename, { path: config.torrent_destination }, function (torrent) {
                Torrent.create(torrent.name, torrent.infoHash, torrent.path, filename);
            });
            res.send(true);
        } catch (err) {
            res.send("An error occured");
        }

    });
}

/**
 * Get the torrents list
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Array} Torrent
 */
exports.getTorrents = (req, res) => {
    var client = req.app.locals.client.client;
    var results = [];
    client.torrents.forEach(torrent => {
        results.push(new Torrent({ name: torrent.name, done: torrent.done, infoHash: torrent.infoHash, path: torrent.path }));
    });
    res.send(results);
}