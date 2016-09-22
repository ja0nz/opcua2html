# OPCUA2HTML

This repo contains....

- a lean OPCUA server based on the [Node-OPCUA](http://node-opcua.github.io/) server. This server simulates an [**Arburg Allrounder**](https://www.arburg.com/us/us/products-and-services/injection-molding/injection-molding-machines/) OPCUA Server dispatching values with the same nodeIds used in the original machine. Link to the server: [opcua_virtual_arburg_server.js](https://github.com/ja-nz/opcua2html/blob/master/OPCExpressServer/opcua_virtual_arburg_server.js)


- a [Node Express](http://expressjs.com/) Server for establishing a subscription to the OPCUA server. After a successful subscription, the Node Express server observes given nodeIds.

	`const NODES = ['f076', 'f077', 't081', 'p4073', 'f902E'];`

	On a fixed interval the Node Express Server broadcasts the data object via a  [Socket.io](http://socket.io/) WebSocket connection and prints it to the console/terminal as well. The data object is an array of objects containing the OPCUA data. Link to the server: [node_express_server.js](https://github.com/ja-nz/opcua2html/blob/master/OPCExpressServer/node_express_server.js)


- a [ReactJS](https://facebook.github.io/react/) frontend for fetching and printing the OPCUA data in the browser. Link to the ReactJS frontend: [ReactJsApp](https://github.com/ja-nz/opcua2html/tree/master/ReactJsApp)




## ReactJS App

ReactJS is a good fit for displaying OPCUA data as it handles even big chunks of incoming data with ease and updates the UI in a snap.

For development I used the official [Create-React-App](https://github.com/facebookincubator/create-react-app) dev environment. It is very well documented and provides valuable insights about the architecture of a ReactJS App.
- `npm start` let you start the dev server
- `npm run build` let you produce a optimized production build

Furthermore I found it very helpful to develope with the official [React Development Tools Extension](https://facebook.github.io/react/blog/2015/09/02/new-react-developer-tools.html) for Chrome/Firefox as it makes the processes under the hood understandable.


### React Components

[What is a component?](https://facebook.github.io/react/docs/thinking-in-react.html) 

**Short explanation about the [components](https://github.com/ja-nz/opcua2html/tree/master/ReactJsApp/src/components) used in this project:**

- [`App.js`](https://github.com/ja-nz/opcua2html/blob/master/ReactJsApp/src/components/App.js) is the root component of the ReactJS App. It's controlling the WebSocket connection and the distribution of the OPCUA data to other components. Furthermore it renders the Header and Footer.

- [`JobControl.js`](https://github.com/ja-nz/opcua2html/blob/master/ReactJsApp/src/components/JobControl.js) is another stateful component which is responsible for the correct rendering of the job control section. It is passing the SVG Path to the stateless SVG **Gauge component**, calculating the end of the current job and rendering the passed OPCUA data related to the [jobAPI](https://github.com/ja-nz/opcua2html/blob/master/ReactJsApp/src/api.js).

- [`QualityControl.js`](https://github.com/ja-nz/opcua2html/blob/master/ReactJsApp/src/components/QualityControl.js) is a stateful component too. It is responsible for rendering the **Select component** and passing the data related to the [qualityControlAPI](https://github.com/ja-nz/opcua2html/blob/master/ReactJsApp/src/api.js) to the [QualityControlNode](https://github.com/ja-nz/opcua2html/blob/master/ReactJsApp/src/components/QualityControlNode.js) component and handling click events from this component.

### Styling

Styles can be found here: [styles](https://github.com/ja-nz/opcua2html/tree/master/ReactJsApp/src/components/styles) 

Most of the styling made possible via the `className=""` property which is kinda similar to the `class=""` html property.