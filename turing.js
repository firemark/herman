function State(move_x, move_y, state, symbol) { 
  this.symbol = symbol;
  this.state = state;
  this.move = [move_x, move_y];
};

State.random = function(){
  return new State(
    randomInt(-1, 1),
    randomInt(-1, 1), 
    randomIndex(numStates),
    randomIndex(symbols.length)
  );
}

function Machine() {
  var finiteTable = [];

  this.head = 0;
  this.symbol = 0;
  this.score = 0;

  for(var s=0; s < symbols.length; s++){
    var coll = [];
    for(i=0; i < numStates; i++)
      coll.push(State.random());

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
  

  this.reset = function(symbolId){
    symbolId = symbolId || 0;
    for(var i=0; i < this.arr_size; i++){
      this.symbolData[i] = symbolId;
    }

    this.ctx.fillStyle = 'rgb(' + symbols[symbolId] + ')';
    this.ctx.fillRect(0, 0, this.sizeSubOne[0], this.sizeSubOne[1]);

    this.imageData = this.ctx.getImageData(0, 0, this.sizeSubOne[0], this.sizeSubOne[1]);
    this.cursor = [Math.floor(this.size[0] / 2),
                   Math.floor(this.size[1] / 2)];  
  }

  this.random = function(){
    var numSymbols = symbols.length;
    for(var i=0; i < this.arr_size; i++){
      this.setSymbol(randomIndex(numSymbols), i);
    }
    this.refresh();
  }

  this.move = function(dir){
    var lenDir = dir.length;
    for(var i = 0; i < lenDir; i++){
      this.cursor[i] += dir[i];
      var cur = this.cursor[i];
      if (cur > this.sizeSubOne[i])
        this.cursor[i] -= this.sizeSubOne[i];
      else if (cur < 0)
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
