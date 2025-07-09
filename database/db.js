import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Suporte ao __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto do banco
const dbPath = path.resolve(__dirname, '../notaexpress.db');
const db = new sqlite3.Database(dbPath);

// Criação da tabela
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS notas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT UNIQUE,
      conteudo TEXT,
      arquivo TEXT,
      tipo TEXT,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error("Erro ao criar tabela:", err.message);
    } else {
      console.log("✅ Tabela 'notas' criada ou já existe.");
    }
  });
});

export default db;
