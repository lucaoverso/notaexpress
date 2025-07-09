let tela = "";
let resultadoMostrado = false; // Flag para controlar se o resultado foi mostrado
let teclas = document.querySelectorAll(".tecla");

teclas.forEach(function(tecla) {
    tecla.addEventListener("click", function(event) {
        let valor = event.target.value;

        // Se um resultado foi mostrado antes, resetar a tela
        if (resultadoMostrado) {
            tela = "";
            resultadoMostrado = false;
        }

        tela += valor;
        document.getElementById("visor").innerText = tela;
        console.log(tela);
    });
});

document.getElementById("reset").addEventListener("click", function () {
    tela = "";
    document.getElementById("visor").innerText = tela;
});

document.getElementById("backspace").addEventListener("click", function () {
    tela = tela.slice(0, -2);
    document.getElementById("visor").innerText = tela;
});

function calcular() {
    try {
        let resultado = parseFloat(eval(tela));
        tela = resultado.toString(); // Garante que seja uma string
        document.getElementById("visor").innerText = tela;
        resultadoMostrado = true; // Marca que um resultado foi mostrado
    } catch (erro) {
        document.getElementById("visor").innerText = "Erro";
        tela = "";
        resultadoMostrado = false;
    }
}