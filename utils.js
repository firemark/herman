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

function addRow(args, node){
    node = node || 'td';
    var template = '<tr>';

    var len = args.length;
    for(var i=0; i < len; i++)
        template += '<' + node + '>' + args[i] + '</' + node + '>';

    template += '</tr>';
    return template;
}