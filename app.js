const opcua = require('node-opcua');

const express = require("express");
const port = 3700;
const color = require("colors");

const client = new opcua.OPCUAClient();
const hostname = require('os').hostname().toLowerCase();
const endpointUrl = 'opc.tcp://' + hostname +':26543/UA/SampleServer';

// TODO: security username password
var userIdentity  = null;
//xx var  userIdentity = { userName: "opcuauser", password: "opcuauser" };


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
          requestedPublishingInterval: 2000,
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
          .on("keepalive",() => console.log("keepalive"))
          .on('terminated',() => reject(Error(err)));
      });
}

function startHTTPServer(subscription) {

  const nodeIdToMonitor = "ns=1;s=Temperature";

  var app = express();
  app.get("/", function(req, res){
    res.send("It works!");
  });

  app.use(express.static(__dirname + '/'));

  var io = require('socket.io').listen(app.listen(port));

  io.sockets.on('connection', function (socket) {
    //        socket.on('send', function (data) {
    //            io.sockets.emit('message', data);
    //        });
  });

  var monitoredItem = subscription.monitor(
    {
      nodeId: nodeIdToMonitor,
      attributeId: 13
    },
    {
      samplingInterval: 100,
      discardOldest: true,
      queueSize: 100
    },opcua.read_service.TimestampsToReturn.Both,function(err) {
      if (err) {
        console.log("Monitor  "+ nodeIdToMonitor.toString() +  " failed");
        console.loo("ERr = ",err.message);
      }

    });

  monitoredItem.on("changed", function(dataValue){

    //xx console.log(" value has changed " +  dataValue.toString());

    io.sockets.emit('message', {
      value: dataValue.value.value,
      timestamp: dataValue.serverTimestamp,
      nodeId: nodeIdToMonitor.toString(),
      browseName: "Temperature"
    });
  });

  console.log("Listening on port " + port);

}


connect(endpointUrl)
  .then(client => createSession(client)
  .then(session => subscribe(session)
  .then(subscription => startHTTPServer(subscription)
  )))
  .catch(err => console.log( 'Error: ' + err));
