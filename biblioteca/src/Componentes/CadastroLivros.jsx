import { use, useState } from "react";
import axios from "axios";

export default function Cadastro() {
  const [titulo, setTitulo] = useState();
  const [autor, setAutor] = useState();
  const [editora, setEditora] = useState();
  const [resultado, setResultado] = useState();

  async function cadastrar() {

     if (!titulo || !autor || !editora) {
      setResultado("Preencha todos os campos antes de cadastrar.");
      return;
    }
    
    try {
      setResultado("..Aguarde..");
      const response = await axios.post("http://localhost:3001/livros", {
        titulo,
        autor,
        editora,
      });
      setResultado(response.data.message);
    } catch (erro) {
      setResultado(erro.response?.data?.error || "Erro desconhecido");
    }
  }

  return (
    <div className="conteudo">
      <form action="">
        <h1>Cadastro</h1>
        <p>
          Digite o titulo do livro
          <br />
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </p>
        <p>
          Digite o nome do Autor <br />
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
          <input type="button" value="Cadastrar" onClick={cadastrar} />
        </p>

        <p>{resultado}</p>
      </form>
    </div>
  );
}
