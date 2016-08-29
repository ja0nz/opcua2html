const opcua = require('node-opcua');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const client = new opcua.OPCUAClient();
const hostname = require('os').hostname().toLowerCase();
const endpointUrl = 'opc.tcp://' + hostname + ':26543';

//const NODES = ['f076', 'f077', 't081', 'f087', 't4011', 't4012', 't4013', 'V4064', 'V4065', 'V4066', 'p4054', 'p4055', 'p4056', 'p4071', 'p4072', 'p4073'];
const NODES = ['t081'];
const INTERVAL = 3000;

// TODO:
var userIdentity = null;
//xx var  userIdentity = { userName: 'opcuauser', password: 'opcuauser' };

// Starter chain
connect(endpointUrl)
  .then(client => createSession(client))
  .then(session => subscribe(session))
  .then(subscription => monitor(subscription))
  .then(monitoring => buildData(monitoring))
  .then(cachedData => returnData(cachedData))
  .catch(err => console.log('Error: ' + err));

function connect(endpointUrl) {
  return new Promise((resolve, reject) =>
    client.connect(endpointUrl, (err) => {
      if (!err) resolve(client);
      else reject(Error(err));
    })
  );
}

function createSession(client) {
  return new Promise((resolve, reject) =>
    client.createSession(userIdentity, (err, session) => {
      if (!err) resolve(session);
      else reject(Error(err));
    })
  );
}

function subscribe(session) {
  return new Promise((resolve, reject) => {
    const subscription = new opcua.ClientSubscription(session, {
      //requestedPublishingInterval: 3000, -> not useful
      requestedMaxKeepAliveCount: 2000,
      requestedLifetimeCount: 6000,
      maxNotificationsPerPublish: 1000,
      publishingEnabled: true,
      priority: 10
    });

    subscription
      .on('started', () => {
        console.log('subscription started');
        resolve(subscription);
      })
      .on('keepalive', () => console.log('keepalive'))
      .on('terminated', () => reject(Error('terminated')));
  });
}

function monitor(subscription) {
  return new Promise((resolve, reject) => {
    const monitoring = [];
    const nodes = NODES; //NODES at head of this file

    nodes.forEach((node) => // iterate over nodesName array
      monitoring.push( // push each subscription object into the monitoring array
        subscription.monitor({
            nodeId: 'ns=2;s=' + node,
            attributeId: opcua.AttributeIds.Value
          }, {
            samplingInterval: 3000, // number of on changed requests
            discardOldest: true,
            queueSize: 100
          },
          opcua.read_service.TimestampsToReturn.Both, (err) => {
            if (err) {
              console.log('Monitor ns=2;s= ' + node + ' failed');
              reject(Error(err));
            }
          }
        )
      )
    );

    resolve(monitoring);
  });
}

function buildData(monitoring) {
  return new Promise((resolve) => {
    const cachedData = [];

    monitoring.forEach((item, i) => { // iterate over monitored OPC nodes
      item.on('changed', (dataValue) => { // on change receive new dataValue Object
        cachedData[i] = { // deconstruct the dataValue Object into the cachedData
          value: dataValue.value.value,
          timestamp: dataValue.serverTimestamp,
          nodeId: item.itemToMonitor.nodeId.value
        };
      });
    });

    resolve(cachedData);
  });
}


function returnData(cachedData) {
  const interval = INTERVAL; //INTERVAL at head of this file
  const data = cachedData;

  // print data to console and/or emit it via WebSocket
  emitData(data, interval);
  printData(data, interval);
}

function emitData(data, interval) {
  const port = 3700;
  let connected = 0;
  app.use(express.static(__dirname + '/'));

  io.on('connection', (socket) => { // open a connection
    connected++;
    socket.on('disconnect', () => connected--);
  });

  setInterval(() => {
    if (connected)
      io.sockets.emit('data', data); // emit data object
  }, interval);

  http.listen(port, () =>
    console.log('Listening on port ' + port)
  );
}

function printData(data, interval) {
  setInterval(() => {
    console.log(data);
  }, interval);
}
