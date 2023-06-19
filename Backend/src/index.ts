import express from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import session, { SessionOptions } from 'express-session';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import registerRouter from './routes/RegisterRouter';

dotenv.config();

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
const sessionOptions: SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

const app = express();

app.set('port', process.env.PORT || 3001);
app.use(cors(corsOptions));
app.use(session(sessionOptions));

app.use(cookieParser());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/register', registerRouter);

app.listen(
  app.get('port', () => {
    console.log(`${app.get('port')}port waiting`);
  })
);
