const fs = require('fs');
const data = require('./data/vgc');
const pokemonList = [];
const totalusage = 150479;
for (let i = 0; i<data.length; i++) {
    let pokemon = {};
    pokemon.count = 0;
    pokemon.id = data[i][0];
    pokemon.name = data[i][1];
    let type1 = data[i][2];
    let type2 = data[i][3];
    pokemon.types = [type1, type2];
    pokemon.usage = Math.round(parseInt(data[i][data[i].length - 1]) / totalusage * 600000) / 100000;

    pokemon.items = {};
    let carryindex = 4;
    for (let j = 0; j<20; j++) { //each pokemon has 20 items listed
        if (data[i][carryindex+(j*2)] !== 'null')
        pokemon.items[data[i][carryindex+(j*2)].toLowerCase().replace(' ', '')] = parseFloat(data[i][carryindex+1+(j*2)]) / 100.0;
    }
    carryindex = 44;

    pokemon.moves = {};
    for (let j = 0; j<20; j++) { //each pokemon has 20 moves listed
        if (data[i][carryindex+(j*2)] !== 'null')
        pokemon.moves[data[i][carryindex+(j*2)].toLowerCase().replace(' ', '').replace('-', '')] = parseFloat(data[i][carryindex+1+(j*2)]) / 100.0;
    }
    carryindex = 84;

    pokemon.abilities = {};
    for (let j = 0; j<3; j++) { //each pokemon has 3 abilities listed
        if (data[i][carryindex+(j*2)] !== 'null')
        pokemon.abilities[data[i][carryindex+(j*2)].toLowerCase().replace(' ', '')] = parseFloat(data[i][carryindex+1+(j*2)]) / 100.0;
    }
    carryindex = 90;

    pokemon.natures = {};
    for (let j = 0; j<20; j++) { //each pokemon has 20 natures listed
        if (data[i][carryindex+(j*2)] !== 'null')
        pokemon.natures[data[i][carryindex+(j*2)].toLowerCase().replace(' ', '')] = parseFloat(data[i][carryindex+1+(j*2)]) / 100.0;
    }
    carryindex = 130;

    pokemon.movesWhenVictorious = {};
    for (let j = 0; j<20; j++) { //each pokemon has 20 moves when victorious whatever that means
        if (data[i][carryindex+(j*2)] !== 'null')
        pokemon.movesWhenVictorious[data[i][carryindex+(j*2)].toLowerCase().replace(' ', '').replace('-', '')] = parseFloat(data[i][carryindex+1+(j*2)]) / 100.0;
    }
    carryindex = 170;

    pokemon.opponentsWhenVictorious = [];
    for (let j = 0; j<20; j++) { //each pokemon has 20 opponent pokemon when victorious. ordered?
        if (data[i][carryindex+(j*2)] !== 'null')
        pokemon.opponentsWhenVictorious.push(data[i][carryindex+(j)]);
    }
    carryindex = 190;

    pokemon.movesWhenDefeated = {};
    for (let j = 0; j<20; j++) { //each pokemon has 20 moves when defeated
        if (data[i][carryindex+(j*2)] !== 'null')
        pokemon.movesWhenDefeated[data[i][carryindex+(j*2)].toLowerCase().replace(' ', '').replace('-', '')] = parseFloat(data[i][carryindex+1+(j*2)]) / 100.0;
    }
    carryindex = 230;
    
    pokemon.opponentsWhenDefeated = [];
    for (let j = 0; j<20; j++) { //each pokemon has 20 pokemon when defeated ordered?
        if (data[i][carryindex+(j*2)] !== 'null')
        pokemon.opponentsWhenDefeated.push(data[i][carryindex+(j)]);
    }
    carryindex = 250;

    pokemon.teammates = [];
    for (let j = 0; j<20; j++) { //each pokemon has 20 teammates assumingly orderd somehow
        if (data[i][carryindex+(j*2)] !== 'null')
        pokemon.teammates.push(data[i][carryindex+(j)]);
    }
    carryindex = 270;
    
    pokemon.battles = data[i][carryindex];

    pokemonList.push(pokemon);
}

fs.writeFile("./data/vgcreformated.json", JSON.stringify(pokemonList, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
    console.log("please remove apostrophe from aegisslashes move 'kingsshield'");
});
