opcua2html
====================

Plotting data from a virtual OPCUA Machine via ReactJS to the browser.

<img src="/docs/Screenshot.png" alt="Screenshot">

##### install 

    $ git clone https://github.com/ja-nz/opcua2html
    $
    $ # install dependencies for Front- & Backend
    $ opcua2html/ReactJsApp 		-> npm i
    $ opcua2html/OPCExpressServer 	-> npm i
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
