export default function Home() {
  return (
    <div className="conteudos">
      <h1 className="titulo">Home</h1>

      <ul>
        <li>
          <a href="/cadastro">Cadastro de novos Clientes</a>
        </li>
        <li>
          <a href="/cadastroLivros">Cadastro de novos Livros</a>
        </li>
        <li>
          <a href="/emprestimos">Emprestimos</a>
        </li>

        <li>
          <a href="/consulta">Consulta Geral</a>
        </li>
      </ul>
    </div>
  );
}
