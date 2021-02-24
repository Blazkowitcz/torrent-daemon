/**
 * Return torrent status
 * @param {Object} torrent
 * @returns {String} 
 */
function getStatus(torrent){
    if(torrent.ready === false) {
        return 'Checking';
    }
    if(torrent.paused === true){
        return 'Paused';
    }
    if(torrent.done === false){
        return 'Downloading';
    }
    if(torrent.done === true) {
        return 'Seeding';
    }
}

module.exports = { getStatus }