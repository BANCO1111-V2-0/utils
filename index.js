const axios = require('axios');
require('dotenv').config();

const startDate = process.env.START_DATE;
const endDate = process.env.END_DATE;

const params = {
    startDate,
    endDate,
    page: 1,
    limit: 99999
};

const headers = {
    'x-delbank-api-key': process.env.DELBANK_API_KEY
};

axios.get('https://api.delbank.com.br/baas/api/v2/transactions', { params, headers })
    .then(response => {
        const entradas = [];
        const saidas = [];
        let valorTotalEntradas = 0;
        let valorTotalSaidas = 0;

        response.data.forEach(transacao => {
            const transacaoFormatada = {
                valor: transacao.amount,
                status: transacao.status,
                tipo: transacao.type.name,
                nome: transacao.type.description,
                descricao: transacao.description,
                isCredit: transacao.type.isCredit
            };

            if (transacaoFormatada.isCredit) {
                entradas.push(transacaoFormatada);
                valorTotalEntradas += transacao.amount;
            } else {
                saidas.push(transacaoFormatada);
                valorTotalSaidas += transacao.amount;
            }
        });

        console.log("Entradas:");
        console.log(entradas);

        console.log("Valor Total de Entradas (antes do toFixed): " + valorTotalEntradas);
        console.log("Valor Total de Entradas (após toFixed): " + valorTotalEntradas.toFixed(2));

        console.log("Saídas:");
        console.log(saidas);
        console.log("Valor Total de Saídas: " + valorTotalSaidas.toFixed(2));
        console.log("Valor Total de Entradas: " + valorTotalEntradas.toFixed(2)); // Corrigido para mostrar o valor total de entradas
    })
    .catch(error => {
        console.error('Erro ao fazer a solicitação:', error);
    });
