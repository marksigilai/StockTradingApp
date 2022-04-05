export default class Databattle {
    constructor(scene) {
        this.grid = [[]];
        for(var i=0; i<12; i++) {
            this.grid[i] = [];
            for(var j=0; j<12; j++) {
                this.grid[i][j] = {
                    cell: null,
                }
            }
        }

        // add grid to scene somehow to make it look like game
    }

    
}