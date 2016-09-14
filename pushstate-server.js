var server = require('pushstate-server');

server.start({
    port: 80,
    directory: './build'
});
