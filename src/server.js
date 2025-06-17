import http from "node:http";
import { json } from "./middlewares/json.js";

// - Criar usuários
// - Listar usuários
// - Atualizar usuários
// - Deletar usuários

// - HTTP
//     - Métodos HTTP (GET, POST, PUT, PATCH, DELETE)
//     - URL

// Aplicação - Stateful != Stateless

// JSON - JavaScript Object Notation

// Cabeçalhoss (Requisição/Resposta) -> Metadados

// HTTP Status Codes
const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method == "GET" && url == "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .writeHead(200)
      .end(JSON.stringify(users));
  }

  if (method == "POST" && url == "/users") {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return res.writeHead(201).end();
  }

  if (method == "PUT" && url == "/users") {
    return res.end("Atualiza informações do usuário");
  }

  if (method == "DELETE" && url == "/users") {
    return res.end("Deleta um usuário");
  }

  return res.writeHead(404).end();
});

server.listen(3333);
// localhost:3333

// Métodos de importação
// CommonJS => require
// ESModule => import/export
