import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Componentes/Menu";
import Home from "./Componentes/Home";
import Cadastro from "./Componentes/Cadastro";
import CadastroLivros from "./Componentes/CadastroLivros";
import Consulta from "./Componentes/Consulta";
import Excluir from "./Componentes/Excluir";
import Alterar from "./Componentes/Alterar";
import AlterarLivro from "./Componentes/AlterarLivro";
import ExcluirLivro from "./Componentes/ExcluirLivro";
import Emprestimo from "./Componentes/Emprestimo";
import AlterarEmprestimo from "./Componentes/AlterarEmprestimo";
import ExcluirEmprestimo from "./Componentes/ExcluirEmprestimo";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroLivros" element={<CadastroLivros />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/excluir/:codigo" element={<Excluir />} />
        <Route path="/alterar/:codigo" element={<Alterar />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/excluirLivro/:codigo" element={<ExcluirLivro />} />
        <Route path="/alterarLivro/:codigo" element={<AlterarLivro />} />
        <Route path="/emprestimos" element={<Emprestimo />} />
        <Route path="/alterarEmprestimo/:codigo" element={<AlterarEmprestimo />} />
        <Route path="/excluirEmprestimo/:codigo" element={<ExcluirEmprestimo />} />
      </Routes>
    </BrowserRouter>
  );
}
