exports.qualityControlAPI = [
  { name: 'Zykluszeit', ref: 't4011', ist: 't4012', tol: 't4013' },
  { name: 'Umschaltvolumen', ref: 'V4064', ist: 'V4065', tol: 'V4066' },
  { name: 'Max. Einspritzdruck', ref: 'p4054', ist: 'p4055', tol: 'p4056' },
  { name: 'Umschaltspritzdruck', ref: 'p4071', ist: 'p4072', tol: 'p4073' }
];

exports.jobControlAPI = [
  { name: 'Auftragsstueckzahl', nodeId: 'f076' },
  { name: 'Gutteile', nodeId: 'f077' },
  { name: 'Schlechtteile', nodeId: 'f087' },
  { name: 'Restdauer', nodeId: 't081' },
  { name: 'Programmname', nodeId: 'f902E' }
];
//     this.qcNodes = require('../api')['qualityControlNodes'];
