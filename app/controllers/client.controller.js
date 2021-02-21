var Torrent = require('../models/torrent.model');

/**
 * Add a torrent
 * @param {Request} req 
 * @param {Result} res 
 */
exports.addTorrent = (req, res) => {
    var file = req.files.file;
    var path = __dirname + '\\..\\..\\public\\files\\' + file.name;
    file.mv(path, (err) => {
        if(err){
            res.send("Erreur lors de l'ajout du torrent");
        }
        client = req.app.locals.client
        client.addTorrent(req, file.name);
        res.send(true);
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
    var torrents = client.torrents;
    var results = [];
    torrents.forEach(torrent => {
        var new_torrent = new Torrent({name : torrent.name, done: torrent.done });
        results.push(new_torrent);
    });
    res.send(results);
}