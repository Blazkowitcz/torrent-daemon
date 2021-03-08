module.exports = app => {
    const torrent = require('../controllers/torrent.controller');

    /**
     * ROUTE POST
     */
    app.post('/pause-torrent', torrent.pauseTorrent);
    app.post('/resume-torrent', torrent.resumeTorrent);
    app.post('/add-torrent', torrent.addTorrent);
    app.post('/torrent-move', torrent.moveTorrent);
    app.post('/torrent-change-location', torrent.changeLocation);

    /**
     * ROUTE GET
     */
    app.get('/torrents', torrent.getTorrents);
    app.get('/torrents/:hash', torrent.getTorrentInfo);
    app.get('/torrents-short', torrent.getTorrentsShortData);
}