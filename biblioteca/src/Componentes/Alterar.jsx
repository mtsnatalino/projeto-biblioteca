import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Alterar() {
  const { codigo } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [resultado, setResultado] = useState("");

  async function consultarPorCodigo(codigo) {
    try {
      const response = await axios.get("http://localhost:3001/clientes/" + codigo);
      const cliente = response.data;

      setNome(cliente.nome);
      setCpf(cliente.cpf);
      setEmail(cliente.email);
      setTelefone(cliente.telefone);
    } catch (erro) {
      alert("Erro ao consultar cliente: " + (erro.response?.data?.error || erro.message));
    }
  }

  async function alterar() {
    try {
      setResultado("Alterando...");

      await axios.put("http://localhost:3001/clientes/" + codigo, {
        nome,
        cpf,
        email,
        telefone
      });

      setResultado("Cliente alterado com sucesso!");
      navigate("/consulta");
    } catch (erro) {
      setResultado("Erro ao alterar cliente: " + (erro.response?.data?.error || erro.message));
    }
  }

  useEffect(() => {
    consultarPorCodigo(codigo);
  }, [codigo]);

  return (
    <div className="conteudo">
      <form action="">
        <h1>Alterar Cliente</h1>

        <p>
          Digite o nome do cliente <br />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </p>

        <p>
          Digite o cpf <br />
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </p>

        <p>
          Digite o email <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          Digite o telefone <br />
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
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
