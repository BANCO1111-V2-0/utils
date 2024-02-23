const ins = require("./data.json");

var aumulado = 0;

for (var i = 0; i < ins.length; i++) {
  aumulado += ins[i].amount;
}

console.log("Acumulado entrada: " + aumulado.toFixed(2));
console.log("Quantidade de transações: " + ins.length);
