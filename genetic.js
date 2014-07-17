function Genetic(machines){

    this.machines = machines;
    this.pairMachines = [];

    this.selection = function(){
        machines.sort(function(a, b){return a.score - b.score;});
        var numPairs = numMachines / 4;
        for(var i=0; i < numPairs; i++){
            var pair = [machines.pop(), machines.pop()];
            this.pairMachines.push(pair);
        }
    }
};