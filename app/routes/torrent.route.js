module.exports = app => {
    let TorrentController = require('../controllers/torrent.controller');

    /**
     * GET
     */
    app.get('/api/torrents', TorrentController.getTorrents);
    app.get('/api/torrent', TorrentController.getTorrentInfo);

    /**
     * POST
     */
    app.post('/api/torrent/add', TorrentController.addTorrent);
    app.post('/api/torrent/remove', TorrentController.removeTorrent);
}