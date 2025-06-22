const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const banco = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "banco_biblioteca",
});

banco.connect((erro) => {
  if (erro) {
    console.log("Erro ao conectar ao MySQL: ");
    console.log(erro);
  } else {
    console.log("Conectando ao MySQL com sucesso!");
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:" + PORT);
});

//API CLIENTES

app.get("/clientes", (req, res) => {
  const sql = "SELECT * FROM clientes";

  banco.query(sql, (erro, resultados) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ error: "Erro ao consultar clientes" });
    } else {
      console.log(resultados);
      return res.status(200).json(resultados);
    }
  });
});

app.get("/clientes/:codigo", (req, res) => {
  const { codigo } = req.params;

  const sql = "SELECT * FROM clientes WHERE cod_cliente = ?";

  banco.query(sql, [codigo], (erro, resultados) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ error: "Erro ao consultar cliente" });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res.status(200).json(resultados[0]);
  });
});

app.post("/clientes", (req, res) => {
  const { nome, cpf, email, telefone } = req.body;

  const sql =
    "insert into clientes(nome_cliente, cpf, email, telefone) values (?, ?, ?, ?)";

  banco.query(sql, [nome, cpf, email, telefone], (erro, result) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ error: "Erro ao cadastrar cliente" });
    } else {
      let mensagem = `Cliente ${nome} cadastrado com sucesso com o codigo ${result.insertId}`;
      console.log(mensagem);
      return res.status(201).json({ message: mensagem });
    }
  });
});

app.put("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, telefone } = req.body;

  const sql =
    "UPDATE clientes SET nome_cliente = ?, cpf = ?, email = ?, telefone = ? WHERE cod_cliente = ?";

  banco.query(sql, [nome, cpf, email, telefone, id], (erro, result) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ error: "Erro ao atualizar cliente" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res
      .status(200)
      .json({ message: `Cliente com ID ${id} atualizado com sucesso` });
  });
});

app.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM clientes WHERE cod_cliente = ?";

  banco.query(sql, [id], (erro, result) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ error: "Erro ao excluir cliente" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res
      .status(200)
      .json({ message: `Cliente com ID ${id} excluído com sucesso` });
  });
});

//API LIVROS

app.get("/livros", (req, res) => {
  const sql = "SELECT * FROM livros";

  banco.query(sql, (erro, resultados) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ error: "Erro ao consultar livros" });
    } else {
      console.log(resultados);
      return res.status(200).json(resultados);
    }
  });
});

app.get("/livros/:codigo", (req, res) => {
  const { codigo } = req.params;

  const sql = "SELECT * FROM livros WHERE cod_livros = ?";

  banco.query(sql, [codigo], (erro, resultados) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ error: "Erro ao consultar livro" });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    return res.status(200).json(resultados[0]);
  });
});

app.post("/livros", (req, res) => {
  const { titulo, autor, editora } = req.body;

  const sql =
    "insert into livros(titulo, autor, editora) values (?, ?, ?)";

  banco.query(sql, [titulo, autor, editora], (erro, result) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ error: "Erro ao cadastrar livro" });
    } else {
      let mensagem = `Livro ${titulo} cadastrado com sucesso com o codigo ${result.insertId}`;
      console.log(mensagem);
      return res.status(201).json({ message: mensagem });
    }
  });
});

app.put("/livros/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, autor, editora } = req.body;

  const sql =
    "UPDATE livros SET titulo = ?, autor = ?, editora = ? WHERE cod_livros = ?";

  banco.query(sql, [titulo, autor, editora, id], (erro, result) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ error: "Erro ao atualizar livro" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    return res
      .status(200)
      .json({ message: `Livro com ID ${id} atualizado com sucesso` });
  });
});

app.delete("/livros/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM livros WHERE cod_livros = ?";

  banco.query(sql, [id], (erro, result) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ error: "Erro ao excluir livro" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    return res.status(200).json({ message: `Livro com ID ${id} excluído com sucesso`})
  });
});


//API EMPRESTIMOS

app.post("/emprestimos", (req, res) => {
  const { cod_cliente, cod_livros, data_emprestimo, data_devolucao } = req.body;

  if (!cod_cliente || !cod_livros || !data_emprestimo || !data_devolucao) {
    return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
  }

  const sql = `
    INSERT INTO emprestimos (cod_cliente, cod_livros, data_emprestimo, data_devolucao)
    VALUES (?, ?, ?, ?)
  `;

  banco.query(
    sql,
    [cod_cliente, cod_livros, data_emprestimo, data_devolucao],
    (erro, resultado) => {
      if (erro) {
        console.error(erro);
        return res.status(500).json({ error: "Erro ao cadastrar empréstimo" });
      }

      return res.status(201).json({
        message: `Empréstimo cadastrado com sucesso. Código: ${resultado.insertId}`,
      });
    }
  );
});

app.get("/emprestimos", (req, res) => {
  const sql = `
    SELECT 
      e.cod_emprest,
      c.nome_cliente,
      l.titulo,
      e.data_emprestimo,
      e.data_devolucao
    FROM emprestimos e
    JOIN clientes c ON e.cod_cliente = c.cod_cliente
    JOIN livros l ON e.cod_livros = l.cod_livros
  `;

  banco.query(sql, (erro, resultados) => {
    if (erro) {
      console.error(erro);
      return res.status(500).json({ error: "Erro ao consultar empréstimos" });
    }

    return res.status(200).json(resultados);
  });
});

app.get("/emprestimos/:codigo", (req, res) => {
  const { codigo } = req.params;

  const sql = "SELECT * FROM emprestimos WHERE cod_emprest = ?";

  banco.query(sql, [codigo], (erro, resultados) => {
    if (erro) {
      console.error(erro);
      return res.status(500).json({ error: "Erro ao consultar empréstimo" });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ error: "Empréstimo não encontrado" });
    }

    return res.status(200).json(resultados[0]);
  });
});

app.put("/emprestimos/:codigo", (req, res) => {
  const { codigo } = req.params;
  const { cod_cliente, cod_livros, data_emprestimo, data_devolucao } = req.body;

  const sql = `
    UPDATE emprestimos 
    SET cod_cliente = ?, cod_livros = ?, data_emprestimo = ?, data_devolucao = ?
    WHERE cod_emprest = ?
  `;

  banco.query(sql, [cod_cliente, cod_livros, data_emprestimo, data_devolucao, codigo], (erro, resultado) => {
    if (erro) {
      console.error(erro);
      return res.status(500).json({ error: "Erro ao atualizar empréstimo" });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Empréstimo não encontrado" });
    }

    return res.status(200).json({ message: "Empréstimo atualizado com sucesso" });
  });
});

app.delete("/emprestimos/:codigo", (req, res) => {
  const { codigo } = req.params;
  const sql = "DELETE FROM emprestimos WHERE cod_emprest = ?";
  banco.query(sql, [codigo], (erro, resultado) => {
    if (erro) return res.status(500).json({ error: "Erro ao excluir" });
    if (resultado.affectedRows === 0)
      return res.status(404).json({ message: "Empréstimo não encontrado" });
    return res.status(200).json({ message: "Empréstimo excluído com sucesso" });
  });
});
