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

function sizeReadable(bytes, speed) {
    var i = -1;
    var byteUnits = [' Kb', ' Mb', ' Gb', ' Tb'];
    do {
        bytes = bytes / 1024;
        i++;
    } while (bytes > 1024);
    result = Math.max(bytes, 0).toFixed(1) + byteUnits[i];
    if(speed === true){
        result += '/s';
    }
    return result;
}

module.exports = { getStatus, sizeReadable }