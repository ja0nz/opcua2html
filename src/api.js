exports.qualityControlNodes = ['t4011', 't4012', 't4013', 'V4064', 'V4065', 'V4066', 'p4054', 'p4055', 'p4056', 'p4071', 'p4072', 'p4073'];

exports.qualityControlAPI = [
  { label: 'Zykluszeit', value: 'Zykluszeit', ref: 't4011', ist: 't4012', tol: 't4013' },
  { label: 'Umschaltvolumen', value: 'Umschaltvolumen', ref: 'V4064', ist: 'V4065', tol: 'V4066' },
  { label: 'Max. Einspritzdruck', value: 'Max. Einspritzdruck', ref: 'p4054', ist: 'p4055', tol: 'p4056' },
  { label: 'Umschaltspritzdruck', value: 'Umschaltspritzdruck', ref: 'p4071', ist: 'p4072', tol: 'p4073' }
];
//     this.qcNodes = require('../api')['qualityControlNodes'];
