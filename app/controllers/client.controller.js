var Torrent = require('../database/models/torrent.model');
var utils = require('../utils/torrent.utils');
var config = require('../../client_conf.json');
const torrent_client = require('../torrent-client');

/**
 * Add a torrent
 * @param {Request} req 
 * @param {Result} res 
 */
exports.addTorrent = (req, res) => {
    var file = req.files.file;
    var filename = new Date().getTime() + '.torrent';
    var path = __dirname + '\\..\\..\\public\\files\\' + filename;
    current_client = torrent_client.getClient();
    file.mv(path, (err) => {
        if (err) {
            res.send("Error while adding torrent");
        }
        try {
            current_client.add(req.app.locals.public + filename, { path: config.torrent_destination }, function (torrent) {
                Torrent.create(torrent.name, torrent.infoHash, torrent.path, filename);
            });
            res.send(true);
        } catch (err) {
            res.send("An error occured");
        }

    });
}

/**
 * Get the list of torrents active in the client
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Array} Torrent
 */
exports.getTorrents = (req, res) => {
    var results = [];
    current_client = torrent_client.getClient();
    current_client.torrents.forEach(torrent => {
        console.log(torrent);
        results.push(new Torrent({ name: torrent.name, done: torrent.done, status: utils.getStatus(torrent), infoHash: torrent.infoHash, path: torrent.path, download_speed: torrent.downloadSpeed, upload_speed: torrent.uploadSpeed, downloaded: torrent.downloaded, uploaded: torrent.uploaded }));
    });
    res.send(results);
}