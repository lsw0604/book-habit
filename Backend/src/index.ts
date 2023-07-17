import http from 'http';
import bodyParser from 'body-parser';
import express, { NextFunction, Response, Request } from 'express';
import cookieParser from 'cookie-parser';
import session, { SessionOptions } from 'express-session';
import cors, { CorsOptions } from 'cors';

import logging from './config/logging';
import config from './config/config';
import bookRoutes from './routes/book';
import { dbConfig } from './config/database';

const NAMESPACE = 'SERVER';
const app = express();
dbConfig();

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
};

const sessionOptions: SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET as string,
  cookie: {
    httpOnly: true,
    secure: false
  }
};

app.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on('finish', () => {
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${req.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.use('/api/books', bookRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: error.message
  });
});

const httpSever = http.createServer(app);

httpSever.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}`
  )
);
