# OPCUA2HTML

This repo contains....

- a lean OPCUA Server based on the [Node-OPCUA](http://node-opcua.github.io/) server. This server simulates an [**Arburg Allrounder**](https://www.arburg.com/us/us/products-and-services/injection-molding/injection-molding-machines/) OPCUA Server dispatching events on the same NodeIds used in the original machine. Link to the server: [opcua_virtual_arburg_server.js](https://github.com/ja-nz/opcua2html/blob/master/OPCExpressServer/opcua_virtual_arburg_server.js)


- a [Node Express](http://expressjs.com/) Server for establishing a subscription to the OPCUA Server. After a successful subscription, the Node Express server observes given NodeIds.

	`const NODES = ['f076', 'f077', 't081', 'p4073', 'f902E'];`

	On a fixed interval the Node Express Server broadcasts the Data object via a  [Socket.io](http://socket.io/) websocket connection and prints it to the console/terminal as well. The data object is an array of objects that contains the OPCUA data. Link to the server: [node_express_server.js](https://github.com/ja-nz/opcua2html/blob/master/OPCExpressServer/node_express_server.js)


- a [ReactJS](https://facebook.github.io/react/) Frontend for fetching and printing the OPCUA Data in the browser. Link to the ReactJS Frontend: [ReactJsApp](https://github.com/ja-nz/opcua2html/tree/master/ReactJsApp)




## ReactJS App

ReactJS is very suitable for printing OPCUA data in the browser as it can handle even big chunks of incoming data and updates the UI pretty fast.

During the process I used the official [Create-React-App](https://github.com/facebookincubator/create-react-app) dev environment. It is very well documented and provides valuable insights about the architecture of a react app.
- `npm start` let you start the dev server
- `npm run build` let you produce a optimized production build

Furthermore I found it very helpful to develope with the official [React Development Tools Extension](https://facebook.github.io/react/blog/2015/09/02/new-react-developer-tools.html) for Chrome/Firefox as you can catch the underlying data in a glimpse.


### React Components

[What is a component?](https://facebook.github.io/react/docs/thinking-in-react.html) 

**Short explanation about the [components](https://github.com/ja-nz/opcua2html/tree/master/ReactJsApp/src/components) used in this project:**