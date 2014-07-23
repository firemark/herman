var tapes = [];
var machines = [];
var fineMachines = [];
var actualMachines = [];
var counter = 0;
var counterMachine = 0;
var statusNode = null;
var scoresNode = null;
var generation = 0;

function init(){
  statusNode = document.getElementById('status');

  tapes = [new Tape('firstCanvas'), new Tape('secondCanvas')];

  machines = genArray(numOfTurs * 2, function(i){return new Machine();})
  changeMachines();

  window.setTimeout(changeState, 1);
}

function changeMachines(){
  var pos = counterMachine * 2;
  actualMachines = [machines[pos], machines[pos + 1]];
  statusNode.innerHTML = 'turn: ' + counterMachine + ' generation: ' + 0;  
  for(var i=0; i < 2; i++)
    actualMachines[i].showTable('machineTable' + i);
}

function setBackgroundInCell(tableId, row, coll, color){
  var cell = document.getElementById(tableId).rows[row + 1].cells[coll + 1];
  cell.style.backgroundColor = color;
}

function changeState(){

  for(var i=0; i < 2; i++)
    for(var c=0; c < 32; c++){
      var tape = tapes[i];
      var machine = actualMachines[i];
      machine.changeState(tape.getSymbol());
      var state = machine.getState();

      tape.setSymbol(state.symbol);
      tape.move(state.move);
      var ratio = state.counter / ++counter;

      //console.log(state.symbol, state.state, ratio);
      if (ratio > 0.25)
        setBackgroundInCell('machineTable' + i, state.symbol, state.state, '#FF48D0');
      else if (ratio > 0.15)
        setBackgroundInCell('machineTable' + i, state.symbol, state.state, '#FF2B2B');
      else if (ratio > 0.1)
        setBackgroundInCell('machineTable' + i, state.symbol, state.state, '#FF6E4A');
      else if (ratio > 0.5)
        setBackgroundInCell('machineTable' + i, state.symbol, state.state, '#FFA343');
      else if (ratio > 0.025)
        setBackgroundInCell('machineTable' + i, state.symbol, state.state, '#FFF44F');
      else if (ratio > 0.0125)
        setBackgroundInCell('machineTable' + i, state.symbol, state.state, '#FFFF99');
      else if (ratio > 0.0025)
        setBackgroundInCell('machineTable' + i, state.symbol, state.state, '#F0E891');


    }

  for(var i=0; i < 2; i++)
    tapes[i].refresh();

  
  if (counter < maxMachineIterators)
    window.setTimeout(changeState, 1);
}

function addFineMachine(machineNum){
  window.clearTimeout(changeState);

  counter = 0;
  fineMachines.push(actualMachines[machineNum]);

  for(var i=0; i < 2; i++)
    tapes[i].reset();

  if (++counterMachine >= numOfTurs){
    counterMachine = 0;
    generation++;
    var genetic = new Genetic(fineMachines);

    genetic.selection();
    genetic.crossover();

    machines = genetic.newMachines;

    fineMachines = [];

  }
    
  changeMachines();

  statusNode.innerHTML = 'turn: ' + counterMachine + ' generation: ' + generation;
  window.setTimeout(changeState, 1);

}
