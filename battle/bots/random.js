const Ai = require('./../ai');

class Randumb extends Ai {
    constructor(name, side) {
        super(name, side);
    }
    decide(state) {
        if (state[this.side].currentRequest === 'teampreview') {
            // our pokemon died or it is just team peview
            // either way, choose a random one
            const slots = [1, 2, 3, 4, 5, 6];
            const team = [];

            team.push(slots.splice(Math.floor(Math.random() * slots.length), 1));
            team.push(slots.splice(Math.floor(Math.random() * slots.length), 1));
            team.push(slots.splice(Math.floor(Math.random() * slots.length), 1));
            team.push(slots.splice(Math.floor(Math.random() * slots.length), 1));
            //console.log(team);

            //above code was broken or somehting
            //console.log('team ' + team[0] + team[1] + team[2] + team[3]);
            return 'team ' + team[0] + team[1] + team[2] + team[3];


        }

        if (state[this.side].currentRequest === 'switch') {
            const slots = [1, 2, 3, 4];
        }

        if (state[this.side].currentRequest === 'move') {

            // pick a random move but handle what target the simulator expects
            let loc = ['', ''];
            let move = [null, null];
            let decision = '';
            for (let i = 0; i<state[this.side].active.length; i++) {
                if (state[this.side].active[i].fainted === false) {

                    move[i] = Math.ceil(Math.random() * 4);
                    if (state[this.side].active[i].moveset[move[i]-1].target === 'normal') {
                        loc[i] = ' ' + Math.ceil(Math.random() * 2);
                        //console.log(state[this.side].active[i].moveset[move[i]-1].id);

                    } else if (state[this.side].active[i].moveset[move[i]-1].target === 'adjacentAlly') { 
                        loc[i] = (i === 0) ? ' ' + -2 : ' ' + -1;
                    } else if (state[this.side].active[i].moveset[move[i]-1].target === 'self') {
                        loc[i] = '';
                    } else if (state[this.side].active[i].moveset[move[i]-1].target === 'allAdjacentFoes') {
                        loc[i] = '';
                    } else if (state[this.side].active[i].moveset[move[i]-1].target === 'allySide') {
                        loc[i] = '';
                    } else {
                        return 'default';
                    }

                    decision = decision + 'move ' + state[this.side].active[i].moves[move[i]-1] + '' + loc[i]; 
                    if (i === 0 && state[this.side].active[1].fainted === false) {
                        decision = decision + ',';
                    }
                }
            }
                
                /*
                console.log(state[this.side].active[0].moveset[move[0]-1].target);
                console.log(state[this.side].active[1].moveset[move[1]-1].target);

                */
                //console.log(state[this.side].active[0].id +  ' move ' + state[this.side].active[0].moves[move[0]-1] + '' + loc[0] + ', ' + state[this.side].active[1].id +  ' move ' + state[this.side].active[1].moves[move[1]-1] + '' + loc[1]) ;
                //console.log(decision);
            //return 'move ' + move[0] + '' + loc[0] + ' , move ' + move[1] + '' + loc[1];
                return decision;
        }
        

        //should never get here
        //but maybe it does, for example if the request is blank
        return 'default';
    }
}

module.exports = Randumb;
