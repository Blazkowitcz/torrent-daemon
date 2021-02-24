module.exports = app => {
    const torrent = require('../controllers/torrent.controller');
    app.post('/pause-torrent', torrent.pauseTorrent);
    app.post('/resume-torrent', torrent.resumeTorrent);
}