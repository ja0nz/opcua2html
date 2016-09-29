opcua2html
====================

Plotting data from a virtual OPCUA Machine via ReactJS to the browser.

<img src="/docs/Screenshot.png" alt="Screenshot" width="270">

Demo
====================

You can find a Demo of this Mobile Webapplication on
http://opcua.stream (This link will change within next weeks)
Make sure that you test it on a mobile device. 




##### install 

    $ git clone https://github.com/ja-nz/opcua2html
    $
    $ # install dependencies for Front- & Backend
    $ opcua2html/ReactJsApp 		-> npm i
    $ opcua2html/OPCExpressServer 	-> npm i
    $
    $ # start virtual OPC server and express server
    $ opcua2html/OPCExpressServer	-> node node_express_server.js
    $ opcua2html/OPCExpressServer	-> node opcua_virtual_arburg_server.js
    $
    $ # start the ReactJS dev server
    $ opcua2html/ReactJsApp			-> npm start
    
For more information read the [Docs](/docs/Documentation.md "Docs")
