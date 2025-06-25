import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method == method && route.path == url;
  });

  if (route) {
    return route.handle(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
// http://localhost:3333/users

// Métodos de importação
// CommonJS => require
// ESModule => import/export
