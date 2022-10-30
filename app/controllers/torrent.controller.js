const db = require('../modules/database');
const Torrent = require ('../models/torrent.model');
const parse_torrent = require('parse-torrent');
const crypto = require('crypto')
const fs = require('fs');

/**
 * Return All Torrents
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getTorrents = async (req, res) => {
    let torrents = db.get('torrents').value();
    res.send(torrents);
}

/**
 * Return Torrent informations
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getTorrentInfo = async (req, res) => {
    let torrent = db.get('torrents').find({uuid: req.body.uuid}).value();
    let test = fs.readFileSync('./public/torrents/' + torrent.filename)
    let result = parse_torrent(test);
    torrent.announce = result.announce;
    res.send(torrent);
}

/**
 * Add a new Torrent
 * @param {Request} req 
 * @param {Response} res 
 */
exports.addTorrent = async (req, res) => {
    let file = parse_torrent(req.files.file.data)
    let filename = crypto.randomBytes(16).toString('hex') + '.torrent';
    let torrent = new Torrent();
    torrent.setName(file.name);
    torrent.setFileName(filename);
    db.get('torrents').push(torrent).write();
    req.files.file.mv('./public/torrents/' + filename);
    res.send(true); 
}

/**
 * Remove a Torrent
 * @param {Request} req 
 * @param {Response} res 
 */
exports.removeTorrent = async (req, res) => {

}