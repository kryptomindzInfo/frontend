const argv = require('./argv');

//for local
//module.exports = parseInt(argv.port || process.env.PORT || '3000', 10);

//for server
module.exports = parseInt(argv.port || process.env.PORT || '3000', 10);