import { useState } from "react";
import axios from "axios";

export default function Emprestimo() {
  const [codigoCliente, setCodCliente] = useState("");
  const [codigoLivro, setCodLivro] = useState("");
  const [dataEmprestimo, setDataEmp] = useState("");
  const [dataDevolucao, setDataDev] = useState("");
  const [resultado, setResultado] = useState("");

  async function cadastrar() {

    if (!codigoCliente || !codigoLivro || !dataEmprestimo || !dataDevolucao) {
      setResultado("Preencha todos os campos antes de cadastrar.");
      return;
    }
    
    try {
      setResultado("..Aguarde..");
      const response = await axios.post("http://localhost:3001/emprestimos", {
        cod_cliente: codigoCliente,
        cod_livros: codigoLivro,
        data_emprestimo: dataEmprestimo,
        data_devolucao: dataDevolucao,
      });
      setResultado(response.data.message);

      setCodCliente("");
      setCodLivro("");
      setDataEmp("");
      setDataDev("");
    } catch (erro) {
      setResultado(erro.response?.data?.error || "Erro desconhecido");
    }
  }

  return (
    <div className="conteudo">
      <form>
        <h1>Cadastro de Empréstimo</h1>

        <p>
          Código do cliente <br />
          <input
            type="text"
            value={codigoCliente}
            onChange={(e) => setCodCliente(e.target.value)}
          />
        </p>
        <p>
          Código do livro <br />
          <input
            type="text"
            value={codigoLivro}
            onChange={(e) => setCodLivro(e.target.value)}
          />
        </p>
        <p>
          Data do empréstimo <br />
          <input
            type="date"
            value={dataEmprestimo}
            onChange={(e) => setDataEmp(e.target.value)}
          />
        </p>
        <p>
          Data de devolução <br />
          <input
            type="date"
            value={dataDevolucao}
            onChange={(e) => setDataDev(e.target.value)}
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
