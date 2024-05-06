import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouters } from './modules/user/user.route';
const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api', UserRouters);
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Node Express server',
  });
});
export default app;
