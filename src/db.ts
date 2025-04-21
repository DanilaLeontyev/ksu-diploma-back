import Database from "better-sqlite3";

const db = new Database("./database.db", { fileMustExist: true });

export default db;
