'use strict';

const format = 'vgc2018';

//IMPORTS
const Sim = require('./sim');
const Dex = require('./sim/dex');
const Ai = require('./ai');
const Helper = require('./helper');
const fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const team = Helper.importTeam(require("./teams/ludicolo.txt"));
const team1 = Helper.importTeam(require("./teams/johtoxalola.txt"));

const me = new Ai('me', team);
const you = new Ai('you', team1);


//JOIN THE BATTLE

//for (let i = 0; i<50; i++) {
    //console.log("battle number " + (i+1));

    const battle = Sim.construct(format);

    battle.join(null,me.name, null, me.team);
    battle.join(null,you.name, null, you.team);


    const state = { //will be used for what the bots are allowd to use
    };

    //THE BATTLE
    while (!battle.ended) {
        battle.choose('p1', me.decide(battle));
        battle.choose('p2', you.decide(battle));
        Helper.log(battle, me, you);

    }


//}

console.log("me won " + me.wins + " times");
console.log("you won " + you.wins + " times");


//Helper.writeLog();


//console.log(Object.getOwnPropertyNames(battle));
