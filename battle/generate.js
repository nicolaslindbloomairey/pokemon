const generateTeam = require('../teammaker/picksix');
const t0 = new Date().getTime();
const numTeams = 100000;
for (let i = 0; i<numTeams; i++) {
	console.log("team num " + i);
	const team = generateTeam();
	console.log("generate successful");
	//console.log(team);

}
const t1 = new Date().getTime();
console.log("average generation length: " + ((t1-t0)/numTeams) + " milliseconds");
