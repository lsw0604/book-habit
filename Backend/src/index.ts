import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import session, { SessionOptions } from 'express-session';
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

import { localOptions, LocalVerify } from './strategy/LocalStrategy';
import { AccessJWTStrategyOptions, AccessVerify } from './strategy/Access.Strategy';
import { RefreshJWTStrategyOptions, RefreshVerify } from './strategy/Refresh.Strategy';

const NAMESPACE = 'SERVER';
const app = express();
dbConfig();

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  methods: 'GET, POST, PUT, DELETE',
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
app.use(express.static(path.join(__dirname, '../../Frontend/dist')));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy(localOptions, LocalVerify));
passport.use('access', new JWTStrategy(AccessJWTStrategyOptions, AccessVerify));
passport.use('refresh', new JWTStrategy(RefreshJWTStrategyOptions, RefreshVerify));

app.use('/api/books', bookRouter);
app.use('/api/auth', authRouter);
app.use('/api/my_book', myBookRouter);

const httpSever = http.createServer(app);

httpSever.listen(config.server.port, () =>
  logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`)
);
