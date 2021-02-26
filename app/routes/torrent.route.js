module.exports = app => {
    const torrent = require('../controllers/torrent.controller');

    /**
     * ROUTE POST
     */
    app.post('/pause-torrent', torrent.pauseTorrent);
    app.post('/resume-torrent', torrent.resumeTorrent);
    app.post('/add-torrent', torrent.addTorrent);

    /**
     * ROUTE GET
     */
    app.get('/torrents', torrent.getTorrents);
    app.get('/torrents-short', torrent.getTorrentsShortData);
}