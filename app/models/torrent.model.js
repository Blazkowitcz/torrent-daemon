var Torrent = function (datas) {
    for (var key in datas){
        this[key] = datas[key];
    }
}

module.exports = Torrent;