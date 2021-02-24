const torrent_client = require('../torrent-client');

/**
 * Pause a torrent
 * @param {Request} req 
 * @param {Result} res
 * @returns {Boolean}
 */
exports.pauseTorrent = (req, res) => {
    current_client = torrent_client.getClient();
    current_client.torrents.forEach(torrent => {
        if(torrent.infoHash === req.body.hash){
            torrent.pause();
        }
    });
    res.send(true);
}

/**
 * Resume a torrent
 * @param {Request} req 
 * @param {Result} res
 * @returns {Boolean} 
 */
exports.resumeTorrent = (req, res) => {
    current_client = torrent_client.getClient();
    current_client.torrents.forEach(torrent => {
        if(torrent.infoHash === req.body.hash){
            torrent.resume();
        }
    });
    res.send(true);
}