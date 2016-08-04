opcua2html
====================

##### install 

    $ git clone https://github.com/ja-nz/opcua2html
    $ cd opcua2html
    $ npm i
    $
    $ # start test OPC server in background
    $ node node_modules/node-opcua/bin/simple_server
    $
    $ # start OPC to HTML converting server
    $ node server.js
    $
    $ # open browser -> inspector
    $ http://localhost:3700/index.html
    $
    $ # watch the browserconsole for the objects to arrive :D
