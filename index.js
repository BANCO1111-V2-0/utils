const axios = require('axios');
require('dotenv').config();

const obterSaldo = async () => {
    try {
        const headers = {
            'x-delbank-api-key': process.env.DELBANK_API_KEY
        };
        const response = await axios.get('https://api.delbank.com.br/baas/api/v1/balances', { headers });
        return response.data.amountAvailable;
    } catch (error) {
        console.error('Erro ao obter saldo:', error);
        throw error;
    }
};

const main = async () => {
    try {
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

        const response = await axios.get('https://api.delbank.com.br/baas/api/v2/transactions', { params, headers });

        const saldoAtual = await obterSaldo();
        console.log("Saldo Atual da Conta do Cliente:", saldoAtual);

        const entradas = [];
        const saidas = [];
        let valorTotalEntradas = 0;
        let valorTotalSaidas = 0;

        const contagem = { credito: 0, debito: 0 };

        response.data.forEach(transacao => {
            const transacaoFormatada = {
                valor: transacao.amount,
                tipo: transacao.type.name,
                nome: transacao.type.description || transacao.type.name, // Use type.name se description for undefined
                description: transacao.description || transacao.type.description, // Use type.description se description for undefined
                isCredit: transacao.type.isCredit
            };
        
            console.log("Descrição da Transação:", transacaoFormatada.description);
            console.log("É um crédito?", transacaoFormatada.isCredit);
        
            if (transacaoFormatada.isCredit) {
                entradas.push(transacaoFormatada);
                valorTotalEntradas += transacao.amount;
                contagem.credito++;
            } else {
                saidas.push(transacaoFormatada);
                valorTotalSaidas += transacao.amount;
                contagem.debito++;
            }
        });
        

        console.log("Entradas:");
        console.log(entradas);

        console.log("Valor Total de Entradas (antes do toFixed): " + valorTotalEntradas);
        console.log("Valor Total de Entradas (após toFixed): " + valorTotalEntradas.toFixed(2));

        console.log("Saídas:");
        console.log(saidas);
        console.log("Valor Total de Saídas: " + valorTotalSaidas.toFixed(2));
        console.log("Valor Total de Entradas: " + valorTotalEntradas.toFixed(2));

        console.log("Saldo Atual da Conta do Cliente:", saldoAtual);

        console.log("Contagem de Transações:");
        console.log(contagem);
    } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
    }
};

main();
