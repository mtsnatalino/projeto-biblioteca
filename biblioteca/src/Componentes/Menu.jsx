export default function Menu() {
  return (
    <div className="menu">
      <h2>
        <a href="/">Biblioteca Virtual</a>
      </h2>

      <div>
        <a href="/cadastro">Cadastro de Clientes</a>
        <a href="/cadastroLivros">Cadastro de Livros</a>
        <a href="/consulta">Consulta Geral</a>
        <a href="/emprestimos">Cadastro de Empréstimos</a>
      </div>
    </div>
  );
}
