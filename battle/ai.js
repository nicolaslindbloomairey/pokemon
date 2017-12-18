const Validator = require('./team-validator');
const TV = new Validator('vgc2018');

class Ai {
    constructor(name, team) {
        //this.format = format;
        this.name = name;
        //this.team = teams[team];
        this.team = team;
        //console.log(this.team);
        
        console.log('Team Errors: ' + TV.validateTeam(this.team));


        this.wins = 0;
    }
    decide(state) {
        console.log(state);
        switch (state.currentRequest) {
        case 'teampreview':
            return 'default'; //pick team in the same order as they started (it will default to '123456')

        case 'move':
            //let loc = Math.ceil(Math.random() * 2)
            //return 'move 1 ' + loc + ', move 1 ' + loc; //autochoose
            return 'default';

        case 'switch':
            return 'default'; //autochoose
        default:
            return 'default';
        }
        /*
        return 'default';
        */
    }
}

module.exports = Ai;
