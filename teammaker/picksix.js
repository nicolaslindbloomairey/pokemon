'use-strict';
const data = require('./data/vgcreformated');
const pokemon = [];
/*
    ALERT, THIS IS NOT HOW THE MATH WORKS OUT
    USING THIS METHOD PRACTICALLY MEANS THAT METAGROSS IS NEVER PICKED
    EVEN THOUGH IT IS USED IN 14% OF MATCHES
*/
while(pokemon.length<6) {
    let rand = Math.random();
    let tally = 0; 
    for (let p = 0; p<data.length; p++) {
        if (rand >= tally && rand < tally + data[p].usage && !pokemon.includes(data[p].name)) {
            pokemon.push(data[p].name);
            break;
        }
        if (!pokemon.includes(data[p].name))
        tally += data[p].usage;
    }
}

console.log(pokemon);
