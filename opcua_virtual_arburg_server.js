/* eslint no-process-exit: 0 */
"use strict";
//require("requirish")._(module);
Error.stackTraceLimit = Infinity;

var argv = require('yargs')
  .wrap(132)

.string("alternateHostname")
  .describe("alternateHostname")
  .alias('a', 'alternateHostname')

.number("port")
  .describe("port")
  .alias('p', 'port')
  .defaults("port", 26543)

.number("maxAllowedSessionNumber")
  .describe("maxAllowedSessionNumber")
  .alias('m', 'maxAllowedSessionNumber')
  .defaults("maxAllowedSessionNumber", 500)

.boolean("silent")
  .describe("slient", "no trace")

.help("help")
  .alias("h", "help")
  .argv;

var opcua = require("node-opcua");
var _ = require("underscore");
var moment = require('moment');
//var path = require("path");
//var assert = require("assert");

var OPCUAServer = opcua.OPCUAServer;
var Variant = opcua.Variant;
var DataType = opcua.DataType;
var DataValue = opcua.DataValue;
var get_fully_qualified_domain_name = opcua.get_fully_qualified_domain_name;
var makeApplicationUrn = opcua.makeApplicationUrn;

var port = argv.port;
var maxAllowedSessionNumber = argv.maxAllowedSessionNumber;
var maxConnectionsPerEndpoint = maxAllowedSessionNumber;


/*
 var address_space_for_conformance_testing = require("lib/simulation/address_space_for_conformance_testing");
 var build_address_space_for_conformance_testing = address_space_for_conformance_testing.build_address_space_for_conformance_testing;

 var install_optional_cpu_and_memory_usage_node = require("lib/server/vendor_diagnostic_nodes").install_optional_cpu_and_memory_usage_node;

 var standard_nodeset_file = opcua.standard_nodeset_file;


 var userManager = {
 isValidUser: function (userName, password) {

 if (userName === "user1" && password === "password1") {
 return true;
 }
 if (userName === "user2" && password === "password2") {
 return true;
 }
 return false;
 }
 };


 var server_certificate_file            = path.join(__dirname, "../certificates/server_selfsigned_cert_2048.pem");
 var server_certificate_file            = path.join(__dirname, "../certificates/server_selfsigned_cert_1024.pem");
 var server_certificate_file            = path.join(__dirname, "../certificates/server_cert_2048_outofdate.pem");
 var server_certificate_privatekey_file = path.join(__dirname, "../certificates/server_key_2048.pem");
 */
var server_options = {

  // certificateFile: server_certificate_file,
  // privateKeyFile: server_certificate_privatekey_file,

  port: port,
  //xx (not used: causes UAExpert to get confused) resourcePath: "UA/Server",

  maxAllowedSessionNumber: maxAllowedSessionNumber,
  maxConnectionsPerEndpoint: maxConnectionsPerEndpoint,

  //  nodeset_filename: [
  //      standard_nodeset_file,
  //      path.join(__dirname,"../nodesets/Opc.Ua.Di.NodeSet2.xml")
  //  ],

  serverInfo: {
    applicationUri: makeApplicationUrn(get_fully_qualified_domain_name(), "NodeOPCUA-Server"),
    productUri: "NodeOPCUA-Server",
    applicationName: { text: "NodeOPCUA", locale: "en" },
    gatewayServerUri: null,
    discoveryProfileUri: null,
    discoveryUrls: []
  },
  buildInfo: {
    buildNumber: "1234"
  },
  serverCapabilities: {
    operationLimits: {
      maxNodesPerRead: 1000,
      maxNodesPerBrowse: 2000
    }
  },
  //    userManager: userManager,

  isAuditing: false
};

process.title = "Node OPCUA Server on port : " + server_options.port;

//server_options.alternateHostname = argv.alternateHostname;

var server = new OPCUAServer(server_options);

var endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;

var hostname = require("os").hostname();


server.on("post_initialize", function() {

  //build_address_space_for_conformance_testing(server.engine);

  //install_optional_cpu_and_memory_usage_node(server);

  var addressSpace = server.engine.addressSpace;

  //var rootFolder = addressSpace.findNode("RootFolder");
  //assert(rootFolder.browseName.toString() === "Root");

  //var myDevices = addressSpace.addFolder(rootFolder.objects, {browseName: "MyDevices"});

  var myDevices = addressSpace.addObject({
    organizedBy: addressSpace.rootFolder.objects,
    browseName: "MyDevice"
  });





  ///START ARBURG VARIABLES


  let programname = "Kabine klein"//f902E


  let auftrag = {
    'auftragsstueckzahl': 200, //f067
    'gutteile': 0, //f077
    'schlechtteile': 0 //f087
  }

  let zyklus = {
    'referenzWert': 5, //t4011
    'toleranzWert': 30, //t4013
    'istWert': 0, //t4012
  }


  var zyklusCounter = setInterval(function() {

    if (auftrag.gutteile == auftrag.auftragsstueckzahl) {
      auftrag.gutteile = 0;
      auftrag.schlechtteile = 0;
    }

    //some are  schlechtteil but not more than 4
    var schlechtteil = false;
    if (Math.floor(Math.random() * 10) == 5 && auftrag.schlechtteile <= 3) {
      schlechtteil = true;
    }


    if (zyklus.istWert == zyklus.referenzWert) {
      auftrag.gutteile++
        // console.log("Gutteile: " + auftrag.gutteile)
        zyklus.istWert = 1;

    } else {

      if (schlechtteil == true) {
        zyklus.istWert = 1;
        auftrag.schlechtteile++;
        // console.log("Schlechtteile: " + auftrag.schlechtteile)
      } else {
        zyklus.istWert++
      }


    }
  }, 1000);



  let auftragsEnde = {
    remainingSeconds() {
      return (auftrag.auftragsstueckzahl - auftrag.gutteile) * zyklus.referenzWert;
    },
    duration() {
      return moment.duration(this.remainingSeconds(), 'seconds');
    },
    // t081
    getCountdown() {
      return {
        hours: this.duration().hours(),
        minutes: this.duration().minutes()
      };
    }

  }



  let umschaltvolumen = {
    'referenzWert': 3.899, //V4064
    'toleranzWert': 0.2, //V4066
    //V4065
    'istWert': function() {
      return (this.referenzWert + (this.toleranzWert * 0.9 + this.toleranzWert * Math.sin(Date.now() / 10000))).toFixed(3)
    },
  }




  let maximalerSpritzdruck = {
    'referenzWert': 744, //p4054
    'toleranzWert': 40, //p4056
    //p4055
    'istWert': function() {
      return (this.referenzWert + (this.toleranzWert * 0.3 + this.toleranzWert * Math.sin(Date.now() / 1000))).toFixed(0)
    },
  }


  let umschaltspritzdruck = {
    'referenzWert': 744, //p4071
    'toleranzWert': 40, //p4073
    //p4072
    'istWert': function() {
      return (this.referenzWert + (this.toleranzWert * 0.5 + this.toleranzWert * Math.sin(Date.now() / 10000))).toFixed(0)
    },
  }


  /*
   OPC Variable: AUFTRAGSSUECKZAHL
   */
  addressSpace.addVariable({

    organizedBy: myDevices,
    browseName: "Programmname",
    nodeId: "ns=2;s=f902E", // a string nodeID
    dataType: "String",
    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.String, value: programname});
      }
    }
  });

  /*
   OPC Variable: ZeitBisAuftragende
   */
  addressSpace.addVariable({

    organizedBy: myDevices,
    browseName: "Zeit bis Auftragsende",
    nodeId: "ns=2;s=t081", // a string nodeID
    dataType: "String",
    value: {
      get: function() {
        return new Variant({
          dataType: opcua.DataType.String,
          value: JSON.stringify(auftragsEnde.getCountdown())
        });
      }
    }
  });


  /*
   OPC Variable: AUFTRAGSSUECKZAHL
   */
  addressSpace.addVariable({

    organizedBy: myDevices,
    browseName: "Auftragsstueckzahl",
    nodeId: "ns=2;s=f076", // a string nodeID
    dataType: "Double",
    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: auftrag.auftragsstueckzahl });
      }
    }
  });


  /*
   OPC Variable: GUTTEILE
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "Gutteile",
    nodeId: "ns=2;s=f077",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: auftrag.gutteile });

      }
    }
  });

  /**
   * OPC Variable: SCHLECHTTEILE
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "Schlechtteile",
    nodeId: "ns=2;s=f087",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: auftrag.schlechtteile });
      }
    }
  });


  /**
   * OPC Variable: Zykluszeit Referenzwert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "Zykluszeit Referenzwert",
    nodeId: "ns=2;s=t4011",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: zyklus.referenzWert });
      }
    }
  });

  /**
   * OPC Variable: Zykluszeit Istwert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "Zykluszeit IstWert",
    nodeId: "ns=2;s=t4012",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: zyklus.istWert });
      }
    }
  });

  /**
   * OPC Variable: Zykluszeit Toleranzwert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "Zykluszeit Toleranzwert",
    nodeId: "ns=2;s=t4013",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: zyklus.toleranzWert });
      }
    }
  });


  /**
   * OPC Variable: umschaltvolumen referenzwert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "Umschaltvolumen Referenzwert",
    nodeId: "ns=2;s=V4064",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: umschaltvolumen.referenzWert });
      }
    }
  });


  /**
   * OPC Variable: Umschaltvolumen istWert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "Umschaltvolumen Istwert",
    nodeId: "ns=2;s=V4065",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: umschaltvolumen.istWert() });
      }
    }
  });

  /**
   * OPC Variable: Umschaltvolumen Toleranzwert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "Umschaltvolumen Toleranzwert",
    nodeId: "ns=2;s=V4066",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: umschaltvolumen.toleranzWert });
      }
    }
  });


  /**
   * OPC Variable: maximalerSpritzdruck referenzwert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "maximalerSpritzdruck Referenzwert",
    nodeId: "ns=2;s=p4054",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: maximalerSpritzdruck.referenzWert });
      }
    }
  });

  /**
   * OPC Variable: maximalerSpritzdruck istWert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "maximalerSpritzdruck Istwert",
    nodeId: "ns=2;s=p4055",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: maximalerSpritzdruck.istWert() });
      }
    }
  });

  /**
   * OPC Variable: maximalerSpritzdruck Toleranzwert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "maximalerSpritzdruck Toleranzwert",
    nodeId: "ns=2;s=p4056",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: maximalerSpritzdruck.toleranzWert });
      }
    }
  });


  /**
   * OPC Variable: Umschaltspritzdruck referenzwert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "umschaltspritzdruck referenzwert",
    nodeId: "ns=2;s=p4071",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: umschaltspritzdruck.referenzWert });
      }
    }
  });

  /**
   * OPC Variable: Umschaltspritzdruck istWert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "umschaltspritzdruck Istwert",
    nodeId: "ns=2;s=p4072",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: umschaltspritzdruck.istWert() });
      }
    }
  });

  /**
   * OPC Variable: Umschaltspritzdruck Toleranzwert
   */
  addressSpace.addVariable({
    organizedBy: myDevices,
    browseName: "umschaltspritzdruck Toleranzwert",
    nodeId: "ns=2;s=p4073",
    dataType: "Double",

    value: {
      get: function() {
        return new Variant({ dataType: opcua.DataType.Double, value: umschaltspritzdruck.toleranzWert });
      }
    }
  });


  ///END ARBURG VARIABLES


  /*
   //------------------------------------------------------------------------------
   // Add a view
   //------------------------------------------------------------------------------
   var view = addressSpace.addView({
   organizedBy: rootFolder.views,
   browseName: "MyView"
   });

   view.addReference({
   referenceType:"Organizes",
   nodeId: node.nodeId
   });
   */
});


function dumpObject(obj) {
  function w(str, width) {
    var tmp = str + "                                        ";
    return tmp.substr(0, width);
  }

  return _.map(obj, function(value, key) {
    return "      " + w(key, 30).green + "  : " + ((value === null) ? null : value.toString());
  }).join("\n");
}


console.log("  server PID          :".yellow, process.pid);

server.start(function(err) {
  if (err) {
    console.log(" Server failed to start ... exiting");
    process.exit(-3);
  }
  console.log("  server on port      :".yellow, server.endpoints[0].port.toString().cyan);
  console.log("  endpointUrl         :".yellow, endpointUrl.cyan);

  console.log("  serverInfo          :".yellow);
  console.log(dumpObject(server.serverInfo));
  console.log("  buildInfo           :".yellow);
  console.log(dumpObject(server.engine.buildInfo));

  console.log("\n  server now waiting for connections. CTRL+C to stop".yellow);

  if (argv.silent) {
    console.log(" silent");
    console.log = function() {}
  }
  //  console.log = function(){};

});

server.on("create_session", function(session) {

  console.log(" SESSION CREATED");
  console.log("    client application URI: ".cyan, session.clientDescription.applicationUri);
  console.log("        client product URI: ".cyan, session.clientDescription.productUri);
  console.log("   client application name: ".cyan, session.clientDescription.applicationName.toString());
  console.log("   client application type: ".cyan, session.clientDescription.applicationType.toString());
  console.log("              session name: ".cyan, session.sessionName ? session.sessionName.toString() : "<null>");
  console.log("           session timeout: ".cyan, session.sessionTimeout);
  console.log("                session id: ".cyan, session.sessionId);
});

server.on("session_closed", function(session, reason) {
  console.log(" SESSION CLOSED :", reason);
  console.log("              session name: ".cyan, session.sessionName ? session.sessionName.toString() : "<null>");
});

function w(s, w) {
  return ("000" + s).substr(-w);
}

function t(d) {
  return w(d.getHours(), 2) + ":" + w(d.getMinutes(), 2) + ":" + w(d.getSeconds(), 2) + ":" + w(d.getMilliseconds(), 3);
}

server.on("response", function(response) {

  if (argv.silent) {
    return
  };

  console.log(t(response.responseHeader.timeStamp), response.responseHeader.requestHandle,
    response._schema.name.cyan, " status = ", response.responseHeader.serviceResult.toString().cyan);
  switch (response._schema.name) {
    case "xxModifySubscriptionResponse":
    case "xxCreateMonitoredItemsResponse":
    case "xxModifyMonitoredItemsResponse":
    case "xxRepublishResponse":
    case "xxCreateSessionResponse":
    case "xxActivateSessionResponse":
    case "xxCloseSessionResponse":
    case "xxBrowseResponse":
    case "xxCreateSubscriptionResponse":
    case "xxTranslateBrowsePathsToNodeIdsResponse":
    case "xxSetPublishingModeResponse":
    case "xxWriteResponse":
      console.log(response.toString());
      break;
    case "xxPublishResponse":
      console.log(response.toString());
      console.log("PublishResponse.subscriptionId = ", response.subscriptionId.toString());
      break;
  }

});

function indent(str, nb) {
  var spacer = "                                             ".slice(0, nb);
  return str.split("\n").map(function(s) {
    return spacer + s;
  }).join("\n");
}
server.on("request", function(request, channel) {

  if (argv.silent) {
    return
  };

  console.log(t(request.requestHeader.timeStamp), request.requestHeader.requestHandle,
    request._schema.name.yellow, " ID =", channel.secureChannelId.toString().cyan);
  switch (request._schema.name) {
    case "xxModifySubscriptionRequest":
    case "xxCreateMonitoredItemsRequest":
    case "xxModifyMonitoredItemsRequest":
    case "xxRepublishRequest":
    case "xxWriteRequest":
      console.log(request.toString());
      break;
    case "xxReadRequest":
      var str = "    ";
      if (request.nodesToRead) {
        request.nodesToRead.map(function(node) {
          str += node.nodeId.toString() + " " + node.attributeId + " " + node.indexRange;
        });
      }
      console.log(str);
      break;
    case "xxWriteRequest":
      if (request.nodesToWrite) {
        var lines = request.nodesToWrite.map(function(node) {
          return "     " + node.nodeId.toString().green + " " + node.attributeId + " " + node.indexRange + "\n" + indent("" + node.value.toString(), 10) + "\n";
        });
        console.log(lines.join("\n"));
      }
      break;

    case "xxTranslateBrowsePathsToNodeIdsRequest":
    case "xxBrowseRequest":
    case "xxCreateSessionRequest":
    case "xxActivateSessionRequest":
    case "xxCloseSessionRequest":
    case "xxCreateSubscriptionRequest":
    case "xxSetPublishingModeRequest":
      // do special console output
      //console.log(util.inspect(request, {colors: true, depth: 10}));
      console.log(request.toString());
      break;
    case "xxPublishRequest":
      console.log(request.toString());
      break;
  }
});

process.on('SIGINT', function() {
  // only work on linux apparently
  console.error(" Received server interruption from user ".red.bold);
  console.error(" shutting down ...".red.bold);
  server.shutdown(1000, function() {
    console.error(" shutting down completed ".red.bold);
    console.error(" done ".red.bold);
    console.error("");
    process.exit(-1);
  });
});

var discovery_server_endpointUrl = "opc.tcp://" + hostname + ":4840/UADiscovery";

console.log("\nregistering server to :".yellow + discovery_server_endpointUrl);

server.registerServer(discovery_server_endpointUrl, function(err) {
  if (err) {
    // cannot register server in discovery
    console.log("     warning : cannot register server into registry server".cyan);
  } else {

    console.log("     registering server to the discovery server : done.".cyan);
  }
  console.log("");
});


server.on("newChannel", function(channel) {
  console.log("Client connected with address = ".bgYellow, channel.remoteAddress, " port = ", channel.remotePort);
});

server.on("closeChannel", function(channel) {
  console.log("Client disconnected with address = ".bgCyan, channel.remoteAddress, " port = ", channel.remotePort);
});
