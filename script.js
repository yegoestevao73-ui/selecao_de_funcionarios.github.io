let fila_selecao = [];

window.onload = function() {
    listarLocalStorage();
};

let form = document.getElementById("formulario");

form.addEventListener("submit", function(evento) {
    evento.preventDefault(); 

    let nomeInput = document.getElementById("id_nome").value;
    let idadeInput = document.getElementById("id_idade").value;
    let cargoInput = document.querySelector('input[name="radio_s"]:checked').value;

    let novoCandidato = {
        nome: nomeInput,
        idade: idadeInput,
        cargo: cargoInput
    };

    let local_storage = localStorage.getItem("selecao_funcionarios");
    if (local_storage !== null && local_storage !== "") {
        fila_selecao = JSON.parse(local_storage);
    } else {
        fila_selecao = [];
    }

    fila_selecao.push(novoCandidato);

    localStorage.setItem("selecao_funcionarios", JSON.stringify(fila_selecao));

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
        fila_selecao = JSON.parse(local_storage);

        for (let i = 0; i < fila_selecao.length; i++) {
            resultadoDiv.innerHTML += 
                "<p>" +
                    "<b>Posição " + (i + 1) + ":</b> " + fila_selecao[i].nome + " (" + fila_selecao[i].idade + " anos) - Cargo: " + fila_selecao[i].cargo + " <br><br>" +
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
        localStorage.setItem("selecao_funcionarios", JSON.stringify(fila_selecao));
    }

    listarLocalStorage();
}

function editarFuncionario(indice) {
    let novoNome = prompt("Alterar nome do candidato:", fila_selecao[indice].nome);
    let novaIdade = prompt("Alterar idade do candidato:", fila_selecao[indice].idade);
    let novoCargo = prompt("Alterar cargo do candidato:", fila_selecao[indice].cargo);

    if (novoNome !== null && novoNome.trim() !== "" &&
        novaIdade !== null && novaIdade.trim() !== "" &&
        novoCargo !== null && novoCargo.trim() !== "") {

        fila_selecao[indice].nome = novoNome;
        fila_selecao[indice].idade = novaIdade;
        fila_selecao[indice].cargo = novoCargo;

        localStorage.setItem("selecao_funcionarios", JSON.stringify(fila_selecao));
        listarLocalStorage();
    }
}

function editarFuncionario(indice) {
    let novoNome = prompt("Alterar nome do candidato:", fila_selecao[indice].nome);
    
    if (novoNome !== null && novoNome.trim() !== "") {
        let novaIdade = prompt("Alterar idade do candidato:", fila_selecao[indice].idade);
        
        if (novaIdade !== null && novaIdade.trim() !== "") {
            let novoCargo = prompt("Alterar cargo do candidato:", fila_selecao[indice].cargo);
            
            if (novoCargo !== null && novoCargo.trim() !== "") {
                fila_selecao[indice].nome = novoNome;
                fila_selecao[indice].idade = novaIdade;
                fila_selecao[indice].cargo = novoCargo;
                
                localStorage.setItem("selecao_funcionarios", JSON.stringify(fila_selecao));
                listarLocalStorage();
            }
        }
    }
}

function atenderProximo() {
    let local_storage = localStorage.getItem("selecao_funcionarios");

    if (local_storage === null || local_storage === "") {
        alert("Não há ninguém para ser selecionado!");
        return;
    }

    fila_selecao = JSON.parse(local_storage);

    let candidato = fila_selecao.shift(); 
    alert("Selecionando Funcionário: " + candidato.nome + " (" + candidato.cargo + ")");

    if (fila_selecao.length === 0) {
        localStorage.removeItem("selecao_funcionarios");
    } else {
        localStorage.setItem("selecao_funcionarios", JSON.stringify(fila_selecao));
    }

    listarLocalStorage();
}