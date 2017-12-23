'use strict';

//set up python bot loading
const spawn = require('child_process').spawn;
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

//IMPORTS
const format = 'vgc2018';
const Sim = require('./sim');
const Dex = require('./sim/dex');
const Ai = require('./ai');
const Random = require('./bots/random');
const Helper = require('./helper');
const fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const team = Helper.importTeam(require("./teams/ludicolo.txt"));
const team1 = Helper.importTeam(require("./teams/johtoxalola.txt"));

const me = new Random('me', 'p1', team);
const you = new Random('you', 'p2',team1);


//JOIN THE BATTLE

for (let i = 0; i<1; i++) {
    console.log("battle number " + (i+1));

    const battle = Sim.construct(format);

    battle.join(null,me.name, null, me.team);
    battle.join(null,you.name, null, you.team);
        //console.log(battle.dataOnly().p1.pokemon[0].moveset);

    //console.log(Object.getOwnPropertyNames(battle.p1));

    //const state =Helper.getState(battle);

    //THE BATTLE
    //while (!battle.ended) {
        pybot.stdin.write(JSON.stringify(battle.dataOnly()));
        if (move) {
            battle.choose('p1', move);
            console.log(move);
            move = null;
            battle.choose('p2', you.decide(battle.dataOnly()));
        }
        pybot.stdin.end();
        Helper.log(battle, me, you);


    //}


}

console.log("me won " + me.wins + " times");
console.log("you won " + you.wins + " times");


//Helper.writeLog();


//console.log(Object.getOwnPropertyNames(battle));
