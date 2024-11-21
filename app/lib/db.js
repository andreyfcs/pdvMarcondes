// lib/db.js
import mysql from 'mysql2/promise';

// Configura a conexão com o banco de dados usando as variáveis de ambiente
const db = mysql.createPool({
  host: process.env.DB_HOST,     // Acessa a variável DB_HOST
  user: process.env.DB_USER,     // Acessa a variável DB_USER
  password: process.env.DB_PASSWORD, // Acessa a variável DB_PASSWORD
  database: process.env.DB_NAME  // Acessa a variável DB_NAME
});

export default db;
