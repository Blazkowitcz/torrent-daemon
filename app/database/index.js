const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = 'database.db';
var db = null;

if(!fs.existsSync(dbFile)){
    db = new sqlite3.Database(dbFile);
    
    /** Create all datatables from models */
    const torrent = require("./models/torrent.model");
    db.run(torrent.Generate);
}else{
    db = new sqlite3.Database(dbFile);
}

module.exports = db;
