'use strict';

//set up python bot loading
/*const spawn = require('child_process').spawn;
const pybot = spawn('python', ['bots/pybot.py']);

var move = null;
pybot.stdout.on('data', function(data) {
    console.log(data.toString());
    move = data.toString();
});
pybot.stdout.on('end', function() {
    console.log('python script ended');
});
pybot.stderr.on('data', function(data) {
    console.log(data.toString());
});
*/

//IMPORTS
const format = 'vgc2018';
const Sim = require('./sim');
const Dex = require('./sim/dex');
const Ai = require('./ai');
const Random = require('./bots/random');
const Helper = require('./helper');
const fs = require('fs');
const generateTeam = require('../teammaker/picksix');
const Validator = require('./team-validator');
const TV = new Validator('vgc2018');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

//const team = Helper.importTeam(require("./teams/ludicolo.txt"));
//const team = generateTeam();
//console.log(team);
//const team1 = Helper.importTeam(require("./teams/johtoxalola.txt"));

const me = new Random('nick', 'p1');
const you = new Random('sam', 'p2');


//JOIN THE BATTLE

const numBattles = 1;
const t0 = new Date().getTime();
for (let i = 0; i<numBattles; i++) {

    const battle = Sim.construct(format);
    console.log("battle number " + (i+1));

    const team = generateTeam();
    //console.log(team);
    const team1 = generateTeam();
    //console.log(team1);
    //console.log('Team Errors: ' + new Validator('vgc2018').validateTeam(team));
    //console.log('Team Errors: ' + new Validator('vgc2018').validateTeam(team1));

    battle.join(null,me.name, null, team);
    battle.join(null,you.name, null, team1);
        //console.log(battle.dataOnly().p1.pokemon[0].moveset);

    //console.log(Object.getOwnPropertyNames(battle.p1));

    //const state =Helper.getState(battle);

    //THE BATTLE
    while (!battle.ended) {
       // pybot.stdin.write(JSON.stringify(battle.dataOnly()));
        //if (move) {
            battle.choose('p1', me.decide(battle.dataOnly()));
            //console.log(move);
            //move = null;
            battle.choose('p2', you.decide(battle.dataOnly()));
        //}
        //pybot.stdin.end();
        Helper.log(battle, me, you);


    }


}
const t1 = new Date().getTime();

console.log("me won " + me.wins + " times");
console.log("you won " + you.wins + " times");
console.log(numBattles + " battles took " + (t1-t0) + " milliseconds");
console.log("average battle length: " + ((t1-t0)/numBattles) + " milliseconds");


//Helper.writeLog();


//console.log(Object.getOwnPropertyNames(battle));
