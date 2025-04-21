import Database from "better-sqlite3";

const db = new Database("./database.db", { fileMustExist: true });
db.pragma("journal_mode = WAL");
export default db;
