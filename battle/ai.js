const Validator = require('./team-validator');
const TV = new Validator('vgc2018');

class Ai {
    constructor(name, side, team) {
        this.name = name;
        this.team = team;
        this.side = side;
        
        console.log('Team Errors: ' + TV.validateTeam(this.team));


        this.wins = 0;
    }
    decide(state) {
        //console.error('Please use an actual bot: auto choosing');
        return 'default';
    }
}

module.exports = Ai;
