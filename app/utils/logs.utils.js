var emo = require('node-emoji');

function warning(message){
    console.log(emo.get('warning') + "  " + message + " " + emo.get('warning'));
}

function success(message) {
    console.log(emo.get('white_check_mark') + "  " + message + " " + emo.get('white_check_mark'));
}

module.exports = { warning, success }