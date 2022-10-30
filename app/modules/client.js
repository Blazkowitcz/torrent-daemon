const WebTorrent = require('webtorrent');
const db = require('./database');

var config = require('../../config.json');
var app = null;
var client = null;

function init(application){
    app = application
    client = new WebTorrent(config.client);
    client.on('error', function (err) {
        console.log(err);
    });
    client.on('ready', function(){
        console.log("### Torrent server started ###");
    });
}

function startTorrents(){
    let torrents = db.get('torrents');
    torrents.forEach(torrent => {
        client.add('../../public/torrents/' + torrent.filename); 
    })
}

module.exports = { init, startTorrents }