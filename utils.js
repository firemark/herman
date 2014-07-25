function randomInt(a, b) {
  return Math.round((Math.random() * (b - a)) + a);
};

function randomIndex(a) {
  return Math.floor((Math.random() * a));
};

function genArray(many, func){
    var arr = [];
    for(var i=0; i < many; i++)
        arr.push(func(i));
    return arr;
}

function genString(many, func){
    var s = ''
    for(var i=0; i < many; i++)
        s += func(i);
    return s;
}

function addRow(args, node){
    node = node || 'td';
    var template = '<tr>';

    template += genString(args.length, function(i){
        return '<' + node + '>' + args[i] + '</' + node + '>'
    });

    template += '</tr>';
    return template;
}

function shuffle(array){
    //lol :D
    array.sort(function(){ 0.5 - Math.random(); });
}