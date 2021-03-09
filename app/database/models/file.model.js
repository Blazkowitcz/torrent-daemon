/**
 * Constructor
 * @param {JSON} datas 
 */
function File(datas) {
    for (var key in datas) {
        this[key] = datas[key];
    }
};

module.exports = File;