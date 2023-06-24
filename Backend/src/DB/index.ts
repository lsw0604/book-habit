import { Pool, createPool } from 'mysql2/promise';

const { HOST, DB_USER, PASSWORD, DATABASE } = process.env;

export function dbConfig() {
  connectionPool = createPool({
    host: HOST,
    user: DB_USER,
    password: PASSWORD,
    database: DATABASE,
    connectionLimit: 10,
  });

  connectionPool.on('connection', (connection) => {
    console.log(`Connection ${connection.threadId} connected`);
  });

  connectionPool.on('release', (connection) => {
    console.log(`Connection ${connection.threadId} release`);
  });
}

export let connectionPool: Pool;
