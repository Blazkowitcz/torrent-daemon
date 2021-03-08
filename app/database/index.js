const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const torrent = require("./models/torrent.model");
var dbFile = 'database.db';
var dbExists = fs.existsSync(dbFile);
var db = null;

if (!dbExists) {
    fs.openSync(dbFile, 'w');
}
var db = new sqlite3.Database(dbFile);

if (!dbExists) {
    db.run('CREATE TABLE IF NOT EXISTS torrents (ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, hash TEXT, location TEXT, filename TEXT, UNIQUE (hash))');
}

module.exports = db;
