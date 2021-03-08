const torrent_client = require('../torrent-client');
var Torrent = require('../database/models/torrent.model');
var Peer = require('../database/models/peer.model');
var utils = require('../utils/torrent.utils');
var config = require('../../client_conf.json');
const fs = require('fs-extra');

/**
 * Pause a torrent
 * @param {Request} req 
 * @param {Result} res
 * @returns {Boolean}
 */
exports.pauseTorrent = (req, res) => {
    torrent_client.getClient().torrents.forEach(torrent => {
        if (torrent.infoHash === req.body.hash) {
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
    torrent_client.getClient().torrents.forEach(torrent => {
        if (torrent.infoHash === req.body.hash) {
            torrent.resume();
        }
    });
    res.send(true);
}

/**
 * Get the list of torrents active in client
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Array} Torrent
 */
exports.getTorrents = (req, res) => {
    var results = [];
    torrent_client.getClient().torrents.forEach(torrent => {
        results.push(new Torrent({
            name: torrent.name,
            done: torrent.done,
            progress: torrent.progress * 100,
            size: utils.sizeReadable(torrent.length, false),
            status: status = utils.getStatus(torrent),
            status_color: utils.getStatusColor(status),
            infoHash: torrent.infoHash,
            path: torrent.path,
            download_speed: utils.sizeReadable(torrent.downloadSpeed, true),
            upload_speed: utils.sizeReadable(torrent.uploadSpeed, true),
            downloaded: utils.sizeReadable(torrent.downloaded, false),
            uploaded: utils.sizeReadable(torrent.uploaded, false)
        }));
    });
    res.send(results);
}

/**
 * Get torrent informations
 * @param {Request} req 
 * @param {Result} res 
 * @returns {Array} 
 */
exports.getTorrentInfo = (req, res) => {
    torrent_exist = false;
    torrent_client.getClient().torrents.forEach(torrent => {
        if (torrent.infoHash === req.params.hash) {
            torrent_exist = true;
            res.send(new Torrent({
                name: torrent.name,
                done: torrent.done,
                progress: torrent.progress * 100,
                size: utils.sizeReadable(torrent.length, false),
                status: status = utils.getStatus(torrent),
                infoHash: torrent.infoHash,
                path: torrent.path,
                downloaded: utils.sizeReadable(torrent.downloaded, false),
                uploaded: utils.sizeReadable(torrent.uploaded, false),
                announce: torrent.announce[0],
                ratio: torrent.ratio,
                pieceLength: utils.sizeReadable(torrent.pieceLength, false),
                numberPieces: torrent.pieces.length,
                created: torrent.created,
                createdBy: torrent.createdBy,
                peers: getPeers(torrent.infoHash)
            }))
        }
    })
    if(!torrent_exist){
        res.send(null);
    }
}

/**
 * Get moving informations from torrents active in client
 * @param {Request} req 
 * @param {Result} res
 * @returns {Array} Torrent
 */
exports.getTorrentsShortData = (req, res) => {
    var results = [];
    current_client = torrent_client.getClient();
    current_client.torrents.forEach(torrent => {
        results.push(new Torrent({
            done: torrent.done,
            progress: torrent.progress * 100,
            status: status = utils.getStatus(torrent),
            status_color: utils.getStatusColor(status),
            infoHash: torrent.infoHash,
            download_speed: utils.sizeReadable(torrent.downloadSpeed, true),
            upload_speed: utils.sizeReadable(torrent.uploadSpeed, true),
            downloaded: utils.sizeReadable(torrent.downloaded, false),
            uploaded: utils.sizeReadable(torrent.uploaded, false)
        }));
    });
    res.send(results);
}

/**
 * Add a torrent
 * @param {Request} req 
 * @param {Result} res 
 */
exports.addTorrent = (req, res) => {
    console.log(req);
    var file = req.files.file;
    var filename = new Date().getTime() + '.torrent';
    var path = config.torrent_location + filename;
    current_client = torrent_client.getClient();
    file.mv(path, (err) => {
        if (err) {
            res.send("Error while adding torrent");
        }
        try {
            current_client.add(config.torrent_location + filename, { path: config.torrent_destination }, function (torrent) {
                if(config.torrent.start_paused === true){
                    torrent.pause();
                }
                Torrent.create(torrent.name, torrent.infoHash, torrent.path, filename);
            });
            res.send(true);
        } catch (err) {
            res.send("An error occured");
        }

    });
}

/**
 * Move a torrent to a new location
 * @param {Request} req 
 * @param {Result} res 
 */
exports.moveTorrent = (req, res) => {
    torrent_client.getClient().torrents.forEach(torrent => {
        if (torrent.infoHash === req.body.hash) {
            var old_path = torrent.path;
            var filename = torrent.name;
            destroyTorrent(torrent);
            moveTorrent(old_path, req.body.path, filename);
            editTorrentPathDatabase(req.body.hash, req.body.path);
            restartTorrent(req.body.hash, current_client, req.body.path);
            res.send(true);
        }
    });
}

/**
 * Remove a torrent from client
 * @param {Request} req 
 * @param {Result} res 
 */
exports.deleteTorrent = (req, res) => {
    torrent_client.getClient().torrents.forEach(torrent => {
        if (torrent.infoHash === req.body.hash) {
            torrent.destroy();
            res.send(true);
        }
    })
}

/**
 * Change torrent file location
 * @param {Request} req 
 * @param {Result} res 
 */
exports.changeLocation = (req, res) => {
    torrent_client.getClient().torrents.forEach(torrent => {
        if (torrent.infoHash === req.body.hash) {
            torrent.path = req.body.path;
            Torrent.move(req.body.hash, req.body.path, function (err) {
                if (!err) {
                    torrent.rescanFiles();
                    res.send(true);
                }else{
                    res.send(false);
                }
            })
        }
    })
}

/**
 * Remove the torrent from the client
 * @param {Torrent} torrent 
 */
function destroyTorrent(torrent) {
    torrent.destroy(function (err) {
        if (!err) {
            return Promise.resolve(true);
        }
    })
}

/**
 * Move torrent
 * @param {String} old_path 
 * @param {String} new_path 
 * @param {String} filename 
 */
function moveTorrent(old_path, new_path, filename) {
    fs.move(old_path + filename, new_path + filename, err => {
        if (!err) {
            return Promise.resolve(true);
        }
    })
}

/**
 * Edit the current path in database
 * @param {String} hash 
 * @param {String} path 
 */
function editTorrentPathDatabase(hash, path) {
    Torrent.move(hash, path, function (err) {
        if (!err) {
            return Promise.resolve(true);
        }
    })
}

/**
 * Restart the torrent in the client with the new path
 * @param {String} path 
 * @param {String} filename 
 */
function restartTorrent(hash, current_client, path) {
    Torrent.getOne(hash, function (content) {
        current_client.add(config.torrent_location + content.filename, { path: path }, function (torrent) {
        });
    });
}

/**
 * Return torrent peers list
 * @param {String} hash
 * @returns {Array} results
 */
function getPeers(hash) {
    var results = [];
    torrent_client.getClient().torrents.forEach(torrent => {
        if (torrent.infoHash === hash) {
            torrent.wires.forEach(wire => {
                results.push(new Peer({
                    'address': wire.remoteAddress,
                    'port': wire.remotePort,
                    'uploaded': wire.uploaded,
                    'downloaded': wire.downloaded,
                    'upload_speed': utils.sizeReadable(wire.uploadSpeed(), true),
                    'download_speed': utils.sizeReadable(wire.downloadSpeed(), true),
                }));
            });
        }
    })
    return results;
}