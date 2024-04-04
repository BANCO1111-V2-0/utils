// calculo.js

// Função para calcular acumulado de entradas e saídas
function calcularAcumulado() {
    const outs = require("./saidas.json");
    const ins = require("./entradas.json");
  
    var acumuladoIns = 0;
    var acumuladoOuts = 0;
    var diferenca = 0;
  
    // Calcular acumulado de saídas
    for (var i = 0; i < outs.length; i++) {
        acumuladoOuts += outs[i].amount;
    }
  
    // Calcular acumulado de entradas
    for (var i = 0; i < ins.length; i++) {
        acumuladoIns += ins[i].amount;
    }
  
    diferenca = acumuladoIns - acumuladoOuts;
  
    console.log("Acumulado entrada: " + acumuladoIns.toFixed(2).replace(".", ","));
    console.log("Acumulado saída: " + acumuladoOuts.toFixed(2).replace(".", ","));
    console.log("Diferença: " + diferenca.toFixed(2).replace(".", ","));
}

// Exportar a função para poder importá-la em outro arquivo
module.exports = calcularAcumulado;
