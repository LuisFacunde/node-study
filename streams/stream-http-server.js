import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunck, encoding, callback) {
    const transformed = Number(chunck.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

// req => Readable Stream
// res => Writable Stream

const server = http.createServer(async (req, res) => {
  const buffers = []

  // async/await
  // await -> não permite que a execução inicie enquanto os dados da stream não é lido por completo
  // Quando await é utilizado a função superior deve usar async
  for await(const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()
  // concat?

  console.log(fullStreamContent)

  return res.end(fullStreamContent)

  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res);
});

server.listen(3334);

// json geralmente é consumido por completo e não aos poucos
// pois os dados em jspon devem ser enviados por completo