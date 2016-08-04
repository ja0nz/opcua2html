const opcua = require('node-opcua');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const client = new opcua.OPCUAClient();
const hostname = require('os').hostname().toLowerCase();
const endpointUrl = 'opc.tcp://' + hostname +':26543/UA/SampleServer';

// TODO:
var userIdentity  = null;
//xx var  userIdentity = { userName: 'opcuauser', password: 'opcuauser' };

// Starter chain
connect(endpointUrl)
  .then(client => createSession(client))
  .then(session => subscribe(session))
  .then(subscription => monitor(subscription))
  .then(items => getData(items))
  .catch(err => console.log( 'Error: ' + err));

function connect(endpointUrl) {
  return new Promise((resolve, reject) =>
    client.connect(endpointUrl, err =>
      {
        if (!err) resolve(client); else reject(Error(err));
      }
    )
  );
}

function createSession(client) {
  return new Promise((resolve, reject) =>
    client.createSession(userIdentity, (err, session) =>
      {
        if (!err) resolve(session); else reject(Error(err));
      }
    )
  );
}

function subscribe(session) {
  return new Promise((resolve, reject) =>
      {
        const the_subscription = new opcua.ClientSubscription(session,{
          //requestedPublishingInterval: 3000, -> not useful
          requestedMaxKeepAliveCount:  2000,
          requestedLifetimeCount:      6000,
          maxNotificationsPerPublish:  1000,
          publishingEnabled: true,
          priority: 10
        });

        the_subscription
          .on('started',() => {
            console.log('subscription started' );
            resolve(the_subscription);
          })
          .on('keepalive',() => console.log('keepalive'))
          .on('terminated',() => reject(Error('terminated')));
      }
  );
}

function monitor(subscription) {
  return new Promise((resolve, reject) =>
      {
        const nodes =['ns=1;s=Temperature', 'ns=1;s=FanSpeed'];

        const Temperature = subscription.monitor({
          nodeId: nodes[0],
          attributeId: opcua.AttributeIds.Value
        },
        {
          samplingInterval: 3000, // how often the monitor event triggers
          discardOldest: true,
          queueSize: 100
        },opcua.read_service.TimestampsToReturn.Both, err => {
          if (err) {
            console.log('Monitor ' + nodes[0].toString() +  ' failed');
            reject(Error(err));
          }
        });

        const FanSpeed = subscription.monitor({
          nodeId: nodes[1],
          attributeId: opcua.AttributeIds.Value
        },
        {
          samplingInterval: 3000, // how often the monitor event triggers
          discardOldest: true,
          queueSize: 100
        },opcua.read_service.TimestampsToReturn.Both, err => {
          if (err) {
            console.log('Monitor ' + nodes[1].toString() +  ' failed');
            reject(Error(err));
          }
        });

        resolve([Temperature, FanSpeed]);
      }
  );
}

function getData(monitoredItems) {

  const port = 3700;
  let connected = 0;
  app.use(express.static(__dirname + '/'));

  io.on('connection', socket => {
    connected++;
    socket.on('disconnect', () => connected--);
  });

  for (let i of monitoredItems) {
    i.on('changed', dataValue => {
      let cachedData =
        {
          value: dataValue.value.value,
          timestamp: dataValue.serverTimestamp,
          nodeId: i.itemToMonitor.nodeId
          //browseName: 'InsertBrowseName' -> dont know where to pull, not super necessary
        };
      if (connected) { io.sockets.emit('data', cachedData) } //push the data
    });
  }

  http.listen(port, () =>
    console.log('Listening on port ' + port)
  );
}
