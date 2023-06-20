import mysql from 'mysql2/promise';

const { HOST, DB_USER, PASSWORD, DATABASE } = process.env;

// export const pool = mysql.createPool({
//   host: HOST,
//   user: DB_USER,
//   password: PASSWORD,
//   database: DATABASE,
//   connectionLimit: 10,
// });

export const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'dltjd120503!',
  database: 'mydb',
  connectionLimit: 10,
});
