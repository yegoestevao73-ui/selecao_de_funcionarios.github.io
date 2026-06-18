let fila_selecao = [];

let form = document.getElementById("formulario");









window.onload = function() {
    let local_storage = localStorage.getItem("selecao_funcionarios");
    if (local_storage !== null && local_storage !== "") {
        fila_selecao = local_storage.split(",");
    } else {
        fila_selecao = [];
    }
    listarLocalStorage();
};











form.addEventListener("submit", function(evento) {
    evento.preventDefault(); 

    let nomeInput = document.getElementById("id_nome").value;
    let idadeInput = document.getElementById("id_idade").value;
    
    
    let cargoInput = document.querySelector('input[name="radio_s"]:checked').value;

    
    let dadosCandidato = nomeInput + " (" + idadeInput + " anos) - Cargo: " + cargoInput;

    
    let local_storage = localStorage.getItem("selecao_funcionarios");
    if (local_storage !== null && local_storage !== "") {
        fila_selecao = local_storage.split(",");
    } else {
        fila_selecao = [];
    }

    
    fila_selecao.push(dadosCandidato);

 
    localStorage.setItem("selecao_funcionarios", fila_selecao.join(","));

    
    document.getElementById("id_nome").value = "";
    document.getElementById("id_idade").value = "";

    listarLocalStorage();
});











function listarLocalStorage() {
    let resultadoDiv = document.getElementById("cadastrados");
    resultadoDiv.innerHTML = ""; 

    let local_storage = localStorage.getItem("selecao_funcionarios");

    if (local_storage === null || local_storage === "") {
        resultadoDiv.innerHTML = "<p>Nenhum candidato na fila.</p>";
    } else {
        fila_selecao = local_storage.split(",");

        for (let i = 0; i < fila_selecao.length; i++) {
            resultadoDiv.innerHTML += 
                "<p>" +
                    "<b>Posição " + (i + 1) + ":</b> " + fila_selecao[i] + " <br><br>" +
                    "<button type='button' onclick='editarFuncionario(" + i + ")'>EDITAR</button> " +
                    "<button type='button' onclick='removerFuncionario(" + i + ")'>REPROVAR</button>" +
                "</p><br>";
        }
    }
}












function removerFuncionario(indice) {
    fila_selecao.splice(indice, 1);

    if (fila_selecao.length === 0) {
        localStorage.removeItem("selecao_funcionarios");
    } else {
        localStorage.setItem("selecao_funcionarios", fila_selecao.join(","));
    }

    listarLocalStorage();
}










function editarFuncionario(indice) {
    let novoDado = prompt("Alterar dados do candidato:", fila_selecao[indice]);

    if (novoDado !== null && novoDado.trim() !== "") {
        fila_selecao[indice] = novoDado;
        localStorage.setItem("selecao_funcionarios", fila_selecao.join(","));
        listarLocalStorage();
    }
}












function atenderProximo() {
    let local_storage = localStorage.getItem("selecao_funcionarios");

    if (local_storage === null || local_storage === "") {
        alert("Não há ninguém para ser selecionado!");
        return;
    }

    fila_selecao = local_storage.split(",");

    let candidato = fila_selecao.shift(); 
    alert("Selecionando Funcionário: " + candidato);

    if (fila_selecao.length === 0) {
        localStorage.removeItem("selecao_funcionarios");
    } else {
        localStorage.setItem("selecao_funcionarios", fila_selecao.join(","));
    }

    listarLocalStorage();
}