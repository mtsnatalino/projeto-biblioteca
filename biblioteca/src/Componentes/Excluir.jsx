import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Excluir() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);

  async function consultarPorCodigo(codigo) {
    try {
      const response = await axios.get(
        "http://localhost:3001/clientes/" + codigo
      );
      setClientes(response.data);
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
        "http://localhost:3001/clientes/" + codigo
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
        <h1>Exclusão de Clientes</h1>

        <p>
            Você deseja excluir o cliente {clientes.nome_cliente}
        </p>

        <p>
            <a href="" onClick={(e) => {e.preventDefault(); excluir(clientes.cod_cliente)}}>Sim</a>
        </p>

        <p>
            <a href="" onClick={(e) => {e.preventDefault(); voltar(clientes.cod_cliente)}}>Não, voltar a consulta</a>
        </p>
      </form>
    </div>
  );
}
