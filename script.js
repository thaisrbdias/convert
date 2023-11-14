// Função para obter e exibir o valor do BTC em tempo real
function atualizarValorBTC() {
    fetch("https://economia.awesomeapi.com.br/json/last/BTC-BRL")
        .then(response => response.json())
        .then(data => {
            var valorBTC = data.BTCBRL.bid;
            var valorFormatado = parseFloat(valorBTC).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.getElementById("valorBTC").textContent = "Valor do Bitcoin (BTC) em BRL: " + valorFormatado;
        })
        .catch(error => {
            console.error("Erro ao obter o valor do Bitcoin: " + error);
        });
}

// Chamar a função para atualizar o valor do BTC assim que a página carregar
atualizarValorBTC();

function converterMoeda() {
    var nome = document.getElementById("nomeInput").value;
    var moeda = document.getElementById("moeda").value;
    var valor = parseFloat(document.getElementById("valor").value);

    if (moeda === "dolar") {
        fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
            .then(response => response.json())
            .then(data => {
                var cotacaoDoDolar = data.USDBRL.bid;
                var valorEmReal = valor * cotacaoDoDolar;
                document.getElementById("resultado").textContent = nome + ", o valor convertido é de R$" + valorEmReal.toFixed(2);
            })
            .catch(error => {
                console.error("Erro ao obter taxas de câmbio: " + error);
            });
    } else if (moeda === "euro") {
        fetch("https://economia.awesomeapi.com.br/json/last/EUR-BRL")
            .then(response => response.json())
            .then(data => {
                var cotacaoDoEuro = data.EURBRL.bid;
                var valorEmReal = valor * cotacaoDoEuro;
                document.getElementById("resultado").textContent = nome + ", o valor convertido é de R$" + valorEmReal.toFixed(2);
            })
            .catch(error => {
                console.error("Erro ao obter taxas de câmbio: " + error);
            });
    } else {
        document.getElementById("resultado").textContent = "Moeda não suportada";
    }
}

// Adicione um ouvinte de evento para o elemento input com o id "valor" para que o enter selecione selecionar
document.getElementById("valor").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        converterMoeda();
    }
});