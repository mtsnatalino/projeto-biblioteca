import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AlterarEmprestimo() {
  const { codigo } = useParams();
  const navigate = useNavigate();

  const [cod_cliente, setCodCliente] = useState("");
  const [cod_livros, setCodLivro] = useState("");
  const [data_emprestimo, setDataEmp] = useState("");
  const [data_devolucao, setDataDev] = useState("");
  const [resultado, setResultado] = useState("");

  async function consultarPorCodigo(codigo) {
    try {
      const response = await axios.get(
        "http://localhost:3001/emprestimos/" + codigo
      );
      const emprestimo = response.data;

      setCodCliente(emprestimo.cod_cliente);
      setCodLivro(emprestimo.cod_livros);
      setDataEmp(emprestimo.data_emprestimo);
      setDataDev(emprestimo.data_devolucao)
    } catch (erro) {
      alert(
        "Erro ao consultar emprestimo: " +
          (erro.response?.data?.error || erro.message)
      );
    }
  }

  async function alterar() {
    try {
      setResultado("Alterando...");

      await axios.put("http://localhost:3001/emprestimos/" + codigo, {
        cod_cliente,
        cod_livros,
        data_emprestimo,
        data_devolucao
      });

      setResultado("Emprestimo alterado com sucesso!");
      navigate("/consulta");
    } catch (erro) {
      setResultado(
        "Erro ao alterar emprestimo: " + (erro.response?.data?.error || erro.message)
      );
    }
  }

  useEffect(() => {
    consultarPorCodigo(codigo);
  }, [codigo]);

  return (
    <div className="conteudo">
      <form action="">
        <h1>Alterar Emprestimo</h1>

                <p>
          Código do cliente <br />
          <input
            type="text"
            value={cod_cliente}
            onChange={(e) => setCodCliente(e.target.value)}
          />
        </p>
        <p>
          Código do livro <br />
          <input
            type="text"
            value={cod_livros}
            onChange={(e) => setCodLivro(e.target.value)}
          />
        </p>
        <p>
          Data do empréstimo <br />
          <input
            type="date"
            value={data_emprestimo}
            onChange={(e) => setDataEmp(e.target.value)}
          />
        </p>
        <p>
          Data de devolução <br />
          <input
            type="date"
            value={data_devolucao}
            onChange={(e) => setDataDev(e.target.value)}
          />
        </p>

        <p>
          <input type="button" value="Alterar" onClick={alterar} />
        </p>

        <p>{resultado}</p>
      </form>
    </div>
  );
}
