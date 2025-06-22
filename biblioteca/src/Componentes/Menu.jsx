export default function Menu() {
  return (
    <div className="menu">
      <h2>
        <a href="/">Biblioteca Virtual</a>
      </h2>

      <div>
        <a href="/cadastro">Cadastro de Clientes</a>
        <a href="/cadastroLivros">Cadastro de Livros</a>
        <a href="/emprestimos">Empréstimos</a>
        <a href="/consulta">Consulta Geral</a>
      </div>
    </div>
  );
}
