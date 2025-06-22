import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ExcluirLivro() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [livros, setLivros] = useState([]);

  async function consultarPorCodigo(codigo) {
    try {
      const response = await axios.get(
        "http://localhost:3001/livros/" + codigo
      );
      setLivros(response.data);
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
        "http://localhost:3001/livros/" + codigo
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
        <h1>Exclusão de Livros</h1>

        <p>
            Você deseja excluir o livro {livros.titulo}
        </p>

        <p>
            <a href="" onClick={(e) => {e.preventDefault(); excluir(livros.cod_livros)}}>Sim</a>
        </p>

        <p>
            <a href="" onClick={(e) => {e.preventDefault(); voltar(livros.cod_livros)}}>Não, voltar a consulta</a>
        </p>
      </form>
    </div>
  );
}
