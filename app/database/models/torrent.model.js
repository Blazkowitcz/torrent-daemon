/**
 * Constructor
 * @param {JSON} datas 
 */
function Torrent(datas) {
    for (var key in datas) {
        this[key] = datas[key];
    }
};

/**
 * Create a torrent
 * TODO : Check if a torrent with the same hash exist
 * @param {String} name 
 * @param {String} hash 
 * @param {String} location
 * @returns {Boolean}
 */
Torrent.create = function create(name, hash, location, filename) {
    const db = require('../../database');
    db.run("INSERT INTO torrents (name, hash, location, filename) VALUES (?, ?, ?, ?)", name, hash, location, filename, (err) => {
        if (err) {
            return false;
        }
        return true;
    });
}

/**
 * Return all torrents saved in database
 * @param {Function} callback 
 * @returns {Function}
 */
Torrent.getAll = function getAll(callback) {
    const db = require('../../database');
    var results = [];
    db.all("SELECT * FROM torrents", (err, rows) => {
        if(rows !== null && typeof rows !== "undefined"){
            rows.forEach((row) => {
                results.push(row);
            })
        }
        callback(null, results);
    });
}

/**
 * Change torrent location
 * @param {String} hash 
 * @param {String} destination 
 * @param {Function} callback
 * @return {Function}
 */
Torrent.move = function move(hash, destination, callback) {
    const db = require('../../database');
    db.serialize(function() {
        var stmt = db.prepare("UPDATE torrents SET location = ? WHERE hash = ?");
        stmt.run(destination, hash);
        stmt.finalize();
        callback(null, true);
    });
}

/**
 * Return torrent row
 * @param {String} hash 
 * @param {Function} callback 
 * @returns {Torrent}
 */
Torrent.getOne = function getOne(hash, callback) {
    const db = require('../../database');
    db.get("SELECT * FROM torrents WHERE hash = " + "'" + hash + "'", (err, row) => {
        if(!err){ callback(row); }
    })
}

/**
 * Database Schema
 */
Torrent.Generate = "CREATE TABLE IF NOT EXISTS torrents (ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, hash TEXT, location TEXT, filename TEXT, UNIQUE (hash))";

module.exports = Torrent;