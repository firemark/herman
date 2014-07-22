var tape = null;
var machines = [];
var counter = 0;
var counterMachine = 0;
var statusNode = null;
var scoresNode = null;
var generation = 0;

function init(){
  statusNode = document.getElementById('status');
  scoresNode = document.getElementById('scoresTable');
  statusNode.innerHTML = "machine: " + 1 + ' generation: ' + 0;
  tape = new Tape('mainCanvas');
  machines = genArray(
    numMachines,
    function(i){return new Machine();}
  )
  
  window.setTimeout(changeState, 1);
}

function changeState(){
  var machine = machines[counterMachine];
  machine.showTable();
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
  var score = computeScore(tape.symbolData);
  machine.score = score;

  counter = 0;
  tape.reset();

  scoresNode.innerHTML += addRow([counterMachine + 1, score]);
  statusNode.innerHTML = "machine: " + (counterMachine + 2) + ' '
                       + 'generation: ' + generation;

  if (++counterMachine >= numMachines){
    counterMachine = 0;
    generation++;
    var genetic = new Genetic(machines);

    genetic.selection();
    genetic.crossover();

    machines = genetic.machines;

    scoresNode.innerHTML = '';
    statusNode.innerHTML = "machine: " + 1 + ' '
                         + 'generation: ' + generation;

    //machines = [];
    //for(var i=0; i < numMachines; i++)
    //    machines.push(new Machine());
  }

  
}