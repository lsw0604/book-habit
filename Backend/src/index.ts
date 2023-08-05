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
import { Strategy as KakaoStrategy } from 'passport-kakao';

import logging from './config/logging';
import config from './config/config';
import bookRoutes from './routes/book';
import authRoutes from './routes/auth';
import { dbConfig } from './config/database';
import { localOptions, LocalVerify } from './strategy/LocalStrategy';
import { AccessJWTStrategyOptions, AccessVerify } from './strategy/Access.Strategy';
import { RefreshJWTStrategyOptions, RefreshVerify } from './strategy/Refresh.Strategy';
import { KakaoOauthStrategyOptions, kakaoVerify } from './strategy/Kakao.Strategy';

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

app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new LocalStrategy(localOptions, LocalVerify));
passport.use('access', new JWTStrategy(AccessJWTStrategyOptions, AccessVerify));
passport.use('refresh', new JWTStrategy(RefreshJWTStrategyOptions, RefreshVerify));
passport.use('kakao', new KakaoStrategy(KakaoOauthStrategyOptions, kakaoVerify));

passport.serializeUser((user, done) => {
  console.log('serialize', user);
  done(null, user);
});

passport.deserializeUser((id: any, done) => {
  console.log('deserialize', id);
  done(null, id);
});
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

const httpSever = http.createServer(app);

httpSever.listen(config.server.port, () =>
  logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`)
);
