export async function json(req, res) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
    // JSON.parse é utilizado para transformar o JSON já criado em uma estrutura legível ao JS (objeto, array, etc.)
  } catch {
    req.body = {}
  }

  res.setHeader("Content-type", "application/json")

  // console.log(req.body);
}
