var array = [];
const generateTeam = require('../teammaker/picksix');
const t0 = new Date().getTime(); //get the time so we can see time the battles take
for (let i = 0; i<100000; i++) {
    //console.log(generateTeam()); 
    generateTeam();
}
const t1 = new Date().getTime(); //get the time so we can see time the battles take
console.log("battles took " + (t1-t0) + " milliseconds");
