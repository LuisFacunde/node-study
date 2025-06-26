import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

// Query Parameters: Parametro Nomeado - utilizado em URL Stateful => filtros, paginação, não-obrigatório
// http://localhost:3333/users?userID=1&name=Luis - cada parametro possui um nome e um valor

// Route Parameters: Parametros não nomeados - utilizado para identificação de recurso
// http://localhost:3333/users/1

// Request Body: utilizado para envio de informações de um formulário, os dados passam pelo HTTPs

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method == method && route.path.test(url)
  });

  if (route) {
    const routeParams = req.url.match(route.path)

    console.log(routeParams);

    return route.handle(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
// http://localhost:3333/users

// Métodos de importação
// CommonJS => require
// ESModule => import/export
