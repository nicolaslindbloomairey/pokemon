const data = require('./data/formats-data');

const fs = require('fs');

var json = JSON.stringify(data.BattleFormatsData);

fs.writeFile('formats-data.json', json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
});


