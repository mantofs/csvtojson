var csv = [
  "animal;raça;nome;cor",
  "gato;pcb;mycroft;cinza",
  "gato;pcb;sakura;branca",
  "gato;persa;garfield;laranja",
  "cachorro;pug;duque;bege",
  "cachorro;tomba lata;kiki;preto",
  "cachorro;tomba lata;kiki;amarelo",
  "peixe;beta;pedro;vermelho",
  "peixe;palhaco;nemo;laranja",
  "peixe;palhaco;nemo;branco",
];

var head = csv.shift().split(";");
var body = csv.map(function (row) {
  return row.split(";");
});

var distinct = function (arr, attr) {
  return arr
    .map((i) => i[attr])
    .filter((item, idx, arr) => arr.indexOf(item) == idx);
};

var createObject = function (arr, idx) {
  if (arr[0].length <= idx + 1) {
    if (arr.length > 1) return distinct(arr, idx);
    return arr[0][idx];
  }
  var obj = {};

  var layers = distinct(arr, idx);

  layers.forEach((layer, _idx) => {
    var subArr = arr.filter((item) => item[idx] == layer);

    var value = createObject(subArr, idx + 1);

    if (obj.hasOwnProperty(layer)) obj[layer] = [value].concat(obj[layer]);
    else obj[layer] = value;

    console.log("-- ".repeat(idx) + "".concat(layer));
  });

  return obj;
};

var obj = createObject(body, 0);

console.log(JSON.stringify(obj));
return;
