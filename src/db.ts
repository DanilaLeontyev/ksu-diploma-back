import path from "node:path";
import sqlite from "better-sqlite3";

import Database from "better-sqlite3";
const db = new Database("./database.db", { fileMustExist: true });

// const db = new sqlite(path.resolve("./database.db"), { fileMustExist: true });

function query(sql: string, params: string[]) {
  return db.prepare(sql).all(params);
}

module.exports = {
  query,
};
