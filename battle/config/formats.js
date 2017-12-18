'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js
// I cut out everything that i dont use, old gens are useless for this bot, can always add them back from the pokemon-showdown git repo

exports.Formats = [

    //USUM DOUBLES
    ///////////////////////////////////////////////////////////////////
	{
		name: "[Gen 7] VGC 2018",
		desc: [
            "Official competitive format for 2018"
		],

		mod: 'gen7',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		timer: {starting: 5 * 60 - 10, perTurn: 10, maxPerTurn: 45, maxFirstTurn: 90, timeoutAutoChoose: true},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased', 'Mewtwo', 'Mew', 'Lugia', 'Ho-oh', 'Celebi', 'Kyogre', 'Groundon', 'Rayquaza', 'Jirachi', 'Deoxys', 'Dialga', 'Palkia', 'Giratina', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus', 'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect', 'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion', 'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zeraora', 'Battle Bond'],
	}
];
