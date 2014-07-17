var tape = null;
var machines = [];
var counter = 0;
var counterMachine = 0;
var statusNode = null

function init(){
  statusNode = document.getElementById('status');
  statusNode.innerHTML = "machine: " + counterMachine;
  tape = new Tape('mainCanvas');
  for(var i=0; i < numMachines; i++)
    machines.push(new Machine());
  
  window.setTimeout(changeState, 1);
}

function changeState(){
  var machine = machines[counterMachine];
  for(var c=0; c < 32; c++){
    machine.changeState(tape.getSymbol());
    var state = machine.getState();

    tape.setSymbol(state.symbol);
    tape.move(state.move);
  }
  tape.refresh();
  checkCounters();
  window.setTimeout(changeState, 1);
}

function checkCounters(){

  counter += 32;
  if (counter < maxMachineIterators)
    return;

  var machine = machines[counterMachine];
  machine.score = computeScore(tape.symbolData);

  counter = 0;
  tape.reset();

  if (++counterMachine >= numMachines){
    counterMachine = 0;
    var genetic = new Genetic(machines);

    genetic.selection();
    genetic.crossover();

    //machines = [];
    //for(var i=0; i < numMachines; i++)
    //    machines.push(new Machine());
  }

  statusNode.innerHTML = "machine: " + counterMachine;
}