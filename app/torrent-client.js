const WebTorrent = require('webtorrent');
var client = null;

/**
 * Client Initialization
 */
function init(){
    this.client = new WebTorrent();
}

/**
 * Return the client
 * @returns client
 */
function getClient(){
    return this.client;
}

module.exports = { init, getClient }