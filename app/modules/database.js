const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapterF = new FileSync("./db.json");
const db = low(adapterF);
const defaultData = { torrents: []};
db.defaults(defaultData).write();
module.exports = db;