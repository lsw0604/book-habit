import express from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import session, { SessionOptions } from 'express-session';
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

app.use(cookieParser());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/register', registerRouter);

app.listen(app.get('port'), () => {
  console.log(`Server Started on ${app.get('port')} PORT`);
});
