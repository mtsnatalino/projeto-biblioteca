import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Consulta() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);

  async function consultar() {
    try {
      const response = await axios.get("http://localhost:3001/clientes");
      setClientes(response.data);
    } catch (erro) {
      alert(erro);
    }
  }

  async function consultarLivro() {
    try {
      const response = await axios.get("http://localhost:3001/livros");
      setLivros(response.data);
    } catch (erro) {
      alert(erro);
    }
  }

  async function consultarEmprestimos() {
    try {
      const response = await axios.get("http://localhost:3001/emprestimos");
      setEmprestimos(response.data);
    } catch (erro) {
      alert(erro);
    }
  }

  useEffect(() => {
    consultar();
    consultarLivro();
    consultarEmprestimos();
  }, []);

  function alterar(codigo) {
    navigate("/alterar/" + codigo);
  }

  function excluir(codigo) {
    navigate("/excluir/" + codigo);
  }

  function alterarLivro(codigo) {
    navigate("/alterarLivro/" + codigo);
  }

  function excluirLivro(codigo) {
    navigate("/excluirLivro/" + codigo);
  }

  function alterarEmprestimo(codigo) {
    navigate("/alterarEmprestimo/" + codigo);
  }

  function excluirEmprestimo(codigo) {
    navigate("/excluirEmprestimo/" + codigo);
  }

  return (
    <div className="conteudo">
      <form>
        <h1>Consulta de Clientes</h1>
        <p>Quantidade de clientes cadastrados: {clientes.length}</p>
        <table>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.cod_cliente}</td>
              <td>{cliente.nome_cliente}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    alterar(cliente.cod_cliente);
                  }}
                >
                  Alterar
                </a>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    excluir(cliente.cod_cliente);
                  }}
                >
                  Excluir
                </a>
              </td>
            </tr>
          ))}
        </table>
      </form>

      <form>
        <h1>Consulta de Livros</h1>
        <p>Quantidade de livros cadastrados: {livros.length}</p>
        <table>
          <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Editora</th>
            <th>Ações</th>
          </tr>
          {livros.map((livro, index) => (
            <tr key={index}>
              <td>{livro.cod_livros}</td>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.editora}</td>
              <td>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    alterarLivro(livro.cod_livros);
                  }}
                >
                  Alterar
                </a>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    excluirLivro(livro.cod_livros);
                  }}
                >
                  Excluir
                </a>
              </td>
            </tr>
          ))}
        </table>
      </form>

      <form>
        <h1>Consulta de Empréstimos</h1>
        <p>Quantidade de empréstimos registrados: {emprestimos.length}</p>
        <table>
          <tr>
            <th>Código</th>
            <th>Cliente</th>
            <th>Livro</th>
            <th>Data de Empréstimo</th>
            <th>Data de Devolução</th>
            <th>Ações</th>
          </tr>
          {emprestimos.map((emp, index) => (
            <tr key={index}>
              <td>{emp.cod_emprest}</td>
              <td>{emp.nome_cliente}</td>
              <td>{emp.titulo}</td>
              <td>{new Date(emp.data_emprestimo).toLocaleDateString()}</td>
              <td>{new Date(emp.data_devolucao).toLocaleDateString()}</td>
              <td>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    alterarEmprestimo(emp.cod_emprest);
                  }}
                >
                  Alterar
                </a>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    excluirEmprestimo(emp.cod_emprest);
                  }}
                >
                  Excluir
                </a>
              </td>
            </tr>
          ))}
        </table>
      </form>
    </div>
  );
}
