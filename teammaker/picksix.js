'use-strict';
const data = require('./data/vgc');
const totalusage = 150479;

const percent = Math.round(parseInt(data[0][data[0].length - 1]) / totalusage * 600000) / 100000;
console.log(percent);
