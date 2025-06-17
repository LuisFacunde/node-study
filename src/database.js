// { "users": [...] }
// A ideia é utilizar esse banco de dados para salvar todas as informações e não apenas os usuários
import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};
  // O '#' torna a o atributo privado para a classe

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
    // JSON.stringify é utilizado para converter em JSON, pois writeFile só aceita String
  }

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}
