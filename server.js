const opcua = require('node-opcua');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');

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
  .then(monitor => startHTTPServer(monitor))
  .catch(err => console.log( 'Error: ' + err));

function connect(endpointUrl) {
  return new Promise((resolve, reject) =>
    client.connect(endpointUrl, err =>
      {
        if (!err) resolve(client); else reject(Error(err));
      }
    )
  )
}

function createSession(client) {
  return new Promise((resolve, reject) =>
    client.createSession(userIdentity, (err, session) =>
      {
        if (!err) resolve(session); else reject(Error(err));
      }
    )
  )
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
        const nodeId = 'ns=1;s=Temperature';

        const monitoredItem = subscription.monitor({
          nodeId: nodeId,
          attributeId: opcua.AttributeIds.Value
        },
        {
          samplingInterval: 3000, // how often the monitor event triggers
          discardOldest: true,
          queueSize: 100
        },opcua.read_service.TimestampsToReturn.Both, err => {
          if (err) {
            console.log('Monitor ' + nodeId.toString() +  ' failed');
            reject(Error(err));
          };
        });
        resolve(monitoredItem);
      }
  );
}

function startHTTPServer(monitoredItem) {

  const port = 3700;
  let cachedData;
  let connected = 0;
  app.use(express.static(__dirname + '/'));

  io.on('connection', socket => {
    connected++;
    socket.on('disconnect', () => connected--);
  });

  monitoredItem.on('changed', dataValue => {
    cachedData = [
      {
        value: dataValue.value.value,
        timestamp: dataValue.serverTimestamp,
        nodeId: 'ns=1;s=Temperature',
        browseName: 'Temperature'
      }
    ];
    io.sockets.emit('data', cachedData); //push the data
  });

  http.listen(port, () =>
    console.log('Listening on port ' + port)
  );
}
