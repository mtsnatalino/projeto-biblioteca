import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AlterarLivro() {
  const { codigo } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [resultado, setResultado] = useState("");

  async function consultarPorCodigo(codigo) {
    try {
      const response = await axios.get(
        "http://localhost:3001/livros/" + codigo
      );
      const livro = response.data;

      setTitulo(livro.titulo);
      setAutor(livro.autor);
      setEditora(livro.editora);
    } catch (erro) {
      alert(
        "Erro ao consultar livro: " +
          (erro.response?.data?.error || erro.message)
      );
    }
  }

  async function alterar() {
    try {
      setResultado("Alterando...");

      await axios.put("http://localhost:3001/livros/" + codigo, {
        titulo,
        autor,
        editora,
      });

      setResultado("Livro alterado com sucesso!");
      navigate("/consulta");
    } catch (erro) {
      setResultado(
        "Erro ao alterar livro: " + (erro.response?.data?.error || erro.message)
      );
    }
  }

  useEffect(() => {
    consultarPorCodigo(codigo);
  }, [codigo]);

  return (
    <div className="conteudo">
      <form action="">
        <h1>Alterar Livro</h1>

        <p>
          Digite o nome do livro <br />
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </p>

        <p>
          Digite o nome do autor <br />
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </p>

        <p>
          Digite a editora <br />
          <input
            type="text"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
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
