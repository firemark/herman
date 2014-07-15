function randomInt(a, b) {
	return Math.round((Math.random() * (b - a)) + a);
};

function randomIndex(a) {
	return Math.floor((Math.random() * a));
};

function State(move_x, move_y, state, symbol) { 
	this.symbol = symbol;
	this.state = state;
	this.move = [move_x, move_y];
};

function Machine() {
	var numSymbols = symbols.length,
		finiteTable = [];

	this.head = this.start_state = randomIndex(numStates);
	this.symbol = 0;

	for(symbol in symbols){
		var coll = [];
		for(i=0; i < numStates; i++){
			var state = new State(
				randomInt(-3, 3),
				randomInt(-3, 3), 
				randomIndex(numStates),
				randomIndex(numSymbols)
			);
			coll.push(state);
		}
		finiteTable.push(coll);
	}

	this.finiteTable = finiteTable;

	this.changeState = function(symbol){
		var state = this.finiteTable[symbol][this.head];
		this.head = state.state;
		this.symbol = symbol;
	}

	this.getState = function(){
		return this.finiteTable[this.symbol][this.head];
	}

	this.getSymbol = function(){
		return this.symbol;
	}	

}

function Tape(htmlId) {

	this.ctx = document.getElementById(htmlId).getContext('2d');
	this.symbolData = Array(256 * 256);
	this.cursor = [127, 127];		

	this.reset = function(symbolId){
		symbolId = symbolId || 0;
		for(i=0; i < 256 * 256; i++){
			this.symbolData[i] = symbolId;
		}
		this.ctx.fillStyle = 'rgb(' + symbols[symbolId] + ')';
		this.ctx.fillRect(0, 0, 255, 255);
		this.imageData = this.ctx.getImageData(0, 0, 255, 255);
	}

	this.random = function(){
		var numSymbols = symbols.length;
		for(i=0; i < 256 * 256; i++){
			this.setSymbol(randomIndex(numSymbols), i);
		}
		this.refresh();
	}

	this.move = function(dir){
		for(i in dir){
			var cur = this.cursor[i];
			this.cursor[i] += dir[i];
			if (cur > 255)
				this.cursor[i] = 0;
			if (cur < 0)
				this.cursor[i] = 255;
		}
	}

	this.getIndex = function(){
		return this.cursor[0] + this.cursor[1] * 256;
	}

	this.getSymbol = function(){
		return this.symbolData[this.getIndex()];
	}

	this.setSymbol = function(symbolNum, index){
		index = index || this.getIndex();
		var indexImage = index * 4,
			imageData = this.imageData,
			symbol = symbols[symbolNum];

	    imageData.data[indexImage + 0] = symbol[0];
	    imageData.data[indexImage + 1] = symbol[1];
	    imageData.data[indexImage + 2] = symbol[2];
	    imageData.data[indexImage + 3] = 255;

	    this.symbolData[index] = symbolNum;
	}

	this.refresh = function(){
		this.ctx.putImageData(this.imageData, 0, 0);
	}

	this.reset();
}

var tapes = [];
var machine = new Machine();

function init(){

	tapes = [new Tape('firstCanvas'), new Tape('secondCanvas')];
	tapes[0].random();
	
	window.setInterval(change_state, 1);
}

var counter = 0;

function change_state(){
	var tape = tapes[0];
		
	machine.changeState(tape.getSymbol());
	var state = machine.getState();

	tape.move(state.move);
	tape.setSymbol(state.symbol);
	tape.refresh();
	
	//window.setInterval(change_state, 200);
}