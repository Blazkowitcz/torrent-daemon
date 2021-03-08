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

/**
 * Return the status color of a torrent
 * @param {String} status
 * @return {String}
 */
function getStatusColor(status){
    switch (status) {
        case 'Checking':
            return 'info';
        case 'Paused':
            return 'warning';
        case 'Downloading':
            return 'primary';
        case 'Seeding': 
            return 'success';
    }
}

/**
 * Transform bytes values to readable value
 * @param {Integer} bytes 
 * @param {Boolean} speed 
 * @return {String}
 */
function sizeReadable(bytes, speed) {
    var i = -1;
    var byteUnits = [' KB', ' MB', ' GB', ' TB'];
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

function formatDate(date_text) {
    var date = new Date(date_text);
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

module.exports = { getStatus, sizeReadable, getStatusColor, formatDate }