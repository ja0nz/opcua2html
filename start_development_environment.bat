@echo off
START node opcServerSide\node_express_server.js
START node opcServerSide\opcua_virtual_arburg_server.js
START npm start
