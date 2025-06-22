function consultar() {
  fetch("http://localhost:3001/clientes")
    .then((res) => res.json())
    .then((data) => {
      console.log("Clientes: ", data);
      document.getElementById("resultado").innerHTML = JSON.stringify(
        data,
        null,
        1
      );
    })
    .catch((err) => {
      document.getElementById("resultado").innerHTML =
        "Erro ao obter dados da API";
    });
}

function consultarPorCodigo(codigo) {
  fetch(`http://localhost:3001/clientes/${codigo}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Cliente:", data);
      document.getElementById("resultado").innerHTML = JSON.stringify(
        data,
        null,
        2
      );
    })
    .catch((err) => {
      document.getElementById("resultado").innerHTML =
        "Erro ao obter dados da API!";
    });
}

function cadastrar() {
  const cliente = {
    nome: "Matheus",
    cpf: "44630032886",
    email: "matheus@gmail.com",
    telefone: "19991962219",
  };

  fetch(`http://localhost:3001/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("resultado").innerHTML =
        data.message || data.error;
    })
    .catch((err) => {
      document.getElementById("resultado").innerHTML =
        "Erro ao obter dados da API!";
    });
}

function alterar(codigo) {

  const clienteAtualizado = {
    nome: "Matheus Natalino Pedro",
    cpf: "2220256622",
    email: "matttths@gmail.com",
    telefone: "12121212",
  };

  fetch(`http://localhost:3001/clientes/${codigo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clienteAtualizado),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("resultado").innerHTML =
        data.message || data.error;
    })
    .catch((err) => {
      document.getElementById("resultado").innerHTML =
        "Erro ao obter dados da API";
    });
}

function excluir(codigo) {
  fetch(`http://localhost:3001/clientes/${codigo}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("resultado").innerHTML =
        data.message || data.error;
    })
    .catch((err) => {
      document.getElementById("resultado").innerHTML =
        "Erro ao obter dados da API";
    });
}
