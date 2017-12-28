'use strict';

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

/* READING IN PRESET TEAM
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const team = Helper.importTeam(require("./teams/ludicolo.txt"));
*/

//create the two AIs
const p1 = new Random('nick', 'p1');
const p2 = new Random('sam', 'p2');


//JOIN THE BATTLE

const numBattles = 100;
const t0 = new Date().getTime(); //get the time so we can see time the battles take
for (let i = 0; i<numBattles; i++) {

    const battle = Sim.construct(format);
    console.log("battle number " + (i+1));

    const team = generateTeam();
    const team1 = generateTeam();
    /*
    console.log(team);
    console.log(team1);
    console.log('Team Errors: ' + new Validator('vgc2018').validateTeam(team));
    console.log('Team Errors: ' + new Validator('vgc2018').validateTeam(team1));
    */

    battle.join(null,p1.name, null, team);
    battle.join(null,p2.name, null, team1);

    //THE BATTLE
    while (!battle.ended) {
        battle.choose('p1', p1.decide(battle.dataOnly()));
        battle.choose('p2', p2.decide(battle.dataOnly()));

        Helper.log(battle, p1, p2);
    }
    battle.destroy();


}
const t1 = new Date().getTime();

console.log(p1.name + " won " + p2.wins + " times");
console.log(p1.name + " won " + p2.wins + " times");
console.log(numBattles + " battles took " + (t1-t0) + " milliseconds");
console.log("average battle length: " + ((t1-t0)/numBattles) + " milliseconds");

