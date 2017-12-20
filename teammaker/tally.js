const data = require('./data/vgc');

var count = parseInt(data[0][data[0].length-1]);
for (let i = 1; i<data.length; i++) {
    let battles = data[i][data[i].length-1];
    let add;
    if (battles <= data[i-1][data[i-1].length-1]) {
        add = parseInt(data[i-1][data[i-1].length-1]);
        //data[i][data[i].length-1] = data[i-1][data[i-1].length-1]
    } else {
        add = parseInt(data[i][data[i].length-1]);
    }
    count += add;
    console.log(add);
}
//console.log(parseInt(data[0][data[0].length-1])/count);
