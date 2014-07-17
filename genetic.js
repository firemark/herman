function Genetic(mach){

    this.machines = mach;
    this.pairMachines = [];
    this.numPairs = mach.length / 4;

    this.selection = function(){
        this.machines.sort(function(a, b){return a.score - b.score;});

        console.log("Scores:");
        for(var i=0; i < numMachines; i++)
            console.log("Machine[" + i + "]: " + machines[i].score);

        console.log('-----');
        
        for(var i=0; i < this.numPairs; i++){
            var pair = [this.machines.pop(), this.machines.pop()];
            this.pairMachines.push(pair);
        }
    };

    this.crossover = function(){
        var numSymbols = symbols.length;
        for(var p=0; p < this.numPairs; p++){
            var parents = this.pairMachines.pop(),
                first_child = new Machine(),
                last_child = new Machine();

            console.log('parent[0]: ' + parents[0].score);
            console.log('parent[1]: ' + parents[1].score);

            for(var s=0; s < numSymbols; s++)
                for(var i=0; i < numStates; i++){
                    var id_parent = randomInt(0, 1);
                    first_child.finiteTable[s][i] = parents[id_parent].finiteTable[s][i];
                    last_child.finiteTable[s][i] = parents[1 - id_parent].finiteTable[s][i];
                }

            this.machines.push(first_child);
            this.machines.push(last_child);
        }
    }  
};