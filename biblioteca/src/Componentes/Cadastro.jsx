import { use, useState } from "react";
import axios from "axios";

export default function Cadastro() {
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();
  const [resultado, setResultado] = useState();

  async function cadastrar() {

    if (!nome || !cpf || !email || !telefone) {
      setResultado("Preencha todos os campos antes de cadastrar.");
      return;
    }
    
    try {
      setResultado("..Aguarde..");
      const response = await axios.post("http://localhost:3001/clientes", {
        nome,
        cpf,
        email,
        telefone,
      });
      setResultado(response.data.message);

      setNome("");
      setCpf("");
      setEmail("");
      setTelefone("");
    } catch (erro) {
      setResultado(erro.response?.data?.error || "Erro desconhecido");
    }
  }

  return (
    <div className="conteudo">
      <form action="">
        <h1>Cadastro</h1>

        <p>
          Digite o nome do cliente <br />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </p>
        <p>
          Digite o CPF <br />
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </p>
        <p>
          Digite o E-MAIL <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          Digite o TELEFONE <br />
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </p>

        <p>
          <input type="button" value="Cadastrar" onClick={cadastrar} />
        </p>

        <p>{resultado}</p>
      </form>
    </div>
  );
}
