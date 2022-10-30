const db = require('../modules/database')
const Torrent = require ('../models/torrent.model')
/**
 * Return All Torrents
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getTorrents = async (req, res) => {
    let torrents = db.get('torrents').value()
    res.send(torrents);
}

/**
 * Return Torrent informations
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getTorrentInfo = async (req, res) => {
    let torrent = new Torrent();
    res.send(torrent);
}

/**
 * Add a new Torrent
 * @param {Request} req 
 * @param {Response} res 
 */
exports.addTorrent = async (req, res) => {
    db.get('torrents').push({name: "TUTU", filename: "TITI"}).write();
    res.send(true); 
}

/**
 * Remove a Torrent
 * @param {Request} req 
 * @param {Response} res 
 */
exports.removeTorrent = async (req, res) => {

}