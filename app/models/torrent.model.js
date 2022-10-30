const crypto = require('crypto');

class Torrent {

    constructor(){
        this.uuid = crypto.randomUUID();
    }

    /**
     * Return Torrent UUID
     * @returns 
     */
    getUuid(){
        return this.uuid;
    }

    /**
     * Return Torrent Name
     * @returns {String}
     */
    getName(){
        return this.name;
    }

    /**
     * Set Torrent Name
     * @param {String} name 
     * @returns {String}
     */
    setName(name){
        this.name = name;
        return this;
    }

    /**
     * Return Torrent Filename
     * @returns {String} 
     */
    getFileName(){
        return this.filename;
    }

    /**
     * Set Torrent Filename
     * @param {String} filename 
     * @returns {String}
     */
    setFileName(filename){
        this.filename = filename;
        return this;
    }
}

module.exports = Torrent