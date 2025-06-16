// // Streams -> conectar streams

// process.stdin  // Tudo que ele recebe com entrada / Readable stream
//     .pipe(process.stdout); // .pipe envia para saída / Writable stream

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  // Método obrigatório que retorna os dados da stream
  _read() {
    const i = this.index++;

    setTimeout(() => {
      // Executa o código depois de um tempo (em ms)
      if (i > 100) {
        // push, é o método usado para fornecer informações para quem está consumindo ela
        this.push(null);
      } else {
        // Stream não trabalha tipos primitivos de dados (int/string), pois trabalha com *buffer*
        // logo o tchank nunca vai poder está em um formato primitivo

        // Para isso é utilizado o *Buffer*
        const buf = Buffer.from(String(i));
        // Buffer não recebe número, por isso, o dado foi convertido em string

        this.push(buf);
        // Para funcionar, deve-se por a variável que é o Buffer
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunck, encoding, callback) {
    const transformed = Number(chunck.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunck, encoding, callback) {
    console.log(Number(chunck.toString()) * 10);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
