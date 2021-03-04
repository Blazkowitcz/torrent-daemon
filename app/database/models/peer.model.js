/**
 * Constructor
 * @param {JSON} datas 
 */
function Peer(datas) {
    for (var key in datas) {
        this[key] = datas[key];
    }
};

module.exports = Peer;