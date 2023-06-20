import express from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import session, { SessionOptions } from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { LocalStrategyOption, LocalVerify } from './strategy/LocalStrategy';
import { KakaoStrategyOption, KakaoVerify } from './strategy/KakaoStrategy';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import registerRouter from './routes/RegisterRouter';
import loginRouter from './routes/LoginRouter';

dotenv.config();

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

app.set('port', process.env.PORT);
app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

/**
 * TODO: Passport
 */
passport.use('local', new LocalStrategy(LocalStrategyOption, LocalVerify));
passport.use('kakao', new KakaoStrategy(KakaoStrategyOption, KakaoVerify));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
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
