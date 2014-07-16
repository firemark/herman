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

	this.head = 0;
	this.symbol = 0;

	for(symbol in symbols){
		var coll = [];
		for(i=0; i < numStates; i++){
			var state = new State(
				randomInt(-1, 1),
				randomInt(-1, 1), 
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
	var element = document.getElementById(htmlId);

	this.ctx = element.getContext('2d');
	this.size = [element.width, element.height];
	this.sizeSubOne = [element.width - 1, element.height - 1];
	this.arr_size = element.width * element.height;

	this.symbolData = Array(this.arr_size);
	this.cursor = [Math.floor(element.width / 2),
				   Math.floor(element.height / 2)];		

	this.reset = function(symbolId){
		symbolId = symbolId || 0;
		for(i=0; i < this.arr_size; i++){
			this.symbolData[i] = symbolId;
		}
		this.ctx.fillStyle = 'rgb(' + symbols[symbolId] + ')';
		this.ctx.fillRect(0, 0, this.sizeSubOne[0], this.sizeSubOne[1]);
		this.imageData = this.ctx.getImageData(0, 0, this.sizeSubOne[0], this.sizeSubOne[1]);
	}

	this.random = function(){
		var numSymbols = symbols.length;
		for(i=0; i < this.arr_size; i++){
			this.setSymbol(randomIndex(numSymbols), i);
		}
		this.refresh();
	}

	this.move = function(dir){
		for(var i in dir){
			this.cursor[i] += dir[i];
			var cur = this.cursor[i];
			if (cur > this.sizeSubOne[i])
				this.cursor[i] -= this.sizeSubOne[i];
			if (cur < 0)
				this.cursor[i] += this.sizeSubOne[i];
		}
	}

	this.getIndex = function(){
		return this.cursor[0] + this.cursor[1] * this.size[0];
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

var tape = null;
var machines = [];

function init(){

	tape = new Tape('mainCanvas');
	machines = [new Machine(), new Machine()];
	//tape.random();
	//tapes[1].random();
	
	window.setTimeout(change_state, 1);
}

function change_state(){
	for(var c=0; c < 32; c++){
		var machine = machines[0];
			
		machine.changeState(tape.getSymbol());
		var state = machine.getState();

		tape.setSymbol(state.symbol);
		tape.move(state.move);
	}
	tape.refresh();


	window.setTimeout(change_state, 1);
}