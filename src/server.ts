import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import index from './routes/index';
import pool from './common/postgres-connector';

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    const allowedOrigins = ['http://localhost:3000'];

    const options: cors.CorsOptions = {
      origin: allowedOrigins,
    };

    this.app.use(cors(options));
    // Allowgin CORS Policy to my app
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
  }

  private dbConnect() {
    pool.connect(function (err, _client, _done) {
      if (err) throw new Error(err.message);
      console.log('Connected');
    });
  }

  private routerConfig() {
    this.app.use('/', index);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on('error', (err: Object) => reject(err));
    });
  };
}

export default Server;
