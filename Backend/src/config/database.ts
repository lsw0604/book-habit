import { Pool, createPool } from 'mysql2/promise';

export function dbConfig() {
  connectionPool = createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    connectionLimit: 10,
  });

  console.log(process.env.MYSQL_USER, process.env.MYSQL_PASSWORD);

  connectionPool.on('connection', (connection) => {
    console.log(`Connection ${connection.threadId} connected`);
  });

  connectionPool.on('release', (connection) => {
    console.log(`Connection ${connection.threadId} release`);
  });
}

export let connectionPool: Pool;
