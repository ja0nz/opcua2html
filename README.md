opcua2html
====================

<img src="/docs/Screenshot.png" alt="Screenshot" width="270">

##### install 

    $ git clone https://github.com/ja-nz/opcua2html
    $ cd opcua2html/ReactJsApp
    $ npm i
    $ cd -
    $ cd opcua2html/OPCExpressServer
    $ npm i
    $
    $ # start virtual OPC server and express server
    $ cd OPCExpressServer
    $ node node_express_server.js
    $ node opcua_virtual_arburg_server.js
    $ # # OR
    $ start_OPCExpr_server.bat
    $
    $ # start the dev engine
    $ cd ReactJSApp
    $ npm start
