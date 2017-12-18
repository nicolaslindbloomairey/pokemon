//HELPER METHODS
const Tools = require('./sim/dex');

var BattleStatIDs = {
	HP: 'hp',
	hp: 'hp',
	Atk: 'atk',
	atk: 'atk',
	Def: 'def',
	def: 'def',
	SpA: 'spa',
	SAtk: 'spa',
	SpAtk: 'spa',
	spa: 'spa',
	SpD: 'spd',
	SDef: 'spd',
	SpDef: 'spd',
	spd: 'spd',
	Spe: 'spe',
	Spd: 'spe',
	spe: 'spe'
};

var BattleTypeChart ={
  "Bug": {
    "damageTaken": {
      "Bug": 0,
      "Dark": 0,
      "Dragon": 0,
      "Electric": 0,
      "Fairy": 0,
      "Fighting": 2,
      "Fire": 1,
      "Flying": 1,
      "Ghost": 0,
      "Grass": 2,
      "Ground": 2,
      "Ice": 0,
      "Normal": 0,
      "Poison": 0,
      "Psychic": 0,
      "Rock": 1,
      "Steel": 0,
      "Water": 0
    },
    "HPivs": {
      "atk": 30,
      "def": 30,
      "spd": 30
    },
    "HPdvs": {
      "atk": 13,
      "def": 13
    }
  },
  "Dark": {
    "damageTaken": {
      "prankster": 3,
      "Bug": 1,
      "Dark": 2,
      "Dragon": 0,
      "Electric": 0,
      "Fairy": 1,
      "Fighting": 1,
      "Fire": 0,
      "Flying": 0,
      "Ghost": 2,
      "Grass": 0,
      "Ground": 0,
      "Ice": 0,
      "Normal": 0,
      "Poison": 0,
      "Psychic": 3,
      "Rock": 0,
      "Steel": 0,
      "Water": 0
    },
    "HPivs": {}
  },
  "Dragon": {
    "damageTaken": {
      "Bug": 0,
      "Dark": 0,
      "Dragon": 1,
      "Electric": 2,
      "Fairy": 1,
      "Fighting": 0,
      "Fire": 2,
      "Flying": 0,
      "Ghost": 0,
      "Grass": 2,
      "Ground": 0,
      "Ice": 1,
      "Normal": 0,
      "Poison": 0,
      "Psychic": 0,
      "Rock": 0,
      "Steel": 0,
      "Water": 2
    },
    "HPivs": {
      "atk": 30
    },
    "HPdvs": {
      "def": 14
    }
  },
  "Electric": {
    "damageTaken": {
      "par": 3,
      "Bug": 0,
      "Dark": 0,
      "Dragon": 0,
      "Electric": 2,
      "Fairy": 0,
      "Fighting": 0,
      "Fire": 0,
      "Flying": 2,
      "Ghost": 0,
      "Grass": 0,
      "Ground": 1,
      "Ice": 0,
      "Normal": 0,
      "Poison": 0,
      "Psychic": 0,
      "Rock": 0,
      "Steel": 2,
      "Water": 0
    },
    "HPivs": {
      "spa": 30
    },
    "HPdvs": {
      "atk": 14
    }
  },
  "Fairy": {
    "damageTaken": {
      "Bug": 2,
      "Dark": 2,
      "Dragon": 3,
      "Electric": 0,
      "Fairy": 0,
      "Fighting": 2,
      "Fire": 0,
      "Flying": 0,
      "Ghost": 0,
      "Grass": 0,
      "Ground": 0,
      "Ice": 0,
      "Normal": 0,
      "Poison": 1,
      "Psychic": 0,
      "Rock": 0,
      "Steel": 1,
      "Water": 0
    }
  },
  "Fighting": {
    "damageTaken": {
      "Bug": 2,
      "Dark": 2,
      "Dragon": 0,
      "Electric": 0,
      "Fairy": 1,
      "Fighting": 0,
      "Fire": 0,
      "Flying": 1,
      "Ghost": 0,
      "Grass": 0,
      "Ground": 0,
      "Ice": 0,
      "Normal": 0,
      "Poison": 0,
      "Psychic": 1,
      "Rock": 2,
      "Steel": 0,
      "Water": 0
    },
    "HPivs": {
      "def": 30,
      "spa": 30,
      "spd": 30,
      "spe": 30
    },
    "HPdvs": {
      "atk": 12,
      "def": 12
    }
  },
  "Fire": {
    "damageTaken": {
      "brn": 3,
      "Bug": 2,
      "Dark": 0,
      "Dragon": 0,
      "Electric": 0,
      "Fairy": 2,
      "Fighting": 0,
      "Fire": 2,
      "Flying": 0,
      "Ghost": 0,
      "Grass": 2,
      "Ground": 1,
      "Ice": 2,
      "Normal": 0,
      "Poison": 0,
      "Psychic": 0,
      "Rock": 1,
      "Steel": 2,
      "Water": 1
    },
    "HPivs": {
      "atk": 30,
      "spa": 30,
      "spe": 30
    },
    "HPdvs": {
      "atk": 14,
      "def": 12
    }
  },
  "Flying": {
    "damageTaken": {
      "Bug": 2,
      "Dark": 0,
      "Dragon": 0,
      "Electric": 1,
      "Fairy": 0,
      "Fighting": 2,
      "Fire": 0,
      "Flying": 0,
      "Ghost": 0,
      "Grass": 2,
      "Ground": 3,
      "Ice": 1,
      "Normal": 0,
      "Poison": 0,
      "Psychic": 0,
      "Rock": 1,
      "Steel": 0,
      "Water": 0
    },
    "HPivs": {
      "hp": 30,
      "atk": 30,
      "def": 30,
      "spa": 30,
      "spd": 30
    },
    "HPdvs": {
      "atk": 12,
      "def": 13
    }
  },
  "Ghost": {
    "damageTaken": {
      "trapped": 3,
      "Bug": 2,
      "Dark": 1,
      "Dragon": 0,
      "Electric": 0,
      "Fairy": 0,
      "Fighting": 3,
      "Fire": 0,
      "Flying": 0,
      "Ghost": 1,
      "Grass": 0,
      "Ground": 0,
      "Ice": 0,
      "Normal": 3,
      "Poison": 2,
      "Psychic": 0,
      "Rock": 0,
      "Steel": 0,
      "Water": 0
    },
    "HPivs": {
      "def": 30,
      "spd": 30
    },
    "HPdvs": {
      "atk": 13,
      "def": 14
    }
  },
  "Grass": {
    "damageTaken": {
      "powder": 3,
      "Bug": 1,
      "Dark": 0,
      "Dragon": 0,
      "Electric": 2,
      "Fairy": 0,
      "Fighting": 0,
      "Fire": 1,
      "Flying": 1,
      "Ghost": 0,
      "Grass": 2,
      "Ground": 2,
      "Ice": 1,
      "Normal": 0,
      "Poison": 1,
      "Psychic": 0,
      "Rock": 0,
      "Steel": 0,
      "Water": 2
    },
    "HPivs": {
      "atk": 30,
      "spa": 30
    },
    "HPdvs": {
      "atk": 14,
      "def": 14
    }
  },
  "Ground": {
    "damageTaken": {
      "sandstorm": 3,
      "Bug": 0,
      "Dark": 0,
      "Dragon": 0,
      "Electric": 3,
      "Fairy": 0,
      "Fighting": 0,
      "Fire": 0,
      "Flying": 0,
      "Ghost": 0,
      "Grass": 1,
      "Ground": 0,
      "Ice": 1,
      "Normal": 0,
      "Poison": 2,
      "Psychic": 0,
      "Rock": 2,
      "Steel": 0,
      "Water": 1
    },
    "HPivs": {
      "spa": 30,
      "spd": 30
    },
    "HPdvs": {
      "atk": 12
    }
  },
  "Ice": {
    "damageTaken": {
      "hail": 3,
      "frz": 3,
      "Bug": 0,
      "Dark": 0,
      "Dragon": 0,
      "Electric": 0,
      "Fairy": 0,
      "Fighting": 1,
      "Fire": 1,
      "Flying": 0,
      "Ghost": 0,
      "Grass": 0,
      "Ground": 0,
      "Ice": 2,
      "Normal": 0,
      "Poison": 0,
      "Psychic": 0,
      "Rock": 1,
      "Steel": 1,
      "Water": 0
    },
    "HPivs": {
      "atk": 30,
      "def": 30
    },
    "HPdvs": {
      "def": 13
    }
  },
  "Normal": {
    "damageTaken": {
      "Bug": 0,
      "Dark": 0,
      "Dragon": 0,
      "Electric": 0,
      "Fairy": 0,
      "Fighting": 1,
      "Fire": 0,
      "Flying": 0,
      "Ghost": 3,
      "Grass": 0,
      "Ground": 0,
      "Ice": 0,
      "Normal": 0,
      "Poison": 0,
      "Psychic": 0,
      "Rock": 0,
      "Steel": 0,
      "Water": 0
    }
  },
  "Poison": {
    "damageTaken": {
      "psn": 3,
      "tox": 3,
      "Bug": 2,
      "Dark": 0,
      "Dragon": 0,
      "Electric": 0,
      "Fairy": 2,
      "Fighting": 2,
      "Fire": 0,
      "Flying": 0,
      "Ghost": 0,
      "Grass": 2,
      "Ground": 1,
      "Ice": 0,
      "Normal": 0,
      "Poison": 2,
      "Psychic": 1,
      "Rock": 0,
      "Steel": 0,
      "Water": 0
    },
    "HPivs": {
      "def": 30,
      "spa": 30,
      "spd": 30
    },
    "HPdvs": {
      "atk": 12,
      "def": 14
    }
  },
  "Psychic": {
    "damageTaken": {
      "Bug": 1,
      "Dark": 1,
      "Dragon": 0,
      "Electric": 0,
      "Fairy": 0,
      "Fighting": 2,
      "Fire": 0,
      "Flying": 0,
      "Ghost": 1,
      "Grass": 0,
      "Ground": 0,
      "Ice": 0,
      "Normal": 0,
      "Poison": 0,
      "Psychic": 2,
      "Rock": 0,
      "Steel": 0,
      "Water": 0
    },
    "HPivs": {
      "atk": 30,
      "spe": 30
    },
    "HPdvs": {
      "def": 12
    }
  },
  "Rock": {
    "damageTaken": {
      "sandstorm": 3,
      "Bug": 0,
      "Dark": 0,
      "Dragon": 0,
      "Electric": 0,
      "Fairy": 0,
      "Fighting": 1,
      "Fire": 2,
      "Flying": 2,
      "Ghost": 0,
      "Grass": 1,
      "Ground": 1,
      "Ice": 0,
      "Normal": 2,
      "Poison": 2,
      "Psychic": 0,
      "Rock": 0,
      "Steel": 1,
      "Water": 1
    },
    "HPivs": {
      "def": 30,
      "spd": 30,
      "spe": 30
    },
    "HPdvs": {
      "atk": 13,
      "def": 12
    }
  },
  "Steel": {
    "damageTaken": {
      "psn": 3,
      "tox": 3,
      "sandstorm": 3,
      "Bug": 2,
      "Dark": 0,
      "Dragon": 2,
      "Electric": 0,
      "Fairy": 2,
      "Fighting": 1,
      "Fire": 1,
      "Flying": 2,
      "Ghost": 0,
      "Grass": 2,
      "Ground": 1,
      "Ice": 2,
      "Normal": 2,
      "Poison": 3,
      "Psychic": 2,
      "Rock": 2,
      "Steel": 2,
      "Water": 0
    },
    "HPivs": {
      "spd": 30
    },
    "HPdvs": {
      "atk": 13
    }
  },
  "Water": {
    "damageTaken": {
      "Bug": 0,
      "Dark": 0,
      "Dragon": 0,
      "Electric": 1,
      "Fairy": 0,
      "Fighting": 0,
      "Fire": 2,
      "Flying": 0,
      "Ghost": 0,
      "Grass": 1,
      "Ground": 0,
      "Ice": 2,
      "Normal": 0,
      "Poison": 0,
      "Psychic": 0,
      "Rock": 0,
      "Steel": 2,
      "Water": 2
    },
    "HPivs": {
      "atk": 30,
      "def": 30,
      "spa": 30
    },
    "HPdvs": {
      "atk": 14,
      "def": 13
    }
  }
}; 

function importTeam(text, teams) {
    var text = text.split("\n");
    var team = [];
    var curSet = null;
    if (teams === true) {
        Storage.teams = [];
        teams = Storage.teams;
    } else if (text.length === 1 || (text.length === 2 && !text[1])) {
        return Storage.unpackTeam(text[0]);
    }
    for (var i = 0; i < text.length; i++) {
        var line = text[i].trim();
        if (line === '' || line === '---') {
            curSet = null;
        } else if (line.substr(0, 3) === '===' && teams) {
            team = [];
            line = line.substr(3, line.length - 6).trim();
            var format = 'gen7';
            var bracketIndex = line.indexOf(']');
            if (bracketIndex >= 0) {
                format = line.substr(1, bracketIndex - 1);
                if (format && format.slice(0, 3) !== 'gen') format = 'gen6' + format;
                line = $.trim(line.substr(bracketIndex + 1));
            }
            if (teams.length) {
                teams[teams.length - 1].team = Storage.packTeam(teams[teams.length - 1].team);
            }
            var slashIndex = line.lastIndexOf('/');
            var folder = '';
            if (slashIndex > 0) {
                folder = line.slice(0, slashIndex);
                line = line.slice(slashIndex + 1);
            }
            teams.push({
                name: line,
                format: format,
                team: team,
                folder: folder,
                iconCache: ''
            });
        } else if (!curSet) {
            curSet = {name: '', species: '', gender: ''};
            team.push(curSet);
            var atIndex = line.lastIndexOf(' @ ');
            if (atIndex !== -1) {
                curSet.item = line.substr(atIndex + 3);
                if (toId(curSet.item) === 'noitem') curSet.item = '';
                line = line.substr(0, atIndex);
            }
            if (line.substr(line.length - 4) === ' (M)') {
                curSet.gender = 'M';
                line = line.substr(0, line.length - 4);
            }
            if (line.substr(line.length - 4) === ' (F)') {
                curSet.gender = 'F';
                line = line.substr(0, line.length - 4);
            }
            var parenIndex = line.lastIndexOf(' (');
            if (line.substr(line.length - 1) === ')' && parenIndex !== -1) {
                line = line.substr(0, line.length - 1);
                curSet.species = Tools.getTemplate(line.substr(parenIndex + 2)).species;
                line = line.substr(0, parenIndex);
                curSet.name = line;
            } else {
                curSet.species = Tools.getTemplate(line).species;
                curSet.name = '';
            }
        } else if (line.substr(0, 7) === 'Trait: ') {
            line = line.substr(7);
            curSet.ability = line;
        } else if (line.substr(0, 9) === 'Ability: ') {
            line = line.substr(9);
            curSet.ability = line;
        } else if (line === 'Shiny: Yes') {
            curSet.shiny = true;
        } else if (line.substr(0, 7) === 'Level: ') {
            line = line.substr(7);
            curSet.level = +line;
        } else if (line.substr(0, 11) === 'Happiness: ') {
            line = line.substr(11);
            curSet.happiness = +line;
        } else if (line.substr(0, 5) === 'EVs: ') {
            line = line.substr(5);
            var evLines = line.split('/');
            curSet.evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
            for (var j = 0; j < evLines.length; j++) {
                var evLine = evLines[j].trim();
                var spaceIndex = evLine.indexOf(' ');
                if (spaceIndex === -1) continue;
                var statid = BattleStatIDs[evLine.substr(spaceIndex + 1)];
                var statval = parseInt(evLine.substr(0, spaceIndex), 10);
                if (!statid) continue;
                curSet.evs[statid] = statval;
            }
        } else if (line.substr(0, 5) === 'IVs: ') {
            line = line.substr(5);
            var ivLines = line.split(' / ');
            curSet.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
            for (var j = 0; j < ivLines.length; j++) {
                var ivLine = ivLines[j];
                var spaceIndex = ivLine.indexOf(' ');
                if (spaceIndex === -1) continue;
                var statid = BattleStatIDs[ivLine.substr(spaceIndex + 1)];
                var statval = parseInt(ivLine.substr(0, spaceIndex), 10);
                if (!statid) continue;
                if (isNaN(statval)) statval = 31;
                curSet.ivs[statid] = statval;
            }
        } else if (line.match(/^[A-Za-z]+ (N|n)ature/)) {
            var natureIndex = line.indexOf(' Nature');
            if (natureIndex === -1) natureIndex = line.indexOf(' nature');
            if (natureIndex === -1) continue;
            line = line.substr(0, natureIndex);
            if (line !== 'undefined') curSet.nature = line;
        } else if (line.substr(0, 1) === '-' || line.substr(0, 1) === '~') {
            line = line.substr(1);
            if (line.substr(0, 1) === ' ') line = line.substr(1);
            if (!curSet.moves) curSet.moves = [];
            if (line.substr(0, 14) === 'Hidden Power [') {
                var hptype = line.substr(14, line.length - 15);
                line = 'Hidden Power ' + hptype;
                if (!curSet.ivs && BattleTypeChart) {
                    curSet.ivs = {};
                    for (var stat in BattleTypeChart[hptype].HPivs) {
                        curSet.ivs[stat] = BattleTypeChart[hptype].HPivs[stat];
                    }
                }
            }
            if (line === 'Frustration') {
                curSet.happiness = 0;
            }
            curSet.moves.push(line);
        }
    }
    if (teams && teams.length) {
        teams[teams.length - 1].team = Storage.packTeam(teams[teams.length - 1].team);
    }
    return team;
}

function log(battle, me, you) {
    /*
    console.log("\nTurn: " + battle.turn); 
    console.log("p1 request: " + battle.p1.pokemonLeft);
    console.log("p2 request: " + battle.p2.pokemonLeft);
    */
    if (battle.ended) {
        if (battle.winner === me.name) me.wins++;
        if (battle.winner === you.name) you.wins++;

    }
}

function writeLog(battle) {
    var fs = require('fs');

    var file = fs.createWriteStream('array.txt');
    file.on('error', function(err) { /* error handling */ });
    for (let val of battle.log) {
        file.write(val + "\n");
    }
    file.end();
}

module.exports.log = log;
module.exports.writeLog = writeLog;
module.exports.importTeam = importTeam;
