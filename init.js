var tapes = [];
var machines = [];
var counter = 0;
var counterMachine = 0;
var statusNode = null;
var scoresNode = null;
var generation = 0;

function init(){
  statusNode = document.getElementById('status');
  statusNode.innerHTML = 'generation: ' + 0;
  tapes = [new Tape('firstCanvas'), new Tape('secondCanvas')];
  machines = genArray(
    2,
    function(i){return new Machine();}
  )
  
  window.setTimeout(changeState, 1);
}

function changeState(){
  var machine = machines[counterMachine];

  for(var i=0; i < 2; i++)
    machine.showTable('machineTable' + i);

  for(var i=0; i < 2; i++)
    for(var c=0; c < 32; c++){
      var tape = tapes[i];
      var machine = machines[i];
      machine.changeState(tape.getSymbol());
      var state = machine.getState();

      tape.setSymbol(state.symbol);
      tape.move(state.move);
    }
  for(var i=0; i < 2; i++)
    tapes[i].refresh();
  //checkCounters();
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

  statusNode.innerHTML = 'generation: ' + generation;

  if (++counterMachine >= numMachines){
    counterMachine = 0;
    generation++;
    var genetic = new Genetic(machines);

    genetic.selection();
    genetic.crossover();

    machines = genetic.machines;

    statusNode.innerHTML = 'generation: ' + generation;

    //machines = [];
    //for(var i=0; i < numMachines; i++)
    //    machines.push(new Machine());
  }

  
}