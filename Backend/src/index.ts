import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import session, { SessionOptions } from 'express-session';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';
import fs from 'fs';
import path from 'path';

import logging from './config/logging';
import config from './config/config';
import bookRoutes from './routes/book';
import authRoutes from './routes/auth';
import { connectionPool, dbConfig } from './config/database';
import { localOptions, LocalVerify } from './strategy/LocalStrategy';
import { AccessJWTStrategyOptions, AccessVerify } from './strategy/Access.Strategy';
import { RefreshJWTStrategyOptions, RefreshVerify } from './strategy/Refresh.Strategy';
import { RowDataPacket } from 'mysql2';

// interface IBookId extends RowDataPacket {
//   id: number;
// }

const NAMESPACE = 'SERVER';
const app = express();
dbConfig();

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

const sessionOptions: SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET as string,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// type bookArr = {
//   date: string;
//   books: {
//     title: string;
//     author: string;
//     company: string;
//     published_date: string;
//     image: string;
//     rank: number;
//   }[];
// };

// const filesName = fs.readdir(
//   path.join(__dirname, '../../../../python/db'),
//   'utf8',
//   async (err, files) => {
//     if (err) {
//       throw err;
//     }
//     const total: bookArr[] = [];

//     files.forEach((file) => {
//       const splitFile = file.split('.');
//       if (splitFile[0] !== '') {
//         const bookObj = { date: '', books: [] };
//         bookObj.date = splitFile[0];
//         total.push(bookObj);
//       }
//     });

//     total.forEach((file) => {
//       const json = JSON.parse(
//         fs.readFileSync(
//           path.join(__dirname, '../../../../python/db/' + file.date + '.json'),
//           'utf-8'
//         )
//       );
//       file.books = json;
//     });

//     total.forEach(async (data) => {
//       try {
//         const connect = await connectionPool.getConnection();
//         try {
//           await connect.beginTransaction();

//           const PERIOD_SQL = 'INSERT INTO crawled_data (period) VALUES (?)';
//           const PERIOD_VALUE = [data.date];
//           await connect.query(PERIOD_SQL, PERIOD_VALUE);

//           const PERIOD_ID_SQL = 'SELECT id FROM crawled_data WHERE period = ?';
//           const PERIOD_ID_VALUES = [data.date];

//           const [rows] = await connect.query<IBookId[]>(PERIOD_ID_SQL, PERIOD_ID_VALUES);

//           if (rows[0]) {
//             data.books.forEach(async (book) => {
//               const BOOK_SQL =
//                 'INSERT INTO books (title, author, company, book_rank, published_date, img, crawled_data_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
//               const BOOK_VALUE = [
//                 book.title,
//                 book.author,
//                 book.company,
//                 book.rank,
//                 book.published_date,
//                 book.image,
//                 rows[0].id,
//               ];
//               await connect.query(BOOK_SQL, BOOK_VALUE);
//             });
//           }

//           await connect.commit();
//           connect.release();
//         } catch (err) {
//           await connect.rollback();
//           connect.release();
//           console.log(err);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     });
//   }
// );

app.use(passport.initialize());
passport.use('local', new LocalStrategy(localOptions, LocalVerify));
passport.use('access', new JWTStrategy(AccessJWTStrategyOptions, AccessVerify));
passport.use('refresh', new JWTStrategy(RefreshJWTStrategyOptions, RefreshVerify));

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

const httpSever = http.createServer(app);

httpSever.listen(config.server.port, () =>
  logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`)
);
