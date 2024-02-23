const outs = require("./data.json");

var aumulado = 0;

for (var i = 0; i < outs.length; i++) {
  aumulado += outs[i].amount;
}

console.log("Acumulado saída: " + aumulado.toFixed(2));
console.log("Quantidade de transações: " + outs.length);
