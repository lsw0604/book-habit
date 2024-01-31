import http from 'http';
import path from 'path';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';

import logging from './config/logging';
import config from './config/config';
import { dbConfig } from './config/database';

import bookRouter from './routes/book';
import authRouter from './routes/auth';
import myBookRouter from './routes/myBook';
import commentsRouter from './routes/comments';

import { localOptions, LocalVerify } from './strategy/LocalStrategy';
import { AccessJWTStrategyOptions, AccessVerify } from './strategy/Access.Strategy';
import { RefreshJWTStrategyOptions, RefreshVerify } from './strategy/Refresh.Strategy';

const NAMESPACE = 'INDEX';
const app = express();

dbConfig();

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../Frontend/dist')));

app.use(passport.initialize());

passport.use('local', new LocalStrategy(localOptions, LocalVerify));
passport.use('access', new JWTStrategy(AccessJWTStrategyOptions, AccessVerify));
passport.use('refresh', new JWTStrategy(RefreshJWTStrategyOptions, RefreshVerify));

app.use('/api/books', bookRouter);
app.use('/api/auth', authRouter);
app.use('/api/my_book', myBookRouter);
app.use('/api/comments', commentsRouter);

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () =>
  logging.debug(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`)
);
