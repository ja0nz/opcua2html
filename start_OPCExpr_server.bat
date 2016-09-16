@echo off
cd OPCExpressServer
start cmd /k node node_express_server.js
start cmd /k node opcua_virtual_arburg_server.js
