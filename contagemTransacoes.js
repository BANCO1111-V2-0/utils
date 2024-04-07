// Função para contar a quantidade de tipos de transação e seus respectivos nomes
function contarTiposDeTransacao(transacoes) {
    const contagem = {};

    transacoes.forEach(transacao => {
        const tipo = transacao.tipo;
        const nome = transacao.nome;

        // Se o tipo ainda não existir na contagem, inicialize-o com um objeto vazio
        if (!contagem[tipo]) {
            contagem[tipo] = {};
        }

        // Incrementar a contagem para o nome da transação
        if (!contagem[tipo][nome]) {
            contagem[tipo][nome] = 1;
        } else {
            contagem[tipo][nome]++;
        }
    });

    return contagem;
}

// Exportar a função para poder importá-la em outro arquivo
module.exports = contarTiposDeTransacao;
