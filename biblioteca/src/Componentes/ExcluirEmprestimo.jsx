import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ExcluirLivro() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [emprestimo, setEmprestimo] = useState([]);

  async function consultarPorCodigo(codigo) {
    try {
      const response = await axios.get(
        "http://localhost:3001/emprestimos/" + codigo
      );
      setEmprestimo(response.data);
    } catch (erro) {
      alert(erro);
    }
  }

  useEffect(() => {
    consultarPorCodigo(codigo);
  }, []);

  async function excluir(codigo) {
    try {
      const response = await axios.delete(
        "http://localhost:3001/emprestimos/" + codigo
      );

      alert("Exclusão efetuada com sucesso!")
      navigate("/consulta")
    } catch (erro) {
      alert(erro);
    }
  }

  function voltar() {
    navigate("/consulta")
  }

  return (
    <div>
      <form action="">
        <h1>Exclusão de Emprestimo</h1>

        <p>
            Você deseja excluir o Emprestimo {emprestimo.cod_emprest}
        </p>

        <p>
            <a href="" onClick={(e) => {e.preventDefault(); excluir(emprestimo.cod_emprest)}}>Sim</a>
        </p>

        <p>
            <a href="" onClick={(e) => {e.preventDefault(); voltar(emprestimo.cod_emprest)}}>Não, voltar a consulta</a>
        </p>
      </form>
    </div>
  );
}
