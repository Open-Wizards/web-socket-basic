import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initSocket } from './socket';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';
dotenv.config();




const app: Express = express();
const port = process.env.PORT || 3030;

app.use(
  cors({
    origin: '*',
  })
  );
  
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

  //logging every request and its body
  app.use((req: Request, res: Response, next: any) => {
    console.log(`${req.method} ${req.path}`);
    console.log(req.body);
    next();
  });

  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/ws", routes);

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
  origin: '*'
  }
});
initSocket();

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  mongoose
    .connect('mongodb://0.0.0.0:27017/reviews')
    .then(() => {
      console.log('MongoDB Connected');
    })
    .catch((err) => console.log(err));
});