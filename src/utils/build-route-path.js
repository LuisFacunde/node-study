// /users/:id
// regex é uma expressão regular, uma forma para encontrar textos dentro de um texto maior (semelhanto ao CRTL + F)

export function buildRoutePath(path) {
  const routePArametersRegex = /:([a-zA-z]+)/g
  const pathWithParameterss = path.replaceAll(routePArametersRegex, "(?<$1>[a-z0-9\-_]+)");
  
  const pathRegex = new RegExp(`^${pathWithParameterss}`)

  return pathRegex;
}
