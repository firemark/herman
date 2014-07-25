function Genetic(mach){

    this.machines = mach;
    this.pairMachines = [];
    this.numPairs = mach.length;
    this.newMachines = [];

    this.selection = function(){

        var len = this.machines.length;
        shuffle(this.machines);
        this.pairMachines = genArray(this.numPairs, function(i){
            var ind = i * 2;
            return [this.machines[ind],
                    this.machines[ind + 1]];
        });
    };

    this.crossover = function(){
        var numSymbols = symbols.length;
        console.log(this.numPairs);
        for(var p=0; p < this.numPairs; p++){
            var parents = this.pairMachines.pop(),
                first_child = new Machine(),
                last_child = new Machine();

            for(var s=0; s < numSymbols; s++)
                for(var i=0; i < numStates; i++){
                    var id_parent = randomInt(0, 1);
                    if(Math.random() > mutateProbability){
                        first_child.finiteTable[s][i] = parents[id_parent].finiteTable[s][i];
                        first_child.finiteTable[s][i].counter = 0;
                    }
                    if(Math.random() > mutateProbability){
                        last_child.finiteTable[s][i] = parents[1 - id_parent].finiteTable[s][i];
                        last_child.finiteTable[s][i].counter = 0;
                    }
                }

            this.newMachines.push(first_child);
            this.newMachines.push(last_child);
        }
        shuffle(this.newMachines);
    }  
};