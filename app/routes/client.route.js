module.exports = app => {
    const client = require('../controllers/client.controller');
    app.post('/add-torrent', client.addTorrent);
    app.get('/torrents', client.getTorrents);
}