'use-strict';
const data = require('./data/vgcreformated');
const dict = require('./data/dict');
/*
    ALERT, THIS IS NOT HOW THE MATH WORKS OUT
    USING THIS METHOD PRACTICALLY MEANS THAT METAGROSS IS NEVER PICKED
    EVEN THOUGH IT IS USED IN 14% OF MATCHES
const test = [];
const num = 1;
for (let i = 0; i<num; i++) {
*/

const generate = function() {

    const team = [];
    const species = [];
    const items = [];

    //until there are 6 pokemon on the team
    let counter = 0;
    while(team.length<6) {
	counter += 1;
	//console.log(counter);

        let rand = Math.random();
        let randtally = 0; 
        const pokemon = {};
        pokemon.name = '';
	pokemon.species = '';
	pokemon.gender = '';
	pokemon.level = 50;
        pokemon.moves = [];
        //go through the whole list until you get to the pokemon that matches the random number chosen
        for (let p = 0; p<data.length; p++) {
	    //console.log(randtally);
	    const name = dict[data[p].id];
            if (rand >= randtally && rand < randtally + (data[p].usage/6.0) && !species.includes(name)) {

                //pokemon has been chosen = data[p]
		//console.log(name + " chosen");
                pokemon.species = name;
                species.push(pokemon.species);

                //chose moves for our pokemon
                while (pokemon.moves.length<4) {
                        
                    let moveRand = Math.random();
                    let moveRandTally = 0;
                    for (const move in data[p].moves) {
                        if (moveRand >= moveRandTally && moveRand < moveRandTally + (data[p].moves[move]/4.0) && !pokemon.moves.includes(move)) {
                            pokemon.moves.push(move);
                            break;
                        }

                        if (!pokemon.moves.includes(move))
                        moveRandTally += data[p].moves[move];

                    }
                }
		//console.log(pokemon.moves + " chosen");


                //choose item for our pokemon
                /*
                ** ALERT, THIS ITEM PICKING CODE DOES NOT ADHERE TO THE ITEM CLAUSE
                ** IT NEEDS TO BE CHANGED
                ** IT CHECKS FOR ITEM CLAUSE NOW, BUT NOT TWO MEGASTONES
                ** WHICH IS ALLOWED ANYWAY.
                */
                //while (!pokemon.item) {

                    let itemRand = Math.random();
                    let itemRandTally = 0;
                    for (const item in data[p].items) {
			    //console.log("itemTally: " + itemRandTally);
                            if (itemRand >= itemRandTally && itemRand < itemRandTally + (data[p].items[item]) && !items.includes(item)) {
                                pokemon.item = item;
                                items.push(pokemon.item);
                                break;
                            }
                            itemRandTally += data[p].items[item];
                    }
		    pokemon.item = '';

                //}
		//console.log(pokemon.item + " chosen");

                let abilityRand = Math.random();
                let abilityRandTally = 0;
                for (const ability in data[p].abilities) {
                        if (abilityRand >= abilityRandTally && abilityRand < abilityRandTally + (data[p].abilities[ability])) {
                            pokemon.ability = ability;
                            break;
                        }
                        abilityRandTally += data[p].abilities[ability];
                }
		//console.log(pokemon.ability + " chosen");

                let natureRand = Math.random();
                let natureRandTally = 0;
                for (const nature in data[p].natures) {
                        if (natureRand >= natureRandTally && natureRand < natureRandTally + (data[p].natures[nature])) {
                            pokemon.nature = nature;
                            break;
                        }
                        natureRandTally += data[p].natures[nature];
                }
		//console.log(pokemon.ability + " chosen");

		//EVS
		const divs = [];
		for (let i = 0; i<5; i++) {
			divs.push(Math.floor((Math.random() *128)));
			divs.sort(function(a, b) {
				return a-b;
			});
		}	
		const evs = {
			"hp": (4*(divs[0]-0)> 252) ? 252 : 4*(divs[0]-0),
			"atk": (4*(divs[1]-divs[0])> 252) ? 252 : 4*(divs[1]-divs[0]),
			"def": (4*(divs[2]-divs[1])> 252) ? 252 : 4*(divs[2]-divs[1]),
			"spa": (4*(divs[3]-divs[2])> 252) ? 252 : 4*(divs[3]-divs[2]),
			"spd": (4*(divs[4]-divs[3])> 252) ? 252 : 4*(divs[4]-divs[3]),
			"spe": (4*(127-divs[4])> 252) ? 252 : 4*(127-divs[4]),
		};
		pokemon.evs = evs;

                team.push(pokemon);

                //data[p].count++; //for testing how close our method of choosing is to the actual stats

                //break so we dont go through the whole pokemon list
                break;
            }
            if (!team.includes(data[p].name))
            randtally += data[p].usage/6.0;
        }
    }
    
    return team;
    //console.log(team);
}

/*
let diffcounter = 0.0;

for (let i = 0; i<data.length; i++) {
    if (data[i].count !== 0) {
        console.log(data[i].name + ' ' + data[i].count / (num) + ' ' + data[i].usage);
    }
    diffcounter += Math.pow((100*data[i].usage) - (100*(data[i].count/num)), 2);
}

console.log('RMSE = ' + Math.pow(diffcounter/data.length, 0.5));
*/

module.exports = generate;

