function debugLog(DEBUG,msg) {
    if (DEBUG) {
        console.log(msg);
    }
}

//For express.js, we need to export this module
module.exports = debugLog;
