class Torrent {

    constructor(){}

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