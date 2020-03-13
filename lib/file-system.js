const fs = require('fs').promises;

fs.mkdirp('./lib/file-system.test.js');
//write a json file
function writeJSON(path, obj) {
    return fs.writeFile(path, JSON.stringify(obj));
}

// eslint-disable-next-line no-undef
module.exports = {
    mkdirp,
    writeJSON,
};


  //read a json file

  //read a directory of json files (fs.readdir -> [] -> Promise.all with readJson)

  //update a json file

  //delete a file