function random(a, b) {
	return Math.round((Math.random() * (b - a) ) + a);
}

function choice(table) {
	return table[random(table.length)];
}

function State(move_x, move_y, state, symbol) { 
	this.symbol = symbol;
	this.state = state;
	this.move = [move_x, move_y];
};

function Tape(htmlId) {
	var canvas = document.getElementById(htmlId);
	this.ctx = canvas.getContext('2d');
	this.data = this.ctx.getImageData(0, 0, 255, 255); 
	this.cursor = [127, 127];

	var numSymbols = symbols.length;
	var finiteTable = [];
	for(symbol in symbols){
		var coll = [];
		for(i=0; i < numStates; i++){
			var state = new State(
				random(-1, 1),
				random(-1, 1), 
				random(numStates - 1);
				random(numSymbols - 1);
			);
			coll.push(state);
		}
		finiteTable.push(coll);
	}

	this.finiteTable = finiteTable;

	this.move = function(dir){
		for(i in dir){
			this.cursor[i] += dir[i];
			if (this.cursor[i] > 255)
				this.cursor[i] -= 255;
			if (this.cursor[i] < 0)
				this.cursor[i] += 255;
		}
	}

	this.getIndex = function(){
		return (this.cursor[0] + this.cursor[1] * 256) * 4;
	}

	this.getSymbol = function(){
		var index = this.getIndex();
		var symbol = [];
	}

	this.setSymbol = function(symbol){
		var index = (x + y * 256) * 4;
		var data = this.data;
	    data.data[index + 0] = symbol[0];
	    data.data[index + 1] = symbol[1];
	    data.data[index + 2] = symbol[2];
	    data.data[index + 3] = 255;
		
	}
}

var tapes = [new Tape('firstCanvas'), new Tape('secondCanvas')];

function init(){

	context.fillStyle = symbols[0];
	context.fillRect(0, 0, 255, 255);

	



	window.setInterval(change_state, 200);
}

function change_state(){

}