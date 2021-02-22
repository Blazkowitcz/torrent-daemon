/**
 * Constructor
 * @param {JSON} datas 
 */
function Torrent (datas) {
    for (var key in datas){
        this[key] = datas[key];
    }
};

/**
 * Create a torrent
 * @param {String} name 
 * @param {String} hash 
 * @param {String} location 
 */
Torrent.create = function create(name, hash, location, filename){
    const db = require('../../database');
    db.run("INSERT INTO torrents (name, hash, location, filename) VALUES (?, ?, ?, ?)", name, hash, location, filename, (err) => {
        if(err){
            return false;
        }
        return true;
    });
}

/**
 * Database Schema 
 */
Torrent.Generate = "CREATE TABLE IF NOT EXISTS torrents (ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, hash TEXT, location TEXT, filename TEXT, UNIQUE (hash))";

module.exports = Torrent;