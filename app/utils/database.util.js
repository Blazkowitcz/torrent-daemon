const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const file = (__dirname + 'database.json')
const adapter = new FileSync(file);
const db = new low(adapter);

db.data ||= {posts:[]}

module.exports = db;