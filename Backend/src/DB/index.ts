import mysql from 'mysql2/promise';

const {
  HOST: host,
  DB_USER: user,
  PASSWORD: password,
  DATABASE: database,
} = process.env;

export const pool = mysql.createPool({
  host,
  user,
  password,
  database,
});
