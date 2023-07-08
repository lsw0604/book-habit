import express from 'express';
import 'dotenv/config';
import { dbConfig } from './DB';
import cors, { CorsOptions } from 'cors';
import session, { SessionOptions } from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { localOptions, localVerify } from './strategy/LocalStrategy';
import { kakaoOptions, kakaoVerify } from './strategy/KakaoStrategy';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import registerRouter from './routes/RegisterRouter';
import loginRouter from './routes/LoginRouter';

/**
 * ? options
 */

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

const app = express();
dbConfig();

app.set('port', process.env.PORT);
app.use(cors(corsOptions));
app.use(session(sessionOptions));

/**
 * ? Passport
 */

app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new LocalStrategy(localOptions, localVerify));
passport.use('kakao', new KakaoStrategy(kakaoOptions, kakaoVerify));

passport.serializeUser((user, done) => {
  console.log('serialize', user);
  done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log('deserialize', id);
  done(null, id as any);
});

app.use(cookieParser());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/register', registerRouter);
app.use('/api/auth', loginRouter);

app.listen(app.get('port'), () => {
  console.log(`Server Started on ${app.get('port')} PORT`);
});
